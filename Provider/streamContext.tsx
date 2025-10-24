import Cookies from "js-cookie";
import { UserAuth } from "@/useContext";
import { StreamVideoClient, User } from "@stream-io/video-client";
import React, { createContext, useState, useContext, useEffect } from "react";
const apiKey = process.env.NEXT_PUBLIC_STREAM_IO_ACCESS_KEY ?? "";

type conTextType = {
  client: StreamVideoClient | null;
};
type Provider = {
  children: React.ReactNode;
};
const Streamcontext = createContext<conTextType | null>(null);

export const StreamContextProvider: React.FC<Provider> = ({ children }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const { username, userProfilePicture } = UserAuth();

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
      setClient(streamClient);
    };

    initClient();

    return () => {
      if (client) client.disconnectUser();
    };
  }, [username, userProfilePicture]);
  return (
    <Streamcontext.Provider value={{ client }}>
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
