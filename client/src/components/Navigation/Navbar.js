import React from 'react';
import { useSelector } from 'react-redux';
// import AdminNavbar from './admin/AdminNavbar';

import PrivateNavbar from './private/PrivateNavbar';
import PublicNavbar from './public/PublicNavbar';

const Navbar = () => {
  //get user from store
  const state = useSelector((state) => state.users);
  const { userAuth, profile } = state;
  const isAdmin = userAuth?.isAdmin;

  //account verification

  return <>{userAuth ? <PrivateNavbar /> : <PublicNavbar />}</>;
};

export default Navbar;
