import Cookies from "js-cookie";
import { UserAuth } from "@/useContext";
import { StreamVideoClient, User } from "@stream-io/video-client";
import React, { createContext, useState, useContext, useEffect } from "react";
import { StreamChat } from "stream-chat";
const apiKey = process.env.NEXT_PUBLIC_STREAM_IO_ACCESS_KEY ?? "";

type conTextType = {
  client: StreamVideoClient | null;
  chatClient: StreamChat | null;
};
type Provider = {
  children: React.ReactNode;
};
const Streamcontext = createContext<conTextType | null>(null);

export const StreamContextProvider: React.FC<Provider> = ({ children }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { username, userProfilePicture } = UserAuth();
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  useEffect(() => {
    const initClient = async () => {
      const token = Cookies.get("streamToken");

      if (!token || !username?.id || !username?.firstName || !apiKey) {
        console.error("❌ Missing required data to initialize client.");
        return;
      }

      const user: User = {
        id: username.id.toString(),
        name: username.firstName,
        image: userProfilePicture ?? undefined,
      };

      const streamClient = new StreamVideoClient({
        apiKey,
        token,
        user,
      });
      const chatClient = new StreamChat(apiKey);
      await chatClient.connectUser(
        {
          id: user.id,
          name: user.name,
          image: user.image,
        },
        token
      );

      setChatClient(chatClient);
      setClient(streamClient);
    };

    initClient();

    return () => {
      if (client) client.disconnectUser();
      if (chatClient) chatClient.disconnectUser();
    };
  }, [username, userProfilePicture]);
  return (
    <Streamcontext.Provider value={{ client, chatClient }}>
      {children}
    </Streamcontext.Provider>
  );
};

export const useStreamContext = () => {
  const context = useContext(Streamcontext);
  if (context == undefined) {
    throw new Error("useContext must be used within an AuthProvider");
  }

  return context;
};
