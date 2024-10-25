// components/UserFormModal.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const UserFormModal = ({ isOpen, onClose, onFinalizarCadastro }) => {
  const [userData, setUserData] = useState({
    login: '',
    password: '',
    role: 'USER',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    setUserData({login: '',password: '',role: 'USER',});
    onFinalizarCadastro(userData);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Usuário</h1>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Username</label>
          <input
            type="text"
            name="login"
            value={userData.login}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Role</label>
          <select
            name="role"
            value={userData.role}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            {/* Adicione outras opções conforme necessário */}
          </select>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
        >
          Finalizar Cadastro
        </button>
      </div>
    </div>
  );
};

export default UserFormModal;
