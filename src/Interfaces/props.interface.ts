import { Dispatch, SetStateAction } from "react"
import { Room } from "./rooms.interface"

export type ConfirmDeleteProps ={
    open:boolean,
    confirm:()=>Promise<void>,
    message:string
    handleClose: Dispatch<SetStateAction<boolean>>,
    loading:boolean   
}
export type TableActionProps ={
    item:Room,
    handleDeleteItem:(itemId: string, itemNumber: string) => void,
   
}