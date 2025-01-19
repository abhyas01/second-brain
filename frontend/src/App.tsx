import { ReactElement } from "react";
import AppRoutes from "./router/AppRoutes";
import { BrowserRouter } from "react-router-dom";

function App(): ReactElement {

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App
