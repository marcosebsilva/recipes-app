import React from 'react';

export default function Login() {
  return (
    <div>
      <label htmlFor="email-input">
        <input type="email" data-testid="email-input" />
      </label>
      <label htmlFor="password-input">
        <input type="password" data-testid="password-input" />
      </label>
      {/* <label htmlFor="login-btn">
        <button type="submit" data-testid="login-submit-btn" id="login-btn">
          Entrar
        </button> */}
      {/* </label> */}
      {/* <label htmlFor="login-button"> */}
      <button type="submit" data-testid="login-submit-btn" id="login-button">
        Entrar
      </button>
      {/* </label> */}
    </div>
  );
}
