import { ReactNode } from "react";

export interface AnimatedTableRowProps {
  index: number;
  visible: boolean;
  children: ReactNode;
  animationDuration?: number;
  delayMultiplier?: number;
}

export interface UseAnimatedRowsOptions {
    itemsCount: number;
    loading: boolean;
    animationDelay?: number;
    enabled?: boolean;
  }
  