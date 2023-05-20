import React, {useState} from 'react';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {useSignInMutation} from "../../../store/auth/auth.api";
import {useActions} from "../../../hooks/actions";
import {IAuthProps, ISignIn} from "../../../interfaces";

const LoginModal: React.FC<IAuthProps> = ({setIsModalOpen}) => {

  const [signIn] = useSignInMutation();
  const {setUser} = useActions();

  const [state, setState] = useState<ISignIn>({email: '', password: ''});
  const [error, setError] = useState<string | null>(null);

  const submitLogin = async () => {
    const user = await signIn(state);
    if ('error' in user) {
      // @ts-ignore
      const {message} = user.error.data;
      setError(message);
    } else {
      setUser(user.data);
      closeModal();
    }
  };

  const onHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setState({...state, [e.target.name]: e.target.value})
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setState({email: '', password: ''});
    setError(null);
  };


  return (
    <>
      <h3 className="heading">Sign In</h3>
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
            {error && <p>{error}</p>}
          </div>
        </div>
        <Button
          variant="contained"
          type='submit'
          className='button'
          onClick={submitLogin}
        >
          Sign In
        </Button>
      </div>
    </>
  )
};

export default LoginModal;