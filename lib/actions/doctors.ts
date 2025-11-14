"use server";
import { prisma } from "@/lib/prisma";
import { Gender } from "@prisma/client";
import { generateAvatar } from "../utils";
import { revalidatePath } from "next/cache";

export async function getDoctors() {
  try {
    const doctors = await prisma.doctor.findMany({
      include: {
        _count: { select: {appointments: true} },
      },
      orderBy: { createdAt: "desc" },
    });

    return doctors.map((doctor) => ({
      ...doctor,
      appointmentsCount: (doctor as any)._count.appointments, // type assertion added here
    }));
  } catch (error) {
    console.log("Error fetching doctors:", error);
    throw new Error("Could not fetch doctors");
  }
}

interface createDoctorInput {
  name: string;
  email: string;
  phone: string;
  specialty: string;
  gender: Gender
  isActive: boolean;
}
export async function createDoctor(input:createDoctorInput) {
  try {
    if(!input.name || !input.email || !input.phone) {
      throw new Error("Name, email and phone are required");
    };
    const doctor = await prisma.doctor.create({
      data: {
        ...input,
        // map Gender to the two allowed literals for generateAvatar; default non-FEMALE to MALE
        imageUrl: generateAvatar(input.name, input.gender === "FEMALE" ? "FEMALE" : "MALE"),
      }
    })

    revalidatePath('/admin');
    return doctor;
  } catch (error: any) {
    console.error("Error creating doctor:", error);

    // handle unique constraint violation (email already exists)
    if (error?.code === "P2002") {
      throw new Error("A doctor with this email already exists");
    }

    throw new Error("Failed to create doctor");

  }
}


interface updateDoctorInput {
  id: string;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  specialty?: string | null;
  gender?: Gender;
  isActive?: boolean;
}


export async function updateDoctor(input: updateDoctorInput) {
  try {
    if(!input.name || !input.email) 
      throw new Error("Name and email are required");
    const currentdoctor = await prisma.doctor.findUnique({
      where: { id: input.id },
      select: { email: true }
    });
    if(!currentdoctor)
      throw new Error("Doctor not found");
    // If email is being updated, check for uniqueness
    if(input.email !== currentdoctor.email) {
      const existingDoctor = await prisma.doctor.findUnique({
        where: { email: input.email }
      });
      if(existingDoctor)
        throw new Error("A doctor with this email already exists");
    }
    const doctor = await prisma.doctor.update({
      where: { id: input.id },
      data: { 
        name: input.name,
        email: input.email,
        phone: input.phone,
        specialty: input.specialty,
        gender: input.gender,
        isActive: input.isActive,
       }
    });
    revalidatePath('/admin');
    return doctor;
  } catch (error) {
    console.error("Error updating doctor:", error);
    throw new Error("Failed to update doctor");
    
  }
}