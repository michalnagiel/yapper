import "bootstrap/dist/css/bootstrap.css";

import "./App.css";
import Yaps from "./components/Yaps";
import Header from "./components/Header";
import { useEffect, useState } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 10000);
    console.log(time);
    return () => {
      clearInterval(interval);
    };
  }, [time]);

  const handleAuthenticationChange = () => {
    setIsAuthenticated(!isAuthenticated);
    console.log(isAuthenticated);
  };

  return (
    <>
      <Header />
      <Yaps onAuthenticationChange={handleAuthenticationChange} />
    </>
  );
}

export default App;
