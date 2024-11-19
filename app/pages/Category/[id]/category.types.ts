
// Type for the Post object
export interface Post {
  id: number; // Primary key
  postId: string; // UUID for post
  userId: number; // User ID (foreign key)
  content: string; // Content of the post
  thumbnailUrl: string; // URL of the thumbnail
  bannerUrl: string; // URL of the banner
  videoUrl: string; // URL of the video
  caption: string; // Caption of the post
  likeCount: number; // Count of likes
  commentCount: number; // Count of comments
  createdAt: string; // Date of post creation (ISO string)
  updatedAt: string; // Date of last update (ISO string)
  isPublic: boolean; // Whether the post is public
  isDeleted: boolean; // Whether the post is deleted
  tags: string[]; // Array of tags associated with the post
  location: string; // Location related to the post
}