export interface Post {
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
    createdAt: string;  // You could also use Date, but string is safer for ISO8601 date format
    updatedAt: string;  // Same as above
    isPublic: boolean;
    isDeleted: boolean;
    tags: string[];  // An array of strings for tags
    location: string;
  }