import Session from "../Models/Session.js";
import { chatClient, streamClient, upsertStreamUser } from "../lib/stream.js";

export async function createSession(req, res) {
  try {
    const { problem, difficulty } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Missing problem or difficulty" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    //create session in db
    const session = await Session.create({
      problem,
      difficulty,
      host: userId,
      callId,
    });

    //create session in stream
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty, sessionId: session._id.toString() },
      },
    });

    //create chat

    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Sesion`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

    res.status(201).json({ session });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getActiveSessions(req, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("error in getActiveSessions", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const sessions = await Session.find({
      status: "completed",
      $or: [{ host: req.user._id }, { participant: req.user._id }],
    })
      .populate("host", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);
    res.status(200).json({ sessions });
  } catch (error) {
    console.log("error in getMyRecentSessions", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const session = await Session.findById(req.params.id)
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId");
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in getSessionById", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if (session.status === "completed")
      return res.status(400).json({ message: "Session already completed" });
    if (session.host.toString() === userId.toString())
      return res
        .status(400)
        .json({ message: "You cannot join your own session" });

    if (session.participant)
      return res.status(400).json({ message: "Session is full" });
    session.participant = req.user._id;
    await session.save();
    const channel = chatClient.channel("messaging", session.callId);

    await channel.addMembers([clerkId]);
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in joinSession", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const session = await Session.findById(id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }
    if (session.host.toString() !== userId.toString())
      return res.status(403).json({ message: "Unauthorized" });
    if (session.status === "completed")
      return res.status(400).json({ message: "Session already completed" });

    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();
    session.status = "completed";
    await session.save();
    res.status(200).json({ session });
  } catch (error) {
    console.log("error in endSession", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
