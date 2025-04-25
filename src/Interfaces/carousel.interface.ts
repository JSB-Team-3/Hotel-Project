import { Navigation } from 'swiper/modules';

export interface ImageCarouselProps {
  images?: string[];
  height?: number | string;
  width?: string | number;
  borderRadius?: number;
  showPlaceholder?: boolean;
  placeholderBackground?: string;
  placeholderText?: string;
  Navigation?: boolean;
}
