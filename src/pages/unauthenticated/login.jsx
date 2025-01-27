import React, { useState, useEffect } from "react";
import InputField from "../../components/input";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      setAuth({accessToken: name});
      navigate('/');
      console.log(auth?.accessToken)
    } else {
      alert("Please enter a valid name.");
    }
  };
  
  useEffect(() => {
    setAuth({});
  }, [setAuth])

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Login Page</h1>
      <InputField
        label="Your Name"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Button onClick={handleSubmit} variant="primary">
        Submit
      </Button>
    </div>
  );
};

export default Login;
