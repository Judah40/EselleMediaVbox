export interface FormValues {
  description: string;
  title: string;
  genre: string[];
  location: string;
  thumbnail: File | null;
  banner: File | null;
  fullVideo: File | null;
}
