import React from "react";
import { Outlet, Link } from "react-router-dom";
import Footer from "./components/Footer";

const Layout = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
      <Footer /> {/* 加入footer於頁面最下方 */}
    </div>
  );
};

export default Layout;
