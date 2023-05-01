import React from 'react'
import './App.scss'
import Header from "./components/Header/Header";
import './assets/styles/globals.scss'
import {BrowserRouter as Router, Routes, Route, Navigate, Outlet} from "react-router-dom";
import CreateCv from "./pages/CreateCV/CreateCV";
import CvList from "./pages/CVList/CVList";
import ReviewCv from "./pages/ReviewCV/ReviewCV";
import Faq from "./pages/Faq/Faq";
import {useAppSelector} from "./hooks/redux";
import Homepage from "./pages/Homepage/Homepage";

export interface IProtectedRouteProps {
  token: string;
}

const ProtectedRoute = ({token}: IProtectedRouteProps) => {
  return token ? <Outlet /> : <Navigate to="/" />;
};

const App: React.FC = () => {

  const user = useAppSelector(state => state.auth.user);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/create-cv" element={<CreateCv />} />
          <Route element={<ProtectedRoute {...user}/>}>
            <Route path="/cv-list" element={<CvList />} />
          </Route>
          <Route path="/cv-list/:id" element={<ReviewCv />} />
          <Route path="/faq" element={<Faq />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
