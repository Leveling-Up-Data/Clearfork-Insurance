import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import {
  QUOTE_FIELD_LABELS,
  type QuoteFormValues,
  quoteFormSchema,
} from "@/lib/quote-types";

const GEMINI_MODEL = "gemini-2.0-flash";

const QUOTE_KEYS = quoteFormSchema.keyof().options;

const REQUIRED_KEYS: (keyof QuoteFormValues)[] = [
  "firstName",
  "lastName",
  "dateOfBirth",
  "maritalStatus",
  "gender",
  "streetAddress",
  "state",
  "zipCode",
  "phoneNumber",
  "emailAddress",
  "driverLicenseNumber",
];

function isQuoteFieldKey(k: string): k is keyof QuoteFormValues {
  return (QUOTE_KEYS as readonly string[]).includes(k);
}

function parseExtractionJson(text: string): Record<string, unknown> | null {
  const trimmed = text.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed);
  const jsonStr = fence ? fence[1].trim() : trimmed;
  try {
    return JSON.parse(jsonStr) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function sanitizeUpdates(raw: unknown): Partial<Record<keyof QuoteFormValues, string>> {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return {};
  const out: Partial<Record<keyof QuoteFormValues, string>> = {};
  for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
    if (!isQuoteFieldKey(k)) continue;
    if (v === null || v === undefined) continue;
    out[k] = String(v);
  }
  return out;
}

const UPLOAD_SYSTEM_PROMPT = `You extract auto insurance quote form fields from the attached document or image.

Respond with ONLY valid JSON (no markdown), shape:
{
  "updates": { /* only allowed keys, string values */ },
  "missingFields": [ /* array of field keys still not found */ ],
  "reply": string (brief summary for the user)
}

Allowed keys:
${QUOTE_KEYS.join(", ")}

Labels:
${QUOTE_KEYS.map((k) => `${k}: ${QUOTE_FIELD_LABELS[k]}`).join("\n")}

If a value is not clearly present, omit it from updates and list the key in missingFields. Do not guess SSN or driver license if illegible.`;

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[quote-assistant/upload] GEMINI_API_KEY not set");
      return NextResponse.json({ message: "AI not configured." }, { status: 500 });
    }

    const formData = await req.formData();
    const file = formData.get("file");
    if (!file || !(file instanceof Blob)) {
      return NextResponse.json({ message: "Missing file." }, { status: 400 });
    }

    const mimeType = file.type || "application/octet-stream";
    const buffer = Buffer.from(await file.arrayBuffer());
    const base64 = buffer.toString("base64");

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });

    const result = await model.generateContent({
      systemInstruction: UPLOAD_SYSTEM_PROMPT,
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType,
                data: base64,
              },
            },
            {
              text: "Extract quote form fields from this file. Return only the JSON object.",
            },
          ],
        },
      ],
    });

    const text = result.response.text();
    const parsed = parseExtractionJson(text);

    if (!parsed) {
      return NextResponse.json({
        updates: {},
        missingFields: [...REQUIRED_KEYS],
        reply: text || "Could not read the document. Try a clearer photo or PDF.",
      });
    }

    const updates = sanitizeUpdates(parsed.updates);
    const rawMissing = parsed.missingFields;
    const missingFields: string[] = [];

    if (Array.isArray(rawMissing)) {
      for (const item of rawMissing) {
        if (typeof item === "string" && isQuoteFieldKey(item)) {
          missingFields.push(item);
        }
      }
    }

    for (const key of REQUIRED_KEYS) {
      const v = updates[key];
      if (!v || String(v).trim() === "") {
        if (!missingFields.includes(key)) missingFields.push(key);
      }
    }

    const reply =
      typeof parsed.reply === "string"
        ? parsed.reply
        : "Here is what I could extract from your document.";

    return NextResponse.json({ updates, missingFields, reply });
  } catch (error) {
    console.error("[quote-assistant/upload] error:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
