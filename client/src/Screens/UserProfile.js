import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './UserInfo.css';
import axios from 'axios';

function UserInfo() {
  const history = useHistory();
  const [name, setName] = useState('John Doe');
  const [email] = useState('johndoe@example.com'); // Email não será editável
  const [avatar, setAvatar] = useState(null);
  const [description, setDescription] = useState('');

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/users/update', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Usuário atualizado:', response.data);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
    }
  };

  return (
    <div className="user-info-container">
      <h1>Informações do Utilizador</h1>
      <form onSubmit={handleSubmit} className="user-info-form">
        <div className="form-group">
          <label htmlFor="name">Nome:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descrição:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Atualizar</button>
        <button type="button" onClick={() => history.push('/profile')}>Voltar</button>
      </form>
    </div>
  );
}

export default UserInfo;
