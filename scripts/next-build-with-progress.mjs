#!/usr/bin/env node
/**
 * Runs `next build` and prints [build progress] done/total (pct%) when
 * Next emits parenthetical counts. Streams are forwarded chunk-by-chunk so
 * pipes never block the compiler when lines are long or slow to complete.
 */
import { spawn } from "node:child_process";
import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const cwd = process.cwd();
const nextCli = path.join(cwd, "node_modules/next/dist/bin/next");

function emitProgress(label, done, total) {
  if (!Number.isFinite(done) || !Number.isFinite(total) || total <= 0) return;
  const pct = Math.min(100, Math.max(0, Math.round((done / total) * 100)));
  const tag = label ? `${label} ` : "";
  process.stderr.write(`\x1b[36m[build progress]\x1b[0m ${tag}${done}/${total} (${pct}%)\n`);
}

function tryParseDoneTotal(line) {
  const patterns = [
    { re: /Generating static pages.*\((\d+)\s*\/\s*(\d+)\)/i, label: "static pages" },
    { re: /Collecting page data.*\((\d+)\s*\/\s*(\d+)\)/i, label: "page data" },
    { re: /\((\d+)\s*\/\s*(\d+)\)\s*$/u, label: "" },
  ];
  for (const { re, label } of patterns) {
    const m = line.match(re);
    if (m) {
      const done = Number(m[1]);
      const total = Number(m[2]);
      if (Number.isFinite(done) && Number.isFinite(total)) return { done, total, label };
    }
  }
  return null;
}

async function resolveNextCommand() {
  try {
    await access(nextCli);
    return { cmd: process.execPath, args: [nextCli, "build"] };
  } catch {
    return { cmd: "npx", args: ["next", "build"] };
  }
}

function attachLineScanner(stream, sink, onFullLine) {
  let buf = "";
  stream.on("data", (chunk) => {
    const s = typeof chunk === "string" ? chunk : chunk.toString("utf8");
    sink.write(s);
    buf += s;
    for (;;) {
      const nl = buf.indexOf("\n");
      if (nl === -1) break;
      const line = buf.slice(0, nl);
      buf = buf.slice(nl + 1);
      onFullLine(line.replace(/\r$/, ""));
    }
    if (buf.length > 512 * 1024) buf = buf.slice(-256 * 1024);
  });
  stream.on("end", () => {
    if (buf.length) onFullLine(buf.replace(/\r$/, ""));
  });
}

async function main() {
  const { cmd, args } = await resolveNextCommand();
  process.stderr.write("\x1b[2m[build]\x1b[0m starting next build…\n");

  const child = spawn(cmd, args, {
    cwd,
    env: process.env,
    stdio: ["inherit", "pipe", "pipe"],
  });

  let lastKey = "";
  const handleLine = (line) => {
    const parsed = tryParseDoneTotal(line);
    if (parsed) {
      const key = `${parsed.label}|${parsed.done}/${parsed.total}`;
      if (key !== lastKey) {
        lastKey = key;
        emitProgress(parsed.label, parsed.done, parsed.total);
      }
    }
  };

  attachLineScanner(child.stdout, process.stdout, handleLine);
  attachLineScanner(child.stderr, process.stderr, handleLine);

  const code = await new Promise((resolve) => {
    child.on("close", resolve);
  });

  if (code !== 0) {
    process.stderr.write(`\x1b[31m[build]\x1b[0m failed (exit ${code})\n`);
    process.exit(code ?? 1);
  }
  process.stderr.write("\x1b[32m[build]\x1b[0m complete — 100%\n");
}

main().catch((err) => {
  process.stderr.write(`${err instanceof Error ? err.stack : String(err)}\n`);
  process.exit(1);
});
