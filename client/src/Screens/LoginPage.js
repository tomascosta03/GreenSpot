import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from '../assets/logo.png';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      console.log('Enviando dados de login:', { email, password });
      const response = await axios.post('http://localhost:8000/api/users/login', {
        email,
        password,
      });
      console.log('Resposta do servidor:', response);
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/profile');
      } else {
        setError('Failed to login. Please try again.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error);
      setError('Failed to login. Please try again.');
    }
  };



  return (
    <section className="container">
      <div className="form">
        <img src={logo} alt="Logo" className="logo" />
        <div className="form-content">
          <header className="header">Bem-vindo de volta!</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="email"
                placeholder="Introduza o email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Introduza a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="button-field">
              <button type="submit">Login</button>
            </div>
          </form>
          <div className="form-link">
            <span>Não tem conta? <a href="/registo">Registar</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
