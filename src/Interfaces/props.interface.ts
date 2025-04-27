import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"
import { Booking } from "./bookings.interfaces"
import { User } from "./user.interface"
import { RoomFacility } from "./facilities.interface";

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
  handleEditItem?: (item: RoomFacility) => void;
};

export type TableDataProps<T> = {
  loading: boolean;
  items: T[];
  page: number;
  size: number;
  handleChangePage: (_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  totalCount: number;
  rowsPerPageOptions: number[];
  labelRowsPerPage: string;
  columns: string[];
  renderRow: (item: T, index?: number, extraProps?: { handleDeleteItem: (...args: any[]) => void, route?: string }) => React.ReactNode;
  handleDeleteItem?: (...args: any[]) => void;
  handleEditItem?: (...args: any[]) => void;
  route?: string;
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

