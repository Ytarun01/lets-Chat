import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  presetMessages: [
    {
      user: "User 1",
      text: "Hey, how are you?",
      timestamp: Date.now(),
      seen: false,
    },
    {
      user: "User 2",
      text: "I'm good, how about you?",
      timestamp: Date.now(),
      seen: false,
    },
    {
      user: "User 1",
      text: "Doing well, thanks!",
      timestamp: Date.now(),
      seen: false,
    },
    {
      user: "User 2",
      text: "Great to hear that!",
      timestamp: Date.now(),
      seen: false,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    sendMessage: (state, action) => {
      state.messages.push({
        user: "User 1",
        text: action.payload,
        timestamp: Date.now(),
        seen: false,
      });
    },
    receiveMessage: (state, action) => {
      state.messages.push({
        user: "User 2",
        text: action.payload,
        timestamp: Date.now(),
        seen: false,
      });
    },
    markMessageAsSeen: (state) => {
      const lastUser1Message = state.messages
        .filter((msg) => msg.user === "User 1")
        .pop();
      if (lastUser1Message) {
        lastUser1Message.seen = true;
      }
    },
    sendPresetMessages: (state) => {
      state.messages.push(...state.presetMessages);
    },
  },
});

export const {
  sendMessage,
  receiveMessage,
  markMessageAsSeen,
  sendPresetMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
