import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AbastecimentoDetails = ({ abastecimentoData}) => {
    const navigate = useNavigate();

    const [abastecimento, setAbastecimento] = useState(abastecimentoData);
    const [isDirty, setIsDirty] = useState(false);
  
    const handleChange = (e) => {
      const { name, value, type } = e.target;
  
      // Convertendo o valor com base no tipo do campo
      const fieldValue = type === 'number' ? parseFloat(value) : value;
    
      setAbastecimento((prevAbastecimento) => ({
        ...prevAbastecimento,
        [name]: fieldValue,
      }));
    
      setIsDirty(true);
    };
  
    const handleAtualizar = () => {
      const token = Cookies.get('token');
      axios.put(`http://3.139.69.56:8080/abastecimento`, abastecimento,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Veiculo atualizada com sucesso:', response);
        // Coloque aqui a lógica para tratar o sucesso da exclusão, se necessário
        navigate('/abastecimentos');
      })
      .catch((error) => {
        console.error('Erro ao atualizar abastecimento:', error);
        // Coloque aqui a lógica para tratar o erro na exclusão, se necessário
      });
  
      setIsDirty(false);
    };

    const handleDeletar = () => {
      const token = Cookies.get('token');
      axios.delete(`http://3.139.69.56:8080/abastecimento/${abastecimento.placa}`, {headers: {
        Authorization: `Bearer ${token}`,
      }},).then(() => {
        navigate('/abastecimentos');

      }).catch(() => {

    })
      //Lembrar de colocar um then pra vê se deu certo a requisição

    };
  
    return (
      <div className="min-h-screen flex items-center justify-center">
        {abastecimento.veiculo}
      </div>
    );
  };

  export default AbastecimentoDetails;