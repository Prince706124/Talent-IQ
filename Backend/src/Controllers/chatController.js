import { chatClient, streamClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // use clerkId for stream (not mongodb_id) => it should match the id we have in stream dashboard
    const videoToken = streamClient.generateUserToken({
      user_id: req.user.clerkId.toString(),
    });
    const chatToken = chatClient.createToken(req.user.clerkId.toString());

    res.status(200).json({
      token: videoToken,
      videoToken,
      chatToken,
      userId: req.user.clerkId,
      userName: req.user.name,
      userImage: req.user.profileImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
