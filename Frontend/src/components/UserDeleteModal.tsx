// components/UserFormModal.js
import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const UserFormModal = ({ isOpen, onClose }) => {

  const handleSubmit = () => {
    alert('foi');
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
          <label className="block text-sm font-medium text-gray-600">Deseja realmente EXCLUIR este usuário?</label>
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
