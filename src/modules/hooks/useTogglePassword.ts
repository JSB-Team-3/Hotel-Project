import { useState } from 'react';

const useTogglePassword = () => {
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  const handleConfirmPass = () => {
    setShowConfirmPass(!showConfirmPass);
  };

  const handleOldPass = () => {
    setShowOldPass(!showOldPass);
  };
  
  const handleNewPass = () => {
    setShowNewPass(!showNewPass);
  };

  return {
    showPass,
    handleShowPass,
    showConfirmPass,
    handleConfirmPass,
    showOldPass,
    handleOldPass,
    showNewPass,
    handleNewPass,
  };
};

export default useTogglePassword;