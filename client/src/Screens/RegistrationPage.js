import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import logo from '../assets/logo.png';

function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match!');
      return;
    }

    try {
      console.log('Enviando dados para registo:', { name, email, contact, password });
      const response = await axios.post('http://localhost:8000/api/users/register', {
        name,
        email,
        contact,
        password,
        isAdmin: false, // Ajuste conforme necessário
      });
      console.log('Resposta do servidor:', response);
      if (response.status === 201) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        history.push('/profile');
      } else {
        setError('Failed to register. Please try again.');
      }
    } catch (error) {
      console.error('Erro ao registar:', error.response ? error.response.data : error);
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <section className="container">
      <div className="form">
        <img src={logo} alt="Logo" className="logo" />
        <div className="form-content">
          <header className="header">Seja bem-vindo! Registe-se</header>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="text"
                placeholder="Contact"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <input
                type="password"
                placeholder="Confirmar password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            {error && <p className="error">{error}</p>}
            <div className="button-field">
              <button type="submit">Registar</button>
            </div>
          </form>
          <div className="form-link">
            <span>Já tens conta? <a href="/login">Login</a></span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;
