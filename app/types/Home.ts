// Type definitions
export interface Content {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  duration: string;
  year: number;
  rating: number;
  genre: string[];
  isLive?: boolean;
  progress?: number;
  isNew?: boolean;
  type?: string;
}

export interface ContentCardProps extends Content {
  size: string;
}

export interface HeroSectionType {
  content: Content;
  onPlay: () => void;
  onAddToList: () => void;
}

export interface HeaderType {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export interface ContentRowType {
  title: string;
  items: Content[];
  onPlay: (content: Content) => void;
  onAddToList: (content: Content) => void;
}

export interface ContentCardComponentProps {
  content: Content;
  onPlay: () => void;
  onAddToList: () => void;
  size: string;
}
