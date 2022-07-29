import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
import Sidebar from "../components/sidebar/Sidebar";
import Footer from "../components/footer/Footer";

const PrivateLayoutes = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default PrivateLayoutes;
