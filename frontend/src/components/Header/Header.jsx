import React, {useState} from 'react';
import './Header.scss'
import LoginModal from "../modals/Auth/LoginModal/LoginModal";
import RegisterModal from "../modals/Auth/RegisterModal/RegisterModal";

const Header = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <>
      <nav className='header__wrapper'>
        <div className='header container'>
          <h1>
            lorem
          </h1>


          <ul>
            <li>
              <span onClick={() => setIsLoginModalOpen(true)}>Увійти</span>
            </li>
            <li>
              <span onClick={() => setIsRegisterModalOpen(true)}>Реєстрація</span>
            </li>
          </ul>
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