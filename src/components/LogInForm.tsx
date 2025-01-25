import { useState } from "react";
import { getUsers, postLogin } from "../api/apiService";

import SignUpForm from "./SignUpForm";

import { User } from "../types/types";

import "bootstrap/dist/css/bootstrap.css";
import "../styles/LogInForm.scss";

interface LogInFormProps {
  onAuthenticationChange: () => void;
}

export default function LogInForm(props: LogInFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  function getUserId(username: string, users: User[]): number | null {
    for (const user of users) {
      if (user.username === username) {
        return user.id;
      }
    }
    return null;
  }

  async function handleLogin(): Promise<void> {
    try {
      const response = await postLogin(username, password);

      localStorage.setItem(
        "token",
        JSON.stringify(response.access).slice(1, -1)
      );
      localStorage.setItem("username", username);

      const users = await getUsers();
      const userId = getUserId(username, users);

      if (userId !== null) {
        localStorage.setItem("userId", userId.toString());
      } else {
        throw new Error("User ID not found.");
      }

      setIsAuthenticated(true);
      setUsername("");
      setPassword("");
      props.onAuthenticationChange();
    } catch (error) {
      console.error("Login failed:", error);
      alert(error);
    }
  }

  function handleLogout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setIsAuthenticated(false);
    props.onAuthenticationChange();
  }

  if (isAuthenticated)
    return (
      <>
        <div>
          <div className="logged">
            <span>
              You are logged as:{" "}
              <span className="username">
                @{localStorage.getItem("username")}
              </span>
            </span>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
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
            <SignUpForm />
          </div>
        </div>
      </>
    );
}
