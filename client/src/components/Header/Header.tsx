import React, {useState} from 'react';
import './Header.scss'
import LoginModal from "../modals/Auth/LoginModal";
import RegisterModal from "../modals/Auth/RegisterModal";
import {useAppSelector} from "../../hooks/redux";
import {NavLink} from 'react-router-dom';
import {useActions} from "../../hooks/actions";

const Header = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const {removeUser} = useActions();

  return (
    <>
      <nav className='header__wrapper'>
        <div className='header container'>
          <h1>
            <NavLink to='/'>lorem</NavLink>
          </h1>

          <ul>
            <li>
              <NavLink to='/create-cv'>Create CV</NavLink>
            </li>
            <li>
              <NavLink to='/cv-list'>Cv List</NavLink>
            </li>
          </ul>

          {user
            ? <ul>
                <li>
                  <span>{user.username}</span>
                </li>
                <li>
                  <span onClick={() => removeUser()}>Logout</span>
                </li>
              </ul>
            : <ul>
                <li>
                  <span onClick={() => setIsLoginModalOpen(true)}>Sign In</span>
                </li>
                <li>
                  <span onClick={() => setIsRegisterModalOpen(true)}>Sign Up</span>
                </li>
              </ul>
          }
        </div>
      </nav>


      <LoginModal
        open={isLoginModalOpen}
        setIsModalOpen={setIsLoginModalOpen}
      />
      <RegisterModal
        open={isRegisterModalOpen}
        setIsModalOpen={setIsRegisterModalOpen}
      />
    </>
  )
};


export default Header;