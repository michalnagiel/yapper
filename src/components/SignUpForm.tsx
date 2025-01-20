import { useState } from "react";
import "../styles/SignUpForm.scss";
import { signUp } from "../api/apiService";

const SignUpForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(" ");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await signUp(username, email, password);
      console.log("Account registered successfully", response);
    } catch (error) {
      console.error("Error registering account:", error);
    }
    closeModal();
  };

  return (
    <div>
      <button className="btn btn-outline-primary" onClick={openModal}>
        Sign Up
      </button>
      {isOpen ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Username:
                <input
                  type="text"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </label>
              <label>
                Email:
                <input type="text" value={email} onChange={handleEmailChange} />
              </label>
              <label>
                Password:
                <input type="text" onChange={handlePasswordChange} />
              </label>
              <button
                className="btn btn-primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SignUpForm;
