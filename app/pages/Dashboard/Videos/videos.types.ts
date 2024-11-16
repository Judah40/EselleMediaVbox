export type PostVideoData = {
    id: number;
    postId: string;
    userId: number;
    content: string;
    thumbnailUrl: string;
    bannerUrl: string;
    videoUrl: string;
    caption: string;
    likeCount: number;
    commentCount: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    isPublic: boolean;
    isDeleted: boolean;
    tags: string[]; // Assuming tags are strings
    location: string;
  };
  