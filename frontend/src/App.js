import Router from "./routers/router";
import { HeaderProvider } from "./contexts/HeaderContext";

const App = () => {
  return (
    <>
      <HeaderProvider>
        <Router />
      </HeaderProvider>
    </>
  );
};

export default App;
