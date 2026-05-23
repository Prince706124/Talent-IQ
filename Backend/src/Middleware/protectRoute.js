import { clerkClient, requireAuth } from "@clerk/express";
import User from "../Models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      let user = await User.findOne({ clerkId });
      if (!user) {
        const clerkUser = await clerkClient.users.getUser(clerkId);
        if (!clerkUser) {
          return res.status(401).json({ message: "Unauthorized" });
        }

        const email = clerkUser.emailAddresses?.[0]?.emailAddress || "";
        const name =
          `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() ||
          clerkUser.username ||
          "Clerk User";

        user = await User.create({
          name,
          email,
          profileImage: clerkUser.profileImageUrl || "",
          clerkId,
        });
      }

      req.user = user;
      next();
    } catch (error) {
      console.log("protectRoute error", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
