import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import {useSignUpMutation} from "../../../store/auth/auth.api";
import {IAuthProps} from "../../../interfaces";
import {useActions} from "../../../hooks/actions";

interface IAuthValidation {
  username: string;
  email: string;
  password: string;
}

const initialValue = {username: '', email: '', password: ''};

const RegisterModal: React.FC<IAuthProps> = ({open, setIsModalOpen}) => {

  const [signUp] = useSignUpMutation();
  const [state, setState] = useState(initialValue);
  const [error, setError] = useState<IAuthValidation>(initialValue);
  const {setUser} = useActions();

  const onHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState(initialValue);
    setError(initialValue);
  };

  const onHandleSubmit = async () => {
    const user = await signUp(state);
    if ('error' in user) {
      // @ts-ignore
      setError(user.error.data.reduce((acc, item) => {
        acc[item.param] = item.msg;
        return acc;
      }, {}));
    } else {
      setUser(user.data);
      closeModal();
    }
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
          <h3 className="heading">Sign Up</h3>
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
                {error.username && <p>{error.username}</p>}
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
                {error.email && <p>{error.email}</p>}
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
                {error.password && <p>{error.password}</p>}
              </div>
            </div>
            <Button
              variant="contained"
              type='submit'
              className='button'
              onClick={onHandleSubmit}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Slide>
    </Modal>
  )
};

export default RegisterModal;