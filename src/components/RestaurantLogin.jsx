"use client";
import React from "react";
import ImageGrid from "./ImageGrid";
import LoginForm from "./LoginForm";

const RestaurantLogin = () => {
  return (
    <main className="restaurant-login">
      <h1 className="hero-heading">
        Join us for an exquisite dining experience and reserve your spot at
        Ormer Mayfair
      </h1>

      <ImageGrid />
      <LoginForm />

      <style jsx>{`
        .restaurant-login {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 60px 20px;
          font-family: "Inter", sans-serif;
          max-width: 1440px;
          margin: 0 auto;
        }
        .hero-heading {
          color:rgb(255, 0, 0);
          font-size: 64px;
          font-weight: 700;
          text-align: center;
          max-width: 1382px;
          margin: 0 0 60px 0;
        }
        @media (max-width: 991px) {
          .hero-heading {
            font-size: 48px;
            margin-bottom: 40px;
          }
        }
        @media (max-width: 640px) {
          .hero-heading {
            font-size: 32px;
            margin-bottom: 30px;
          }
        }
      `}</style>
    </main>
  );
};

export default RestaurantLogin;
