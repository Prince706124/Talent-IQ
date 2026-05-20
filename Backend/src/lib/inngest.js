import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../Models/User.js";
import { upsertStreamUser } from "./stream.js";
import { deleteStreamUser } from "./stream.js";

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

    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });
  },
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user" },
  { event: "clerk/user.deleted" },
  async (event) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
  },
);

//challeng - send a welcome Email after singup

export const functions = [syncUser, deleteUserFromDB];
