import { NextResponse } from "next/server";
import mongoDbConnection from "@/middlewares/connection";
import Invite from "@/models/faculty_invite_mail";
import FacultyModel from "@/models/faculty";

export async function POST(req: Request) {
  try {
    await mongoDbConnection();
    const body = await req.json();
    const {
      token,
      
      full_name:{
        first_name,
        last_name
      },
      father_name,
      mother_name,
      spouse_name,
      date_of_birth,
      email_id,
      residential_address,
      department,
      aadhar_number,
      pan_number,
      date_of_joining,
      date_of_retirement,
      relation_between_2_employee,
      experience_in_this_college,
      net_slet_details,
      phd_details,
      subject_specialization,
      no_of_phd_guided,
      no_of_papers_published,
      number_of_books_published,
      awards_and_recognition,
      fellowships_in_societies,
      fellowships_awarded,
      membership_in_scientific_societies,
      patents_published_or_awarded,
      gender,
      reference_faculty,
      profile_photo_url,
      phd_documents,
      other_documents,
      password,
      faculty_id,
      role
    } = body;

    if (!token) {
      return NextResponse.json(
        { message: "Missing invite token" },
        { status: 400 }
      );
    }

    const invite = await Invite.findOne({ token });
    if (!invite) {
      return NextResponse.json(
        { message: "Invalid invite token" },
        { status: 400 }
      );
    }
    if (invite.used) {
      return NextResponse.json(
        { message: "Invite already used" },
        { status: 400 }
      );
    }

    const existing = await FacultyModel.findOne({ email_id: invite.email });
    if (existing) {
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 400 }
      );
    }


    const newFaculty = await FacultyModel.create({
      faculty_id ,
      full_name: {
        first_name,
        last_name,
      },
      role:"teacher",
      father_name,
      mother_name,
      spouse_name,
      date_of_birth,
      email_id: invite.email,
      residential_address,
      department,
      aadhar_number,
      pan_number,
      date_of_joining,
      date_of_retirement,
      relation_between_2_employee,
      experience_in_this_college,
      net_slet_details,
      phd_details,
      subject_specialization,
      no_of_phd_guided,
      no_of_papers_published,
      number_of_books_published,
      awards_and_recognition,
      fellowships_in_societies,
      fellowships_awarded,
      membership_in_scientific_societies,
      patents_published_or_awarded,
      gender,
      reference_faculty,
      profile_photo_url,
      phd_documents,
      other_documents,
      password: password,
      is_technical: false,
      id_created_at: new Date(),
      is_active: true,
    });

    invite.used = true;
    await invite.save();

    return NextResponse.json(
      { message: "Signup complete successfully!", faculty: newFaculty },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
