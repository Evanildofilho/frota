// components/AbastecimentoFormModal.js
import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const AbastecimentoModal = ({ isOpen, onClose, onFinalizarCadastro }) => {
  const [abastecimentoData, setAbastecimentoData] = useState({
    placa: "",
    litros: 0,
    km: 0,
  });

  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    // Carrega a lista de nomes de veículos da API ao montar o componente
    getVeiculos();
  }, []);

  const getVeiculos = () => {
    // Substitua a URL pela sua API de nomes de veículos
    let token = Cookies.get('token');
    axios
      .get('http://localhost:8080/veiculo',{headers: {
        Authorization: `Bearer ${token}`,
      }},)
      .then((response) => {
        setVeiculos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeForSelect = (e) => {
    const { name, value } = e.target;
    setAbastecimentoData((prevAbastecimentoData) => ({
      ...prevAbastecimentoData,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setAbastecimentoData((prevAbastecimentoData) => ({
      ...prevAbastecimentoData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };
  

  const handleSubmit = () => {
    setAbastecimentoData({placa: "",litros: 0,km: 0,});
    onFinalizarCadastro(abastecimentoData);
  };
  

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Abastecimento</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Selecione um veículo</label>
          <select
            name="placa"
            value={abastecimentoData.placa}
            onChange={handleChangeForSelect}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          >
            <option value="" disabled>
              Selecione um veículo
            </option>
            {veiculos.map((veiculo) => (
              <option key={veiculo.id} value={veiculo.placa}>
                {veiculo.modelo} | {veiculo.placa}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Litros</label>
          <input
            type="number"
            name="litros"
            value={abastecimentoData.litros}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Quilometragem</label>
          <input
            type="number"
            name="km"
            value={abastecimentoData.km}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
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

export default AbastecimentoModal;


