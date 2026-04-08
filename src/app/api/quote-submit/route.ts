import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptcha } from "@/lib/recaptcha";

const NOCODB_API_URL = "https://data.levelingupdata.com/api/v2/tables/mdq1h9ds67ykacu/records";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    if (!data?.firstName || !data?.lastName) {
      return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
    }

    if (data.recaptchaToken) {
      const captcha = await verifyRecaptcha(data.recaptchaToken);
      if (!captcha.success || captcha.score < 0.5) {
        return NextResponse.json(
          { message: "reCAPTCHA verification failed" },
          { status: 400 },
        );
      }
    }

    const token = process.env.NOCODB_API_TOKEN;
    if (!token) {
      console.error("[quote-submit] NOCODB_API_TOKEN not set");
      return NextResponse.json({ message: "Database not configured." }, { status: 500 });
    }

    const record = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dateOfBirth: data.dateOfBirth || "",
      maritalStatus: data.maritalStatus || "",
      gender: data.gender || "",
      streetAddress: data.streetAddress || "",
      state: data.state || "",
      zipCode: data.zipCode || "",
      phoneNumber: data.phoneNumber || "",
      canReceiveTexts: data.canReceiveTexts || "",
      emailAddress: data.emailAddress || "",
      driverLicenseNumber: data.driverLicenseNumber || "",
      socialSecurityNumber: data.socialSecurityNumber || "",
      additionalDriverFirstName: data.additionalDriverFirstName || "",
      additionalDriverLastName: data.additionalDriverLastName || "",
      additionalDriverDOB: data.additionalDriverDOB || "",
      additionalDriverLicense: data.additionalDriverLicense || "",
      vinNumber: data.vinNumber || "",
      vehicleUse: data.vehicleUse || "",
      estimatedAnnualMileage: data.estimatedAnnualMileage || "",
      occupation: data.occupation || "",
      militaryService: data.militaryService || "",
      isStudent: data.isStudent || "",
      submittedAt: new Date().toISOString(),
      status: "New",
    };

    const response = await fetch(NOCODB_API_URL, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "xc-token": token,
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[quote-submit] NocoDB error:", response.status, errorText);
      return NextResponse.json({ message: "Failed to save quote." }, { status: 500 });
    }

    const result = await response.json();
    return NextResponse.json({ success: true, id: result.Id || result.id });
  } catch (error) {
    console.error("[quote-submit] error:", error);
    return NextResponse.json({ message: "An error occurred." }, { status: 500 });
  }
}
