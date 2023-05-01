import React, {useState} from 'react';
import './Header.scss'
import LoginModal from "../modals/Auth/LoginModal";
import RegisterModal from "../modals/Auth/RegisterModal";
import {useAppSelector} from "../../hooks/redux";
import {NavLink, useNavigate} from 'react-router-dom';
import {useActions} from "../../hooks/actions";

const Header = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const {removeUser} = useActions();

  const logoutUser = async () => {
    await removeUser();
    navigate('/');
  }

  return (
    <>
      <nav className='header__wrapper'>
        <div className='header'>
          <div className="header__homepage">
            <NavLink to='/'>CV Builder</NavLink>
          </div>
          <ul>
            <li>
              <NavLink to='/create-cv'>Create CV</NavLink>
            </li>
            <li>
              <NavLink to='/cv-list'>Cv List</NavLink>
            </li>
            <li>
              <NavLink to='/faq'>FAQ</NavLink>
            </li>
          </ul>

          {user
            ? <ul>
                <li>
                  <span>{user.username}</span>
                </li>
                <li>
                  <span onClick={logoutUser}>Logout</span>
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