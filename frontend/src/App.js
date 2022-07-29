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
          </ColorModeProvider>
        </HeaderProvider>
      </ScrollToTop>
    </>
  );
};

export default App;
