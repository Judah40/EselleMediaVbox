export type Picture = {
    id: string; // Unique identifier for the picture
    url: string; // The URL where the picture is stored
    title?: string; // Optional title or description for the picture
    format: "jpg" | "png" | "gif" | "webp"; // File format of the picture
    sizeInBytes: number; // File size in bytes
    width: number; // Width of the picture in pixels
    height: number; // Height of the picture in pixels
    uploadedAt: Date; // Timestamp of when the picture was uploaded
  };
  