import React, { useEffect } from 'react';
import './Home.css';
import Header from '../../components/headers/header';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/auth/authSlice';
import NavBar from '../../components/NavBar/NavBar';


const Home: React.FC = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("AuthUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      dispatch(setAuthUser(user));
    }
  }, [dispatch]);

  return (
    <>
      <Header />
      <NavBar />
      <div>contenido a elegir entre plantillas</div>
      <div>pie de pagina</div>
    </>
  );

};

export default Home;
