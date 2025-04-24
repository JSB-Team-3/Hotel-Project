import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"
import { Booking } from "./bookings.interfaces"
import { User } from "./user.interface"

export type ConfirmDeleteProps ={
    open:boolean,
    confirm:()=>Promise<void>,
    message:string
    handleClose: Dispatch<SetStateAction<boolean>>,
    loading:boolean   
}
export type TableActionProps ={
    item:Room | Booking | User,
    handleDeleteItem:(itemId: string, itemNumber: string) => void,
    route:string,
   
}

export type TableDataProps = {
    loading:boolean,
    items:Room[] | Booking[] | User[],    
    page:number,
    size:number,
    handleChangePage:(_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    totalCount:number,
    rowsPerPageOptions:number[],
    labelRowsPerPage:string,
    columns:string[],
    renderRow: (item: Room|Booking|User) => React.ReactNode; 

}

export type HeaderProps = {
    title:string,
    route:string,
}