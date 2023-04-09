import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";
import ScrollToTop from "./helpers/ScrollToTop";

// context api
import { MovieProvider } from "./contexts/MovieContext";
import { HeaderProvider } from "./contexts/HeaderContext";
import { ColorModeProvider } from "./contexts/ColorModeContext";

const App = () => {
  return (
    <>
      <ScrollToTop>
        <MovieProvider>
          <HeaderProvider>
            <ColorModeProvider>
              <Router />
              <ToastContainer />
            </ColorModeProvider>
          </HeaderProvider>
        </MovieProvider>
      </ScrollToTop>
    </>
  );
};

export default App;
