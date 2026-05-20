import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";
import express from "express";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  throw new Error("Missing Stream API key or secret");
}

export const streamClient = new StreamClient(apiKey, apiSecret); //this is for video calls
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); //this is for chat features

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("user created", userData);
  } catch (error) {
    console.log("error", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("user deleted", userId);
  } catch (error) {
    console.log(error);
  }
};
