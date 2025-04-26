import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"
import { Booking } from "./bookings.interfaces"
import { User } from "./user.interface"
import { RoomFacility } from "./facilities.interface";
// import FacilitiesList from '../modules/Facilities copy/FacilitiesList/FacilitiesList';

export type ConfirmDeleteProps ={
    open:boolean,
    confirm:()=>Promise<void>,
    message:string
    handleClose: Dispatch<SetStateAction<boolean>>,
    loading:boolean   
}
export type TableActionProps = {
  item: Room | Booking | User | RoomFacility;
  handleDeleteItem: (itemId: string, itemNumber: string) => void;
  route: string;
  handleEditItem: (item: RoomFacility) => void;
  handleViewItem: (item: RoomFacility) => void;
};

export type TableDataProps = {
  loading: boolean;
  items: Room[] | Booking[] | User[] | RoomFacility[];
  page: number;
  size: number;
  handleChangePage: (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  handleChangeRowsPerPage: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  totalCount: number;
  rowsPerPageOptions: number[];
  labelRowsPerPage: string;
  columns: string[];
  renderRow: (item: Room | Booking | User | RoomFacility) => React.ReactNode;
  handleDeleteItem: (id: string, name: string) => void;
  handleEditItem: (item: RoomFacility) => void;
  item: RoomFacility;
  route?: boolean;
};

export type HeaderProps = {
    title:string,
    route:string,
    onAddClick?: () => void;
}