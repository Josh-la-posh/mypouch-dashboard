import React, { useState, useEffect } from "react";
import InputField from "../../components/input";
import Button from "../../components/button";
import useAuth from "../../services/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import TextButton from "../../components/textButton";
import Checkbox from "../../components/checkbox";

const Login = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (formData.username.trim()) {
      setAuth({accessToken: formData.username});
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
    <div className="bg-primary-light h-screen flex justify-center items-center">
      <div className="bg-primary/[.7] p-8 w-md md:w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h1>
        <InputField
          label="Username"
          id="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          textColor='text-white'
        />
        <InputField
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          required
          textColor='text-white'
        />
        <div className="flex justify-between mb-8">
          <Checkbox 
            label="Remember me?"
            id="rememberMe"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <TextButton onClick={handleSubmit} variant="primary">
            Forgot Password
          </TextButton>
        </div>
        <Button onClick={handleSubmit} variant="primary">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
