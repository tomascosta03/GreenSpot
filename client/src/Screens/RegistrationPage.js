import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function RegisterPage() {
  const [userName, setUserName] = useState(''); // Estado para nome
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    history.push('/login');
    console.log('Registrando:', userName, email, password);
  };

  return (
    <section className="container forms">
      <div className="form register">
        <div className="form-content">
          <header>Registo</header>
          <form onSubmit={handleSubmit}>
            <div className="field input-field">
              <input
                type="text"
                placeholder="Nome"
                className="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

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
            </div>

            <div className="field button-field">
              <button type="submit">Registrar</button>
            </div>
          </form>

          <div className="form-link">
            <span>Já tem uma conta? <a href="/login" className="link login-link">Login</a></span>
          </div>
        </div>

        <div className="line"></div>

        
      </div>
    </section>
  );
}

export default RegisterPage;
