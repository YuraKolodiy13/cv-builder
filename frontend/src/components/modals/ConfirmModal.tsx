import React from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

interface IConfirmModalProps {
  open: boolean;
  onBackgroundClick: () => void;
  onSubmitClick: () => void;
  modalTitle: string;
  cvName: string;
  onCvNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ConfirmModal: React.FC<IConfirmModalProps> = (props) => {

  const {open, onBackgroundClick, onSubmitClick, cvName, modalTitle, onCvNameChange} = props;

  const handleSubmit = () => {
    onSubmitClick();
    onBackgroundClick();
  };

  return (
    <Modal open={open} onClose={onBackgroundClick} className='modal'>
      <div className='modal__content'>
        <h3>{modalTitle}</h3>
        <div className="modal__row">
          <div className="login__field modal__field w100">
            <TextField
              label="CV name"
              type="text"
              value={cvName}
              onChange={onCvNameChange}
            />
          </div>
        </div>
        <div className="modal__btns">
          <Button onClick={onBackgroundClick} variant="outlined">Cancel</Button>
          <Button disabled={!cvName} onClick={handleSubmit} variant="contained">Confirm</Button>
        </div>
      </div>
    </Modal>
  )
};

export default ConfirmModal;