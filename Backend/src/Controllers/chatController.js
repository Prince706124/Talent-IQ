import { chatClient, streamClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const clerkId = req.user?.clerkId || req.auth?.userId;
    if (!clerkId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userId = clerkId.toString();
    const videoToken = streamClient.generateUserToken({
      user_id: userId,
    });
    const chatToken = chatClient.createToken(userId);

    res.status(200).json({
      token: videoToken,
      videoToken,
      chatToken,
      userId,
      userName: req.user?.name || "",
      userImage: req.user?.profileImage || "",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
