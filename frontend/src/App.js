import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";
import ScrollToTop from "./helpers/ScrollToTop";

// theme provider
import Themeprovider from "./themes/Themeprovider";

const App = () => {
  return (
    <>
      <ScrollToTop>
        <Themeprovider>
          <Router />
          <ToastContainer />
        </Themeprovider>
      </ScrollToTop>
    </>
  );
};

export default App;
