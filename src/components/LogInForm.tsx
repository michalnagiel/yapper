import "bootstrap/dist/css/bootstrap.css";
import { getUsers, postLogin } from "../api/apiService";
import { useState } from "react";
import SignUpForm from "./SignUpForm";

//import "./LoginForm.scss";

import { User } from "../types/types";

export default function LogInForm(props: any) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const getUserId = (username: string, users: User[]): number | null => {
    for (const user of users) {
      if (user.username === username) {
        return user.id;
      }
    }
    return null;
  };

  const handleLogin = async () => {
    try {
      const response = await postLogin(username, password);
      console.log("Login successful:", response);

      localStorage.setItem(
        "token",
        JSON.stringify(response.access).slice(1, -1)
      );
      localStorage.setItem("username", username);

      const users = await getUsers();
      console.log(users);
      const userId = getUserId(username, users);

      if (userId !== null) {
        localStorage.setItem("userId", userId.toString());
      } else {
        throw new Error("User ID not found.");
      }

      //console.log(getUsers().toString());
      setIsAuthenticated(true);
      //props.onRefresh();
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
      alert(error);
    }
  };

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    props.onRefresh();
  }

  if (isAuthenticated)
    return (
      <>
        <div>
          <div className="logged">
            <div>
              <h5>You are logged as: {localStorage.getItem("username")}</h5>
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </>
    );
  else
    return (
      <>
        <div className="login-form">
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
              placeholder="username"
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn btn-outline-primary"
              type="button"
              onClick={handleLogin}
            >
              Log In
            </button>
            <div className="sign-up">
              <SignUpForm />
            </div>
          </div>
        </div>
      </>
    );
}
