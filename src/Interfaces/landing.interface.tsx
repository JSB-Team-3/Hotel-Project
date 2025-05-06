import { Theme } from "@mui/system";
import { RoomDataProps } from "./rooms.interface";

// Define proper types
export interface StateDataType {
  ads: RoomDataProps[];
  rooms: RoomDataProps[];
  loading: boolean;
  addsGroup: RoomDataProps[];
}

export interface HeroSectionProps {
  primaryColor: string;
  secondaryTextColor: string;
  borderColor: string;
  currentImage: string;
  t: (key: string) => string;
}

export interface SectionTitleProps {
  title: string;
  theme: Theme;
  t: (key: string) => string;
  loading: boolean;
}

export interface MainAdsGridProps {
  loading: boolean;
  addsGroup: RoomDataProps[];
  ads: RoomDataProps[];
}