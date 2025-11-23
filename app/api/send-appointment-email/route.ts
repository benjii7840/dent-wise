import AppointmentConfirmationEmail from "@/components/emails/AppointmentConfirmationEmail";
import resend from "@/lib/actions/resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      userEmail,
      doctorName,
      appointmentDate,
      appointmentTime,
      appointmentType,
      duration,
      price,
    } = body;

    // validate required fields
    if (!userEmail || !doctorName || !appointmentDate || !appointmentTime) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("📧 Sending email to:", userEmail);

    // send the email to the actual user
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: userEmail, // ✅ Send to the actual user's email
      subject: "Appointment Confirmation - DentWise",
      react: AppointmentConfirmationEmail({
        doctorName,
        appointmentDate,
        appointmentTime,
        appointmentType,
        duration,
        price,
      }),
    });

    if (error) {
      console.error("❌ Resend error:", error);
      return NextResponse.json({ error: "Failed to send email", details: error }, { status: 500 });
    }

    console.log("✅ Email sent successfully! ID:", data?.id);

    return NextResponse.json(
      { message: "Email sent successfully", emailId: data?.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("💥 Email sending error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}