import { Inngest } from "inngest";
import { connectDB } from "./db";
import User from "../Models/User";

export const inngest = new Inngest({ id: "Talent-IQ" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async (event) => {
    await connectDB();
    const { id, email_adress, first_name, last_name, profile_image_url } =
      event.data;

    const newUser = new User({
      name: `${first_name} ${last_name}`,
      email: email_adress,
      profileImage: profile_image_url,
      clerkId: id,
    });
    await User.create(newUser);
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async (event) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  },
);

export const functions = [syncUser, deleteUserFromDB];
