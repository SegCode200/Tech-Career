import { Outlet } from 'react-router-dom';
import Header from '../static/Header';
import Footer from '../static/Footer';
import SplashScreen from '../static/SplashScreen'; // ✅ Adjust path if different
import { useEffect, useState } from 'react';

const Layout = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
