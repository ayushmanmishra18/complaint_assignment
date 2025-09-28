// app/api/complaints/route.ts
import { NextResponse } from "next/server";
import { dbConnect } from "../../../lib/dbConnect";
import Complaint from "../../../models/Complaint";
import { sendEmail } from "../../../lib/mailer";

export async function GET(request: Request) {
  try {
    await dbConnect();
    const url = new URL(request.url);
    const status = url.searchParams.get("status") || undefined;
    const priority = url.searchParams.get("priority") || undefined;

    const filter: any = {};
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const complaints = await Complaint.find(filter).sort({ dateSubmitted: -1 }).lean();
    return NextResponse.json(complaints);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, category, priority } = body;
    if (!title || !description || !category || !priority) {
      return NextResponse.json({ message: "Missing fields" }, { status: 400 });
    }

    await dbConnect();
    const complaint = await Complaint.create({ title, description, category, priority });

    // notify admin
    const admin = process.env.ADMIN_EMAIL;
    if (admin) {
      const subject = `New Complaint: ${complaint.title}`;
      const html = `
        <h3>New Complaint Submitted</h3>
        <p><b>Title:</b> ${complaint.title}</p>
        <p><b>Category:</b> ${complaint.category}</p>
        <p><b>Priority:</b> ${complaint.priority}</p>
        <p><b>Description:</b><br/> ${complaint.description}</p>
        <p><small>Date: ${complaint.dateSubmitted.toISOString()}</small></p>
      `;
      try { await sendEmail(admin, subject, html); } catch (e) { console.error(e); }
    }

    return NextResponse.json(complaint, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
