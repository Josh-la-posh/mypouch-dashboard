import React, { useState, useEffect } from "react";
import InputField from "../../components/ui/input";
import Button from "../../components/ui/button";
import useAuth from "../../services/hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import TextButton from "../../components/ui/textButton";
import Checkbox from "../../components/ui/checkbox";
import AuthService from "../../services/api/authApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPrivate from "../../services/hooks/useAxiosPrivate";

const Login = () => {
  const { setAuth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const authService = new AuthService(axiosPrivate, location);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn, error, loading } = useSelector((state) => state.auth);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() && formData.password) {
      await authService.submitLogin(formData, setAuth, navigate, dispatch);
    } else if (!formData.email) {
      toast(
        'Please enter a valid email address',
        {type:'error'}
      );
    } else {
      toast(
        'Please enter your password',
        {type: 'error'}
      );
    }
  }

  const handleForgotPassword = () => {

  }

  return (
    <div className="bg-primary-light h-screen flex justify-center items-center">
      <div className="bg-primary/[.7] p-8 w-md md:w-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <InputField
            label="Email"
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={formData.email}
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
            <TextButton onClick={handleForgotPassword} variant="primary">
              Forgot Password
            </TextButton>
          </div>
          <Button onClick={loading ? null : handleSubmit} variant="primary">
            {loading ? 'Logging In ...' : 'Login'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
