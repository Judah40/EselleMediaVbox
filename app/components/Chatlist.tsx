import React from "react";
import { MessageList } from "react-chat-elements";
import "react-chat-elements/dist/main.css";

function Chatlist() {
  return (
    <MessageList
      className="message-list"
      lockable={true}
      toBottomHeight={"100%"}
      referance={{}}
      dataSource={[
        {
          id: 1, // Unique ID for each message
          position: "left",
          titleColor: "red",
          type: "text",
          title: "Kursat",
          text: "Give me a message list example!",
          date: new Date(), // Date when the message was sent
          focus: false, // Optional, controls whether the message is focused or not
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
          
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
        {
          id: 2,
          position: "left",
          type: "text",
          title: "Emre",
          text: "That's all.",
          date: new Date(), // Required date property
          focus: true, // Optional
          titleColor: "red",
          forwarded: false,
          replyButton: false,
          removeButton: false,
          status: "read",
          notch: false,
          retracted: false,
        },
      ]}
    />
  );
}

export default Chatlist;
