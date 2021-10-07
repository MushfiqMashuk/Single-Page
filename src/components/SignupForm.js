import { child, getDatabase, push, ref, update } from "firebase/database";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import "../firebase";
import app from "../firebase";
import validateEmail from "../handlers/validateEmail";
//import { useHistory } from "react-router-dom";
//import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("User");
  const [state, setState] = useState(false);
  const [strongPassword, setStrongPassword] = useState(false);

  const [submitAgain, setSubmitAgain] = useState(false);

  const [error, setError] = useState(false);

  let count = 0;
  const history = useHistory();

  const userInfo = {
    username,
    email,
    password,
    designation,
  };

  function checkMail() {
    if (email.includes(".edu")) {
      setState(true);
    }
  }

  async function saveUser() {
    const db = getDatabase(app);

    const newPostKey = push(child(ref(db), "users")).key;

    const updates = {};
    updates["/users/" + newPostKey] = userInfo;

    try {
      await update(ref(db), updates);
      history.push("/users");
    } catch (error) {
      console.log(error);
    }
  }

  // function controlSubmit() {
  //   console.log(dontSendAgain);

  // }

  setTimeout(() => (count = 0), 10000);

  function handleSubmit(e) {
    e.preventDefault();
    count += 1;

    if (count > 1) {
      setSubmitAgain(true);
      setPassword("");

      setTimeout(() => {
        setSubmitAgain(false);
      }, 90000);
    }

    if (validateEmail(email) && strongPassword) {
      saveUser();
    } else {
      setError("Enter a valid email address or a strong password!");
    }
  }

  function handlePassword(e) {
    if (submitAgain) {
      alert("You can not enter password for 90 seconds!");
    }
  }

  function validatePassword() {
    setTimeout(() => {
      const newPassword = password.trim();
      const lowerCaseLetters = /[a-z]/g;
      const upperCaseLetters = /[A-Z]/g;
      const numbers = /[0-9]/g;
      const specialCharacter = /[!@#$%^&*]/g;

      if (!newPassword.match(lowerCaseLetters)) {
        setError("Password should contain atleast 1 lowercase letter!");
      } else if (!newPassword.match(upperCaseLetters)) {
        setError("Password should contain atleast 1 uppercase letter!");
      } else if (!newPassword.match(numbers)) {
        setError("Password should contain atleast 1 number!");
      } else if (!newPassword.match(specialCharacter)) {
        setError("Password should contain atleast 1 special character!");
      } else if (newPassword.length < 8) {
        setError("Password must be 8 characters long!");
      } else {
        setStrongPassword(true);
        console.log(strongPassword);
        setError(false);
        setPassword(newPassword);
      }
    }, 500);
  }

  return (
    <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
      <TextInput
        required
        type="text"
        placeholder="Enter Name"
        icon="person"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <TextInput
        required
        type="text"
        placeholder="Enter Email"
        icon="alternate_email"
        value={email}
        onKeyUp={checkMail}
        onChange={(e) => setEmail(e.target.value)}
      />

      {state && (
        <select
          value={designation}
          onChange={(e) => setDesignation(e.target.value)}
        >
          <option value="">Select</option>
          <option value="lecturer">Lecturer</option>
          <option value="student">Student</option>
        </select>
      )}

      {submitAgain ? (
        <TextInput
          onClick={handlePassword}
          required
          type="password"
          placeholder="Enter Password"
          icon="lock"
          value=""
          onKeyUp={handlePassword}
        />
      ) : (
        <TextInput
          onClick={handlePassword}
          required
          type="password"
          placeholder="Enter Password"
          icon="lock"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyUp={() => validatePassword()}
        />
      )}

      <Button type="submit">
        <span>Submit Now</span>
      </Button>

      {error && !(password === "") && (
        <p
          style={{
            backgroundColor: "#ffc0c7",
            padding: "0.02rem 1.2rem",
            marginTop: "10px",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
          }}
        >
          {error}
        </p>
      )}
    </Form>
  );
}
