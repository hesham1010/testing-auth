"use server";
import DBconnect from "../db";
import Venue from "../models/venue";
import { redirect, notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
export async function addVenue(formState, formdata) {
  await DBconnect();
  try {
    const newVenue = new Venue({
      name: formdata.name,
      address: formdata.address,
      state: formdata.state,
    });
    await newVenue.save();
    // return {message:"ok"}
  } catch (error) {
    return { message: error.message };
  }
  revalidatePath("/dashboard/addevent");
  redirect("/dashboard");
}
