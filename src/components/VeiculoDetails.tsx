import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const VeiculoDetails = ({ veiculoData, addMessage }) => {
    const navigate = useNavigate();

    const [veiculo, setVeiculo] = useState(veiculoData);
    const [isDirty, setIsDirty] = useState(false);
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
  
      // Convertendo o valor com base no tipo do campo
      const fieldValue = type === 'number' ? parseFloat(value) : value;
    
      setVeiculo((prevVeiculo) => ({
        ...prevVeiculo,
        [name]: fieldValue,
      }));
    
      setIsDirty(true);
    };
  
    const handleAtualizar = () => {
      const token = Cookies.get('token');
      axios.put(`http://localhost:8080/veiculo`, veiculo,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Veiculo atualizada com sucesso:', response);
        // Coloque aqui a lógica para tratar o sucesso da exclusão, se necessário
        navigate('/veiculos');
      })
      .catch((error) => {
        console.error('Erro ao atualizar veiculo:', error);
        // Coloque aqui a lógica para tratar o erro na exclusão, se necessário
      });
  
      setIsDirty(false);
    };

    const handleDeletar = () => {
      const token = Cookies.get('token');
      axios.delete(`http://localhost:8080/veiculo/${veiculo.placa}`, {headers: {
        Authorization: `Bearer ${token}`,
      }},).then(() => {
        navigate('/veiculos');

      }).catch(() => {
        addMessage("Exclua todos os abastecimentos que dependem desse veículo antes!", "alert")
      })
      //Lembrar de colocar um then pra vê se deu certo a requisição

    };
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-md rounded p-8 max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="placa">
              Placa
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="placa"
              name="placa"
              type="text"
              placeholder="Digite a placa"
              disabled
              value={veiculo.placa}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
              Marca
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="marca"
              name="marca"
              type="text"
              placeholder="Digite a marca"
              value={veiculo.marca}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="km">
              Quilometragem
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="km"
              name="km"
              type="number"
              placeholder="Digite a quilometragem"
              value={veiculo.km}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ano_fabricado">
              Ano Fabricado
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="ano_fabricado"
              name="ano_fabricado"
              type="number"
              placeholder="Digite o ano fabricado"
              value={veiculo.ano_fabricado}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="consumo">
              Consumo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="consumo"
              name="consumo"
              type="number"
              placeholder="Digite o consumo"
              value={veiculo.consumo}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="valor">
              Valor
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="valor"
              name="valor"
              type="number"
              placeholder="Digite o valor"
              value={veiculo.valor}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="modelo">
              Modelo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="modelo"
              name="modelo"
              type="text"
              placeholder="Digite o modelo"
              value={veiculo.modelo}
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

  export default VeiculoDetails;