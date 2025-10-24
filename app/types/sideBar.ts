import { LucideIcon } from "lucide-react";

export interface SidebarType {
  activeCategory: string;
  onCategoryChange: React.Dispatch<React.SetStateAction<string>>;
  isOpen: boolean;
  onClose: () => void;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
}
