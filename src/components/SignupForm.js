import { useState } from "react";
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

  const [dontSendAgain, setDontSendAgain] = useState(false);

  const [error, setError] = useState("Nice job");

  function checkMail() {
    if (email.includes(".edu")) {
      console.log(designation);
      setState(true);
    }
  }

  function controlSubmit () {
    
    console.log(dontSendAgain);
    setDontSendAgain(true);
    

    setTimeout(() => {
      setDontSendAgain(false);
    }, 2000);

  }

  function handleSubmit(e) {
    e.preventDefault();

    

    // const userInfo = {
    //   username,
    //   email,
    //   password,
    //   designation,
    // };

    // localStorage.setItem(email, userInfo);

    localStorage.setItem("name", username);
    localStorage.setItem("email", email);
    localStorage.setItem("designation", designation);
    localStorage.setItem("password", password);

    //console.log(localStorage.getItem(email));
  }

  function validatePassword () {
    
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
        setError(false);
        setPassword(newPassword);
      }
    }, 1000);
  }

  //const [error, setError] = useState();
  //const [loading, setLoading] = useState();

  //   const { signup } = useAuth();
  //   const history = useHistory();

  //   async function handleSubmit(e) {
  //     e.preventDefault();

  //     try {
  //       setError("");
  //       setLoading(true);

  //       await signup(email, password, username);
  //       history.push("/");
  //     } catch (err) {
  //       console.log(err);
  //       setLoading(false);
  //       setError("Failed to create an Account!");
  //     }
  //   }

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
          onChange={(e) => {
            setDesignation(e.target.value);
            console.log(designation);
          }}
        >
          <option value="lecturer">Lecturer</option>
          <option value="student">Student</option>
        </select>
      )}

      {error && <p className="error">{error}</p>}

      <TextInput
        required
        type="password"
        placeholder="Enter Password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyUp={() => validatePassword()}
      />

      <Button type="submit" disabled={dontSendAgain} onClick={controlSubmit}>
        <span>Submit Now</span>
      </Button>
      <button
        onClick={() => {
          console.log(localStorage.getItem("name"));
          console.log(localStorage.getItem("email"));
          console.log(localStorage.getItem("designation"));
          console.log(localStorage.getItem("password"));
        }}
      >
        GET Data
      </button>

      {/* {error && <p className="error">{error}</p>} */}
    </Form>
  );
}
