import React, { useState } from 'react';
import './LoginPage.css'; 

function PasswordResetForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Password reset requested for email:', email);
  };

  return (
    <div className="password-reset-form">
      <h3>Forgot Password?</h3>
      <p>Please enter your email address to reset your password.</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="field">
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default PasswordResetForm;
