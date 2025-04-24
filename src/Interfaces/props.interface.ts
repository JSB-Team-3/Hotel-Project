import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"
import { Booking } from "./bookings.interfaces"

export type ConfirmDeleteProps ={
    open:boolean,
    confirm:()=>Promise<void>,
    message:string
    handleClose: Dispatch<SetStateAction<boolean>>,
    loading:boolean   
}
export type TableActionProps ={
    item:Room | Booking,
    handleDeleteItem:(itemId: string, itemNumber: string) => void,
    route:string,
   
}

export type TableDataProps = {
    loading:boolean,
    items:Room[] | Booking[],    
    handleDeleteItem:(itemId: string, itemNumber: string) => void,
    page:number,
    size:number,
    handleChangePage:(_: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => void,
    handleChangeRowsPerPage:(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void,
    totalCount:number,
    rowsPerPageOptions:number[],
    labelRowsPerPage:string,
    columns:string[],
    renderRow: (item: Room|Booking) => React.ReactNode; 

}

export type HeaderProps = {
    title:string,
    route:string,
}