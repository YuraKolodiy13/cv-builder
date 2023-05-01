import React from 'react';
import './Header.scss'
import {useAppSelector} from "../../hooks/redux";
import {NavLink, useNavigate} from 'react-router-dom';
import {useActions} from "../../hooks/actions";
import Auth from "../modals/Auth/Auth";
import Button from '@mui/material/Button/Button';

const Header = () => {

  const isAuthModalOpen = useAppSelector(state => state.auth.isAuthModalOpen);
  const user = useAppSelector(state => state.auth.user);
  const navigate = useNavigate();
  const {removeUser, setIsAuthModalOpen} = useActions();

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
            {user && (
              <li>
                <NavLink to='/cv-list'>Cv List</NavLink>
              </li>
            )}
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
            : <Button onClick={() => setIsAuthModalOpen(true)} variant='outlined'>
                Sign In
              </Button>
          }
        </div>
      </nav>

      {isAuthModalOpen && (
        <Auth
          open={isAuthModalOpen}
          setIsModalOpen={setIsAuthModalOpen}
        />
      )}

    </>
  )
};


export default Header;