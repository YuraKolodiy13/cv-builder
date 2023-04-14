import React, {useState} from 'react';
import './Header.scss'
import LoginModal from "../modals/Auth/LoginModal/LoginModal";
import RegisterModal from "../modals/Auth/RegisterModal/RegisterModal";
import {useAppSelector} from "../../hooks/redux";
import {NavLink} from 'react-router-dom';

const Header = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const user = useAppSelector(state => state.auth.user);

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
                  <span>Logout</span>
                </li>
              </ul>
            : <ul>
                <li>
                  <span onClick={() => setIsLoginModalOpen(true)}>Увійти</span>
                </li>
                <li>
                  <span onClick={() => setIsRegisterModalOpen(true)}>Реєстрація</span>
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