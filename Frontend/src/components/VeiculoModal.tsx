// components/VeiculoFormModal.js

import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const VeiculoModal = ({ isOpen, onClose, onFinalizarCadastro }) => {
  const [veiculoData, setVeiculoData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano_fabricado: 0,
    consumo: 0,
    valor: 0,
    km: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setVeiculoData((prevVeiculoData) => ({
      ...prevVeiculoData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    setVeiculoData({placa: '',marca: '',modelo: '',ano_fabricado: 0,consumo: 0,valor: 0,km: 0,});
    onFinalizarCadastro(veiculoData);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Veículo</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Placa</label>
          <input
            type="text"
            name="placa"
            value={veiculoData.placa}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Marca</label>
          <input
            type="text"
            name="marca"
            value={veiculoData.marca}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Modelo</label>
          <input
            type="text"
            name="modelo"
            value={veiculoData.modelo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Ano Fabricado</label>
          <input
            type="number"
            name="ano_fabricado"
            value={veiculoData.ano_fabricado}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Consumo</label>
          <input
            type="number"
            name="consumo"
            value={veiculoData.consumo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Valor</label>
          <input
            type="number"
            name="valor"
            value={veiculoData.valor}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Quilometragem</label>
          <input
            type="number"
            name="km"
            value={veiculoData.km}
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

export default VeiculoModal;
