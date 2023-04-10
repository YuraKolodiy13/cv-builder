import React, {useState} from 'react';
import {useDispatch} from "react-redux";
// import {loginRequest, resetErrors} from "../../../../actions/auth";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useSignInMutation} from "../../../../store/auth/auth.api";



const LoginModal = ({open, setIsModalOpen}) => {

  const [signIn] = useSignInMutation();
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  // const submitLogin = () => {
  //   dispatch(loginRequest(state, closeModal));
  // };
  //
  // const submitLoginError = () => {
  //   dispatch(resetErrors());
  // };

  const onHandleChange = (e) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState({
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
          <h3 className="heading">Вхід до системи</h3>
          <div className='login__form'>
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
              onClick={() => signIn(state)}
            >
              Увійти
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  )
};

export default LoginModal;