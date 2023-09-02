import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";

// theme provider
import Themeprovider from "./themes/Themeprovider";

const App = () => {
  return (
    <>
      <Themeprovider>
        <Router />
        <ToastContainer />
      </Themeprovider>
    </>
  );
};

export default App;
