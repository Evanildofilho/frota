import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const NotasFiscaisDetails = ({ notaFiscalData }) => {
  const navigate = useNavigate();

  const [notaFiscal, setNotaFiscal] = useState(notaFiscalData);
  const [isDirty, setIsDirty] = useState(false);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    // Convertendo o valor com base no tipo do campo
    const fieldValue = type === 'number' ? parseFloat(value) : value;
  
    setNotaFiscal((prevNotaFiscal) => ({
      ...prevNotaFiscal,
      [name]: fieldValue,
    }));
  
    setIsDirty(true);
  };

  const handleAtualizar = () => {
    const token = Cookies.get('token');
    axios.put(`http://localhost:8080/nota_fiscal`, notaFiscal,{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log('Nota fiscal atualizada com sucesso:', response);
      // Coloque aqui a lógica para tratar o sucesso da exclusão, se necessário
      navigate('/notas_fiscais');
    })
    .catch((error) => {
      console.error('Erro ao atualizar nota fiscal:', error);
      // Coloque aqui a lógica para tratar o erro na exclusão, se necessário
    });

    setIsDirty(false);
  };

  const handleDeletar = () => {
    const token = Cookies.get('token');
    axios.delete(`http://localhost:8080/nota_fiscal/${notaFiscal.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log('Nota fiscal deletada com sucesso:', response);
      // Coloque aqui a lógica para tratar o sucesso da exclusão, se necessário
    })
    .catch((error) => {
      console.error('Erro ao deletar nota fiscal:', error);
      // Coloque aqui a lógica para tratar o erro na exclusão, se necessário
    });

    navigate('/notas_fiscais');
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded p-8 max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="numeroNotaFiscal">
            Número da Nota Fiscal
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="numeroNotaFiscal"
            name="numeroNotaFiscal"
            type="number"
            placeholder="Digite o número da nota fiscal"
            value={notaFiscal.numeroNotaFiscal}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nomeRazaoSocial">
            Nome/Razão Social
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="nomeRazaoSocial"
            name="nomeRazaoSocial"
            type="text"
            placeholder="Digite o nome ou razão social"
            value={notaFiscal.nomeRazaoSocial}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cnpj">
            CNPJ
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cnpj"
            name="cnpj"
            type="number"
            placeholder="Digite o CNPJ"
            value={notaFiscal.cnpj}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataDeEmissao">
            Data de Emissão
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dataDeEmissao"
            name="dataDeEmissao"
            type="date"
            placeholder="Digite a data de emissão"
            value={notaFiscal.dataDeEmissao}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dataDeEntradaSaida">
            Data de Entrada/Saída
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="dataDeEntradaSaida"
            name="dataDeEntradaSaida"
            type="date"
            placeholder="Digite a data de entrada/saída"
            value={notaFiscal.dataDeEntradaSaida}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descricaoProdutoServico">
            Descrição do Produto/Serviço
          </label>
          <textarea
            className="resize-none shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="descricaoProdutoServico"
            name="descricaoProdutoServico"
            placeholder="Digite a descrição do produto/serviço"
            value={notaFiscal.descricaoProdutoServico}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valorNotaFiscal">
            Valor da Nota Fiscal
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="valorNotaFiscal"
            name="valorNotaFiscal"
            type="number"
            placeholder="Digite o valor da nota fiscal"
            value={notaFiscal.valorNotaFiscal}
            onChange={handleChange}
          />
        </div>
        {isDirty && (
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAtualizar}
            >
              Atualizar
            </button>
          </div>
        )}
        <div className="flex items-center justify-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleDeletar}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotasFiscaisDetails;
