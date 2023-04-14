import React, {useState} from 'react';
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useSignInMutation} from "../../../../store/auth/auth.api";
import {useActions} from "../../../../hooks/actions";



const LoginModal = ({open, setIsModalOpen}) => {

  const [signIn] = useSignInMutation();
  const {setUser} = useActions();

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const submitLogin = async () => {
    const user = await signIn(state);
    setUser(user.data);
    closeModal()
  };

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
              onClick={submitLogin}
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