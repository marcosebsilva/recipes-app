import React from 'react';
import Footer from './Footer/Footer';

export default function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" />
      </label>
      <button type="submit" data-testid="login-submit-btn" id="login-button">
        Entrar
      </button>
      <Footer />
    </div>
  );
}
