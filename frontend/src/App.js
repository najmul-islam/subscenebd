import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/Router";
import ScrollToTop from "./helpers/ScrollToTop";

// context api
import { MovieProvider } from "./contexts/MovieContext";
// theme provider
import Themeprovider from "./themes/Themeprovider";

const App = () => {
  return (
    <>
      <ScrollToTop>
        {/* <MovieProvider> */}
        <Themeprovider>
          <Router />
          <ToastContainer />
        </Themeprovider>
        {/* </MovieProvider> */}
      </ScrollToTop>
    </>
  );
};

export default App;
