import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './LoginPage.css';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Aqui você pode adicionar lógica para registrar o usuário
    // Por enquanto, apenas redireciona para a página de login após o registro
    history.push('/login');

    console.log('Registrando:', email, password);
  };

  return (
    <section className="container forms">
      <div className="form register">
        <div className="form-content">
          <header>Registro</header>
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

export default RegisterPage;
