import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    //use clerkId for stream(not mongodb_id)=> it should match the id we have in stream dashboard
    const token = await chatClient.createUserToken(req.user.clerkId.toString());
    res.status(200).json({
      token,
      UserId: req.user.clerkId,
      name: req.user.name,
      image: req.user.profileImage,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
}
