import React from 'react';
import AppToolBar from './AppBar';

import { Outlet } from "react-router-dom";


export default function Layout({ children }) {
  return (
    <div>
      {/*app bar*/}
      <div>
        <AppToolBar></AppToolBar>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

