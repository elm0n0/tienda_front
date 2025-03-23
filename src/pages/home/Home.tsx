import React, { useEffect } from 'react';
import './Home.css';
import Header from '../../components/headers/Header';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../../store/auth/authSlice';

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
      <div className='header-container'>
        <Header></Header>
      </div>
      <div>menu con modificacion</div>
      <div>contenido a elegir entre plantillas</div>
      <div>pie de pagina</div>
    </>
  );

};

export default Home;
