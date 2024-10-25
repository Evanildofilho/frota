import { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const NotasFiscaisModal = ({ isOpen, onClose, onFinalizarCadastro }) => {
  const [notaFiscalData, setNotaFiscalData] = useState({
    numeroNotaFiscal: 0,
    nomeRazaoSocial: '',
    cnpj: 0,
    dataDeEmissao: '',
    dataDeEntradaSaida: '',
    descricaoProdutoServico: '',
    valorNotaFiscal: 0
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setNotaFiscalData((prevNotaFiscalData) => ({
      ...prevNotaFiscalData,
      [name]: type === 'number' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = () => {
    setNotaFiscalData({
      numeroNotaFiscal: 0,
      nomeRazaoSocial: '',
      cnpj: 0,
      dataDeEmissao: '',
      dataDeEntradaSaida: '',
      descricaoProdutoServico: '',
      valorNotaFiscal: 0
    });

    onFinalizarCadastro(notaFiscalData);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? 'visible' : 'invisible'}`}>
      <div className="bg-white p-8 rounded-md shadow-md w-96">
        <div className="flex justify-end">
          <button onClick={onClose} className="text-gray-500">
            <FaTimes />
          </button>
        </div>
        <h1 className="text-2xl font-semibold mb-4">Cadastro de Nota Fiscal</h1>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Número da Nota Fiscal</label>
          <input
            type="number"
            name="numeroNotaFiscal"
            value={notaFiscalData.numeroNotaFiscal}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Nome/Razão Social</label>
          <input
            type="text"
            name="nomeRazaoSocial"
            value={notaFiscalData.nomeRazaoSocial}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">CNPJ</label>
          <input
            type="number"
            name="cnpj"
            value={notaFiscalData.cnpj}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Data de Emissão</label>
          <input
            type="date" 
            name="dataDeEmissao"
            value={notaFiscalData.dataDeEmissao}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Data de Entrada/Saída</label>
          <input
            type="date" 
            name="dataDeEntradaSaida"
            value={notaFiscalData.dataDeEntradaSaida}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Descrição do Produto/Serviço</label>
          <input
            type="text"
            name="descricaoProdutoServico"
            value={notaFiscalData.descricaoProdutoServico}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Valor da Nota Fiscal</label>
          <input
            type="number"
            name="valorNotaFiscal"
            value={notaFiscalData.valorNotaFiscal}
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

export default NotasFiscaisModal;
