"use client";
import React from "react";

const InputField = ({ label, type, placeholder }) => {
  return (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <div className="input-wrapper">
        <input type={type} placeholder={placeholder} className="input-field" />
      </div>
      <style jsx>{`
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 24px;
        }
        .input-label {
          color:rgb(0, 0, 0);
          font-size: 18px;
        }
        .input-wrapper {
          width: 100%;
        }
        .input-field {
          width: 100%;
          padding: 20px;
          border: 1px solid #b3b3b3;
          border-radius: 8px;
          font-size: 18px;
          color: #667085;
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
};

export default InputField;
