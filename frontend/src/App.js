import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Router from "./routers/router";
import ScrollToTop from "./helpers/ScrollToTop";
import { HeaderProvider } from "./contexts/HeaderContext";
import { ColorModeProvider } from "./contexts/ColorModeContext";

const App = () => {
  return (
    <>
      <ScrollToTop>
        <HeaderProvider>
          <ColorModeProvider>
            <Router />
            <ToastContainer />
          </ColorModeProvider>
        </HeaderProvider>
      </ScrollToTop>
    </>
  );
};

export default App;
