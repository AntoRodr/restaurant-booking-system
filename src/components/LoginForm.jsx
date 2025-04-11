"use client";
import React from "react";
import InputField from "./InputField";

const LoginForm = () => {
  return (
    <form className="login-form">
      <InputField label="Email" type="email" placeholder="Enter your email" />
      <InputField
        label="Password"
        type="password"
        placeholder="Enter your password"
      />

      <div className="remember-forgot">
        <div className="remember">
          <input type="checkbox" id="remember" className="remember-checkbox" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <button type="button" className="forgot-link">
          Forgot password?
        </button>
      </div>

      <button type="submit" className="login-button">
        Login
      </button>

      <p className="register-prompt">
        Don't have an account?
        <button type="button" className="register-link">
          Register
        </button>
      </p>

      <style jsx>{`
        .login-form {
          width: 570px;
        }
        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 44px;
        }
        .remember {
          display: flex;
          align-items: center;
          gap: 8px;
          color:rgb(5, 3, 3);
          font-size: 18px;
        }
        .remember-checkbox {
          width: 24px;
          height: 24px;
          border: 1.5px solid #32a4a8;
          border-radius: 4px;
          margin: 0;
        }
        .forgot-link {
          color: #32a4a8;
          font-size: 16px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }
        .login-button {
          width: 100%;
          padding: 20px 10px;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 44px;
          background-color: #32a4a8;
        }
        .register-prompt {
          text-align: center;
          color:rgb(0, 0, 0);
          font-size: 18px;
          margin: 0;
        }
        .register-link {
          color: #32a4a8;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
          margin-left: 5px;
          font-size: 18px;
        }
        @media (max-width: 991px) {
          .login-form {
            width: 100%;
            max-width: 570px;
          }
        }
        @media (max-width: 640px) {
          .remember-forgot {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }
          .login-button {
            margin-bottom: 30px;
          }
        }
      `}</style>
    </form>
  );
};

export default LoginForm;
