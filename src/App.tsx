import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import Yaps from "./components/Yaps";
import Header from "./components/Header";
import { useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const handleAuthenticationChange = () => {
    setIsAuthenticated(!isAuthenticated);
    console.log(isAuthenticated);
  }

  return (
    <>
      <Header />
      <Yaps onAuthenticationChange={handleAuthenticationChange}/>
    </>
  );
}

export default App;
