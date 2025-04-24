// sidebar.constant.ts
import { useTranslation } from 'react-i18next';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import EventNoteIcon from '@mui/icons-material/EventNote';
import LockIcon from '@mui/icons-material/Lock';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom'; // optional for Facilities if using another icon
import BookOnlineIcon from '@mui/icons-material/BookOnline'; // optional for Bookings

export const SIDEBAR_WIDTH_OPEN = 240;
export const SIDEBAR_WIDTH_CLOSED = 80;

export const menuItems = [
  { textKey: 'sidebar.home', icon: <HomeIcon />, route: '/' },
  { textKey: 'sidebar.users', icon: <PeopleIcon />, route: '/users' },
  { textKey: 'sidebar.rooms', icon: <ViewModuleIcon />, route: '/rooms' },
  { textKey: 'sidebar.ads', icon: <EventNoteIcon />, route: '/ads' },
  { textKey: 'sidebar.bookings', icon: <BookOnlineIcon />, route: '/bookings' },
  { textKey: 'sidebar.facilities', icon: <MeetingRoomIcon />, route: '/facilities' },
  { textKey: 'sidebar.change_password', icon: <LockIcon />, route: '/change-password' },
];
