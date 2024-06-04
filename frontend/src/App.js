import { Analytics } from "@vercel/analytics/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";
import ThemeProvider from "./themes/ThemeProvider";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <Router />
        <ToastContainer />
      </ThemeProvider>
      <Analytics />
    </>
  );
};

export default App;
