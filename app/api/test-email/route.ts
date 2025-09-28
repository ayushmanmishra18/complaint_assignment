// app/api/test-email/route.ts
import { NextResponse } from "next/server";
import { sendEmail } from "../../../lib/mailer";

export async function GET(request: Request) {
	try {
		const url = new URL(request.url);
		const to = url.searchParams.get("to") || process.env.ADMIN_EMAIL;
		if (!to) {
			return NextResponse.json({ error: "ADMIN_EMAIL not configured and no 'to' provided" }, { status: 400 });
		}

		const subject = url.searchParams.get("subject") || "Test Email - Complaint System";
		const html = `
			<h3>Test Email</h3>
			<p>If you received this, your SMTP settings are working.</p>
			<ul>
				<li><b>Service:</b> ${process.env.EMAIL_SERVICE || "(custom SMTP)"}</li>
				<li><b>User:</b> ${process.env.EMAIL_USER || "(not set)"}</li>
				<li><b>To:</b> ${to}</li>
			</ul>
			<p><small>${new Date().toISOString()}</small></p>
		`;

		await sendEmail(to, subject, html);
		return NextResponse.json({ ok: true });
	} catch (error: any) {
		console.error("Test email failed:", error);
		return NextResponse.json({ ok: false, error: error?.message || "Send failed" }, { status: 500 });
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json().catch(() => ({}));
		const to = body.to || process.env.ADMIN_EMAIL;
		if (!to) {
			return NextResponse.json({ error: "ADMIN_EMAIL not configured and no 'to' provided" }, { status: 400 });
		}
		const subject = body.subject || "Test Email - Complaint System";
		const html = body.html || "<p>This is a test email from Complaint System.</p>";
		await sendEmail(to, subject, html);
		return NextResponse.json({ ok: true });
	} catch (error: any) {
		console.error("Test email failed:", error);
		return NextResponse.json({ ok: false, error: error?.message || "Send failed" }, { status: 500 });
	}
}


