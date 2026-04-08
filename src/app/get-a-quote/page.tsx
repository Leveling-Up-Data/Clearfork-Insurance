"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info, Upload, CheckCircle2 } from "lucide-react";
import {
  quoteFormSchema,
  type QuoteFormData,
  US_STATES,
} from "@/lib/quote-types";

function Tooltip({ text }: { text: string }) {
  return (
    <span className="group relative ml-1 inline-flex cursor-help">
      <Info className="h-4 w-4 text-muted-foreground" />
      <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 w-56 -translate-x-1/2 rounded-lg bg-foreground px-3 py-2 text-xs text-background opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        {text}
      </span>
    </span>
  );
}

function FieldLabel({
  htmlFor,
  children,
  tooltip,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  tooltip?: string;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 flex items-center text-sm font-medium text-foreground"
    >
      {children}
      {required && <span className="ml-0.5 text-destructive">*</span>}
      {tooltip && <Tooltip text={tooltip} />}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";
const errorClass = "mt-1 text-xs text-destructive";

export default function GetAQuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [stateQuery, setStateQuery] = useState("");
  const [showStates, setShowStates] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
  });

  const filteredStates = US_STATES.filter((s) =>
    s.toLowerCase().includes(stateQuery.toLowerCase()),
  );

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...dropped]);
  }, []);

  async function onSubmit(data: QuoteFormData) {
    try {
      let recaptchaToken: string | undefined;
      const win = window as unknown as { grecaptcha?: { execute: (key: string, opts: { action: string }) => Promise<string> } };
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (win.grecaptcha && siteKey) {
        recaptchaToken = await win.grecaptcha.execute(siteKey, { action: "quote_submit" });
      }

      await fetch("/api/quote-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-6">
        <div className="max-w-md rounded-2xl border border-primary/20 bg-primary/5 p-10 text-center">
          <CheckCircle2 className="mx-auto mb-4 h-12 w-12 text-primary" />
          <h2 className="mb-2 text-2xl font-bold text-foreground">
            Thank You!
          </h2>
          <p className="text-muted-foreground">
            We&apos;ve received your quote request. A member of our team will
            reach out within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            Get Your Free Quote
          </h1>
          <p className="text-lg text-muted-foreground">
            Fill out the form below and one of our licensed agents will prepare
            a personalized quote for you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-10"
            noValidate
          >
            {/* Personal Info */}
            <fieldset>
              <legend className="mb-6 text-xl font-bold text-foreground">
                Personal Information
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="firstName" required tooltip="Your legal first name">
                    First Name
                  </FieldLabel>
                  <input id="firstName" {...register("firstName")} className={inputClass} placeholder="John" />
                  {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="lastName" required tooltip="Your legal last name">
                    Last Name
                  </FieldLabel>
                  <input id="lastName" {...register("lastName")} className={inputClass} placeholder="Doe" />
                  {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="dateOfBirth" required tooltip="Must be 16 or older">
                    Date of Birth
                  </FieldLabel>
                  <input id="dateOfBirth" type="date" {...register("dateOfBirth")} className={inputClass} />
                  {errors.dateOfBirth && <p className={errorClass}>{errors.dateOfBirth.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="maritalStatus" required tooltip="Affects rate calculation">
                    Marital Status
                  </FieldLabel>
                  <select id="maritalStatus" {...register("maritalStatus")} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>
                  {errors.maritalStatus && <p className={errorClass}>{errors.maritalStatus.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="gender" required tooltip="Used for actuarial rating">
                    Gender
                  </FieldLabel>
                  <select id="gender" {...register("gender")} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className={errorClass}>{errors.gender.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="socialSecurityNumber" tooltip="Optional — used for credit-based rating">
                    Social Security Number
                  </FieldLabel>
                  <input
                    id="socialSecurityNumber"
                    {...register("socialSecurityNumber")}
                    className={inputClass}
                    placeholder="XXX-XX-XXXX"
                  />
                </div>
              </div>
            </fieldset>

            {/* Contact & Address */}
            <fieldset>
              <legend className="mb-6 text-xl font-bold text-foreground">
                Contact &amp; Address
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <FieldLabel htmlFor="streetAddress" required tooltip="Your primary residence">
                    Street Address
                  </FieldLabel>
                  <input id="streetAddress" {...register("streetAddress")} className={inputClass} placeholder="123 Main St" />
                  {errors.streetAddress && <p className={errorClass}>{errors.streetAddress.message}</p>}
                </div>
                <div className="relative">
                  <FieldLabel htmlFor="state" required tooltip="State of residence">
                    State
                  </FieldLabel>
                  <input
                    id="state"
                    className={inputClass}
                    placeholder="Start typing..."
                    value={stateQuery}
                    onChange={(e) => {
                      setStateQuery(e.target.value);
                      setShowStates(true);
                    }}
                    onFocus={() => setShowStates(true)}
                    onBlur={() => setTimeout(() => setShowStates(false), 200)}
                    autoComplete="off"
                  />
                  {showStates && filteredStates.length > 0 && (
                    <ul className="absolute z-20 mt-1 max-h-48 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg">
                      {filteredStates.map((s) => (
                        <li key={s}>
                          <button
                            type="button"
                            className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted"
                            onMouseDown={() => {
                              setStateQuery(s);
                              setValue("state", s, { shouldValidate: true });
                              setShowStates(false);
                            }}
                          >
                            {s}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  {errors.state && <p className={errorClass}>{errors.state.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="zipCode" required tooltip="5-digit ZIP code">
                    Zip Code
                  </FieldLabel>
                  <input id="zipCode" {...register("zipCode")} className={inputClass} placeholder="76126" />
                  {errors.zipCode && <p className={errorClass}>{errors.zipCode.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="phoneNumber" required tooltip="Best number to reach you">
                    Phone Number
                  </FieldLabel>
                  <input id="phoneNumber" type="tel" {...register("phoneNumber")} className={inputClass} placeholder="(817) 555-1234" />
                  {errors.phoneNumber && <p className={errorClass}>{errors.phoneNumber.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="emailAddress" required tooltip="We'll send your quote here">
                    Email Address
                  </FieldLabel>
                  <input id="emailAddress" type="email" {...register("emailAddress")} className={inputClass} placeholder="john@example.com" />
                  {errors.emailAddress && <p className={errorClass}>{errors.emailAddress.message}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" {...register("canReceiveTexts")} className="h-4 w-4 rounded border-border text-primary" />
                    I can receive text messages
                  </label>
                </div>
              </div>
            </fieldset>

            {/* Driver & Vehicle */}
            <fieldset>
              <legend className="mb-6 text-xl font-bold text-foreground">
                Driver &amp; Vehicle Info
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="driverLicenseNumber" required tooltip="Your state-issued driver license number">
                    Driver License Number
                  </FieldLabel>
                  <input id="driverLicenseNumber" {...register("driverLicenseNumber")} className={inputClass} placeholder="DL12345678" />
                  {errors.driverLicenseNumber && <p className={errorClass}>{errors.driverLicenseNumber.message}</p>}
                </div>
                <div>
                  <FieldLabel htmlFor="vinNumber" tooltip="17-character Vehicle Identification Number">
                    VIN Number
                  </FieldLabel>
                  <input id="vinNumber" {...register("vinNumber")} className={inputClass} placeholder="1HGBH41JXMN109186" />
                </div>
                <div>
                  <FieldLabel htmlFor="vehicleUse" tooltip="How the vehicle is primarily used">
                    Vehicle Use
                  </FieldLabel>
                  <select id="vehicleUse" {...register("vehicleUse")} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="commute">Commute to Work/School</option>
                    <option value="pleasure">Pleasure / Personal</option>
                    <option value="business">Business</option>
                    <option value="rideshare">Rideshare / Delivery</option>
                  </select>
                </div>
                <div>
                  <FieldLabel htmlFor="estimatedAnnualMileage" tooltip="Approximate miles driven per year">
                    Estimated Annual Mileage
                  </FieldLabel>
                  <input id="estimatedAnnualMileage" {...register("estimatedAnnualMileage")} className={inputClass} placeholder="12,000" />
                </div>
              </div>
            </fieldset>

            {/* Additional Driver */}
            <fieldset>
              <legend className="mb-6 text-xl font-bold text-foreground">
                Additional Driver (Optional)
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="additionalDriverFirstName" tooltip="First name of additional driver in household">
                    First Name
                  </FieldLabel>
                  <input id="additionalDriverFirstName" {...register("additionalDriverFirstName")} className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="additionalDriverLastName" tooltip="Last name of additional driver">
                    Last Name
                  </FieldLabel>
                  <input id="additionalDriverLastName" {...register("additionalDriverLastName")} className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="additionalDriverDOB" tooltip="Date of birth of additional driver">
                    Date of Birth
                  </FieldLabel>
                  <input id="additionalDriverDOB" type="date" {...register("additionalDriverDOB")} className={inputClass} />
                </div>
                <div>
                  <FieldLabel htmlFor="additionalDriverLicense" tooltip="License number of additional driver">
                    Driver License Number
                  </FieldLabel>
                  <input id="additionalDriverLicense" {...register("additionalDriverLicense")} className={inputClass} />
                </div>
              </div>
            </fieldset>

            {/* Discount Info */}
            <fieldset>
              <legend className="mb-6 text-xl font-bold text-foreground">
                Discount Information
              </legend>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="occupation" tooltip="Your current occupation — some qualify for discounts">
                    Occupation
                  </FieldLabel>
                  <input id="occupation" {...register("occupation")} className={inputClass} placeholder="e.g. Teacher, Engineer" />
                </div>
                <div>
                  <FieldLabel htmlFor="militaryService" tooltip="Active, veteran, or reserve status">
                    Military Service
                  </FieldLabel>
                  <select id="militaryService" {...register("militaryService")} className={inputClass}>
                    <option value="">Select...</option>
                    <option value="none">None</option>
                    <option value="active">Active Duty</option>
                    <option value="veteran">Veteran</option>
                    <option value="reserve">Reserve / National Guard</option>
                  </select>
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm text-foreground">
                    <input type="checkbox" {...register("isStudent")} className="h-4 w-4 rounded border-border text-primary" />
                    Full-time student (good student discount may apply)
                  </label>
                </div>
              </div>
            </fieldset>

            {/* File Upload */}
            <div>
              <FieldLabel htmlFor="fileUpload" tooltip="Upload photos of your vehicle, property, or current declarations page">
                Attachments (Optional)
              </FieldLabel>
              <div
                onDrop={onDrop}
                onDragOver={(e) => e.preventDefault()}
                className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted/50 p-8 text-center transition-colors hover:border-primary/50"
              >
                <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                <p className="mb-1 text-sm text-foreground">
                  Drag &amp; drop files here, or{" "}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    browse
                  </button>
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG up to 10 MB each
                </p>
                <input
                  ref={fileInputRef}
                  id="fileUpload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files) {
                      setFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
                    }
                  }}
                />
              </div>
              {files.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {files.map((f, i) => (
                    <li key={i} className="flex items-center justify-between rounded-lg bg-muted px-3 py-1.5 text-sm">
                      <span className="truncate text-foreground">{f.name}</span>
                      <button
                        type="button"
                        onClick={() => setFiles((prev) => prev.filter((_, idx) => idx !== i))}
                        className="ml-2 text-xs text-destructive hover:underline"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
