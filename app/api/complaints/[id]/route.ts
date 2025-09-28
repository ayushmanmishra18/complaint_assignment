// app/api/complaints/[id]/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../../lib/dbConnect";
import Complaint from "../../../../models/Complaint";
import { sendEmail } from "../../../../lib/mailer";

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    const update = await request.json();
    await dbConnect();
    const complaint = await Complaint.findByIdAndUpdate(id, update, { new: true });
    if (!complaint) return NextResponse.json({ message: "Not found" }, { status: 404 });

    // email on status change
    if (update.status) {
      const admin = process.env.ADMIN_EMAIL;
      if (admin) {
        const subject = `Complaint Updated: ${complaint.title}`;
        const html = `
          <h3>Complaint Status Updated</h3>
          <p><b>Title:</b> ${complaint.title}</p>
          <p><b>New Status:</b> ${complaint.status}</p>
          <p><small>Updated: ${new Date().toISOString()}</small></p>
        `;
        try { await sendEmail(admin, subject, html); } catch (e) { console.error(e); }
      }
    }

    return NextResponse.json(complaint);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  try {
    await dbConnect();
    const deleted = await Complaint.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
