import React, {FC, useState} from 'react';
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Slide from "@mui/material/Slide";
import {IAuthProps} from "../../../interfaces";
import clsx from "clsx";
import './index.scss';

const Auth: FC<IAuthProps> = ({open, setIsModalOpen}) => {

  const [isNewUser, setIsNewUser] = useState<boolean>(false);

  return (
    <Modal
      className='modal auth'
      open={open!}
      onClose={() => setIsModalOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Slide direction="down" in={open}>
        <div className={clsx('modal__content', {signUp: isNewUser})}>
          {isNewUser
            ? <RegisterModal
                setIsModalOpen={setIsModalOpen}
              />
            : <LoginModal
                setIsModalOpen={setIsModalOpen}
              />
          }
          <p className='auth__caption'>
            {isNewUser
              ? <>Have an account? <a onClick={() => setIsNewUser(false)}>Sign in</a></>
              : <>New here? create a free account! <a onClick={() => setIsNewUser(true)}>Sign up</a></>
            }
          </p>
        </div>
      </Slide>
    </Modal>
  )

};

export default Auth;