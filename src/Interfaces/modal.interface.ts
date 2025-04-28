export interface UserDetailsModalProps {
  open: boolean;
  handleClose: (val: boolean) => void;
  loading?: boolean;
  data: Record<string, any> | null;
}

export interface ViewRenderProps{
  handleClose: (val: boolean) => void;
  data: Record<string, any> | null;

}