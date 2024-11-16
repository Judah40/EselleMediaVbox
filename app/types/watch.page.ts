export interface ChatMessage {
    user: string;
    comments: commentType[];
    profile: string | null;
    timestamp: string;
  }

  export interface commentType {
    id: number | null;
    liveId: string;
    comment: string;
    userId: number | null;
    createAt: string;
    updatedAt: string;
  }

  export type data = {
    comment: string;
    liveId: string;
  };



export type aboutLive ={
    liveId: string;
    title: string;
    tags: string[];
    location: string;
    likeCount: number;
    commentCount: number;
    description: string;
}