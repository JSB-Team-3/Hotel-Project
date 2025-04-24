
import { ReactNode } from 'react';

export interface SidebarLayoutProps {
  children: ReactNode;
}

export interface StyledComponentProps {
  open?: boolean;
}

export interface MenuItem {
  id: string;
  text: string;
  icon: ReactNode;
  path: string;
}