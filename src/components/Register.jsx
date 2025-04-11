import React, { useState, useEffect } from "react";
import "../styles/Register.css";
import { Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Register() {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    dob: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
    countryCode: "+44",
    flag: "🇬🇧",
  });

  const [formErrors, setFormErrors] = useState({});
  const [passwordMatchError, setPasswordMatchError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length > 0) {
      const timer = setTimeout(() => {
        setFormErrors({});
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [formErrors]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updatedValue = type === "checkbox" ? checked : value;

    setFormData((prev) => {
      const updatedForm = { ...prev, [name]: updatedValue };

      if (
        (name === "password" || name === "confirmPassword") &&
        updatedForm.password &&
        updatedForm.confirmPassword
      ) {
        setPasswordMatchError(
          updatedForm.password === updatedForm.confirmPassword ? "" : "Passwords do not match."
        );
      }

      return updatedForm;
    });
  };

  const handleCountryChange = (e) => {
    const selected = e.target.value;
    const data = {
      "🇬🇧": "+44",
      "🇫🇷": "+33",
    };
    setFormData((prev) => ({
      ...prev,
      flag: selected,
      countryCode: data[selected],
      mobile: "",
    }));
  };

  const validateForm = () => {
    const errors = {};
    const { email, fullName, dob, mobile, password, confirmPassword, acceptedTerms } = formData;

    if (!email) errors.email = "Email is required.";
    if (!fullName) errors.fullName = "Full name is required.";

    const dobRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d\d$/;
    if (!dob || !dobRegex.test(dob)) {
      errors.dob = "Enter a valid date: DD/MM/YYYY";
    }

    if (!mobile || !/^\d{10}$/.test(mobile)) {
      errors.mobile = "Enter a valid 10-digit mobile number.";
    }

    if (!password) errors.password = "Password is required.";
    if (!confirmPassword) errors.confirmPassword = "Please confirm your password.";

    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordMatchError("Passwords do not match.");
    } else {
      setPasswordMatchError("");
    }

    if (!acceptedTerms) errors.acceptedTerms = "You must accept the terms.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0 && !passwordMatchError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      if (!validateForm()) return;

      alert("Registration successful");
      setFormData({
        email: "",
        fullName: "",
        dob: "",
        mobile: "",
        password: "",
        confirmPassword: "",
        acceptedTerms: false,
        countryCode: "+44",
        flag: "🇬🇧",
      });
      setFormErrors({});
      setPasswordMatchError("");
    }, 10);
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Make an account</h1>
      <p className="register-sub">Sign up to experience exquisite dining today</p>

      <form className="register-form" onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        {formErrors.email && <p className="error">{formErrors.email}</p>}

        <label>Full name</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} />
        {formErrors.fullName && <p className="error">{formErrors.fullName}</p>}

        <label>Date of birth</label>
        <input
          type="text"
          name="dob"
          value={formData.dob}
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, "");
            if (val.length > 8) val = val.slice(0, 8);
            let formatted = "";
            if (val.length > 0) formatted += val.slice(0, 2);
            if (val.length > 2) formatted += "/" + val.slice(2, 4);
            if (val.length > 4) formatted += "/" + val.slice(4, 8);
            setFormData((prev) => ({ ...prev, dob: formatted }));
          }}
          maxLength={10}
        />
        {formErrors.dob && <p className="error">{formErrors.dob}</p>}

        <label>Mobile number</label>
        <div className="mobile-input">
          <select className="flag-select" value={formData.flag} onChange={handleCountryChange}>
            <option value="🇬🇧">🇬🇧</option>
            <option value="🇫🇷">🇫🇷</option>
          </select>
          <span className="country-code">{formData.countryCode}</span>
          <input
            type="tel"
            name="mobile"
            className="mobile-inner"
            maxLength="10"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        {formErrors.mobile && <p className="error">{formErrors.mobile}</p>}

        <label>Set password</label>
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Set your password"
            value={formData.password}
            onChange={handleChange}
          />
          <span className="eye-icon" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {formErrors.password && <p className="error">{formErrors.password}</p>}

        <label>Confirm password</label>
        <div className="password-wrapper">
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <span className="eye-icon" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </span>
        </div>
        {(formErrors.confirmPassword || passwordMatchError) && (
          <p className="error">{formErrors.confirmPassword || passwordMatchError}</p>
        )}

        <div className="checkbox-wrapper">
          <input
            type="checkbox"
            id="terms"
            name="acceptedTerms"
            checked={formData.acceptedTerms}
            onChange={handleChange}
          />
          <label htmlFor="terms" className="checkbox-label">
            I have read, fully understand, and accept the
            <a href="#" className="terms">terms of service</a>
          </label>
        </div>
        {formErrors.acceptedTerms && <p className="error">{formErrors.acceptedTerms}</p>}

        <button type="submit" className="register-btn">Sign Up</button>

        <p className="register-footer">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
