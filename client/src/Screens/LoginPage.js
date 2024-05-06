import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    const correctEmail = 'admin@example.com'; // apenas para demonstração
    const correctPassword = '123';

    if (email === correctEmail && password === correctPassword) {
      history.push('/map');
    } else {
      alert('Login failed: Incorrect email or password.');
    }

    console.log('Logging in:', email, password);
  };

  return (
    <section className="container forms">
      <div className="form login">
        <div className="form-content">
          <header>Login</header>
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="email"
                placeholder="Email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field input-field">
              <input
                type="password"
                placeholder="Password"
                className="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className='bx bx-hide eye-icon'></i>
            </div>

            <div className="form-link">
              <a href="#" className="forgot-pass">Esqueci a password</a>
            </div>

            <div className="field button-field">
              <button type="submit">Login</button>
            </div>
          </form>

          <div className="form-link">
            <span>Não tem conta? <a href="/registro" className="link signup-link">Signup</a></span>
          </div>
        </div>

        <div className="line"></div>

        <div className="media-options">
          <a href="#" className="field facebook">
          <img src="https://www.edigitalagency.com.au/wp-content/uploads/facebook-icon-white-png.png" alt="" className="google-img" />
            <span>Registrar com o Facebook</span>
          </a>
        </div>

        <div className="media-options">
          <a href="#" className="field google">
            <img src="https://w7.pngwing.com/pngs/326/85/png-transparent-google-logo-google-text-trademark-logo-thumbnail.png" alt="" className="google-img" />
            <span>Registrar com o Google</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
