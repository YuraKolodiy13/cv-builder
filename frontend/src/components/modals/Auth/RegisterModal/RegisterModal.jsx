import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import {useSignUpMutation} from "../../../../store/auth/auth.api";

const RegisterModal = ({open, setIsModalOpen}) => {

  const [signUp] = useSignUpMutation();

  const [state, setState] = useState({
    username: '',
    email: '',
    password: ''
  });

  const onHandleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState({
      username: '',
      email: '',
      password: ''
    })
  };


  return (
    <Modal
      className='modal'
      open={open}
      onClose={closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={open}>
        <div className='modal__content'>
          <h3 className="heading">Створити новий аккаунт</h3>
          <div className='login__form'>
            <div className="modal__row">
              <div className="login__field modal__field w100">
                <TextField
                  label="Name"
                  name='username'
                  type="text"
                  value={state.username}
                  onChange={onHandleChange}
                />
              </div>
            </div>
            <div className="modal__row">
              <div className="login__field modal__field w100">
                <TextField
                  label="Email"
                  name='email'
                  type="email"
                  value={state.email}
                  onChange={onHandleChange}
                />
              </div>
            </div>
            <div className="modal__row">
              <div className="login__field modal__field w100">
                <TextField
                  label="Password"
                  name='password'
                  type="password"
                  value={state.password}
                  onChange={onHandleChange}
                />
              </div>
            </div>
            <Button
              variant="contained"
              type='submit'
              className='button'
              onClick={() => signUp(state)}
            >
              Увійти
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  )
};

export default RegisterModal;