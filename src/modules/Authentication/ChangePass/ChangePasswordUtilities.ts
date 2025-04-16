import { useState } from 'react'

function useTogglePassword() {
    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setConfirmPass] = useState<boolean>(false);
    const [showOldPass, setOldPass] = useState<boolean>(false);
    const handleShowPass = (): void => setShowPass((prev) => !prev);
    const handleConfirmPass = (): void => setConfirmPass((prev) => !prev);
    const handleOldPass = (): void => setOldPass((prev) => !prev);
    return{showPass,showConfirmPass,showOldPass,handleShowPass,handleConfirmPass,handleOldPass}
}
export interface ChangePassPayload {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
export default useTogglePassword
export const  maodalStyles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'white',
    boxShadow: 24,
    p: 4,
}