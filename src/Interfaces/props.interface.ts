import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"
import { Booking } from "./bookings.interfaces"
import { User } from "./user.interface"
import { Ad } from "./ads.interfaces"
import { RoomFacility } from "./facilities.interface";


export type ConfirmDeleteProps ={
    open:boolean,
    confirm:()=>Promise<void>,
    message:string
    handleClose: Dispatch<SetStateAction<boolean>>,
    loading:boolean   
}
export type TableActionProps = {
  item: Room | Booking | User | RoomFacility | Ad;
  handleDeleteItem: (itemId: string, itemNumber: string) => void;
  route: string;
  handleEditItem?: (item: RoomFacility) => void;
};

export type TableDataProps = {
    loading: boolean;
    items: (Room | Booking | User | RoomFacility)[]; // Define the array of items
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
    renderRow: (item: Room | Booking | User | RoomFacility, index: number) => React.ReactNode; // Correctly type renderRow
  };
  
export type HeaderProps = {
    title:string,
    route:string,
    onAddClick?: () => void;
}



export  interface ViewDataModalProps {
    open: boolean;
    handleClose: (val: boolean) => void;
    data: Record<string, any> | null;
    title?:string
  }

export type changePassProp = {
    open:boolean,
    setOpen:Dispatch<SetStateAction<boolean>>
}
export type PaginationCompProps = {
    count: number;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    size: number;
  } 


