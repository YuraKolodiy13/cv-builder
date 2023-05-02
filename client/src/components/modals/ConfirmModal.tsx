import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";

interface IConfirmModalProps {
  open: boolean;
  onBackgroundClick: () => void;
  onSubmitClick: () => void;
  modalTitle: string;
  cvName?: string;
  children?: React.ReactNode;
}

const ConfirmModal: React.FC<IConfirmModalProps> = (props) => {

  const {open, onBackgroundClick, onSubmitClick, modalTitle, cvName, children} = props;

  const handleSubmit = () => {
    onSubmitClick();
    onBackgroundClick();
  };

  return (
    <Modal
      open={open}
      onClose={onBackgroundClick}
      className='modal confirm-modal'
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={open}>
        <div className='modal__content'>
          <h3>{modalTitle}</h3>
          {children}
          <div className="modal__btns">
            <Button onClick={onBackgroundClick} variant="outlined">Cancel</Button>
            <Button disabled={cvName === ''} onClick={handleSubmit} variant="contained">Confirm</Button>
          </div>
        </div>
      </Slide>
    </Modal>
  )
};

export default ConfirmModal;