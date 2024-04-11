import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import LoadingMessage from "../components/LoadingMessage";
import Notification from "../components/Notification";
import AbastecimentoTable from "../components/AbastecimentoTable";
import AbastecimentoModal from "../components/AbastecimentoModal";

function Abastecimentos(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [messages, setMessages] = useState([]);
  
    const addMessage = (text, type) => {
      setMessages([...messages, { text, type }]);
    };
  
    const removeMessage = (index) => {
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
    };
  
    const handleAbrirModal = () => {
      setModalAberto(true);
    };
  
    const handleFecharModal = () => {
      setModalAberto(false);
    };
  
    const onDeleteAbastecimento = (abastecimentosId) => {
      let token = Cookies.get('token');
      axios
        .delete(`http://3.139.69.56:8080/abastecimento/${abastecimentosId}`, {headers: {
          Authorization: `Bearer ${token}`,
        }},)
        .then((response) => {
          getAbastecimentos();
          addMessage('Abasecimento deletado com sucesso!', 'success');
        })
        .catch((error) => {
          addMessage('Abastecimento não encontrado!', 'error');
        })
    }
  
    const handleFinalizarCadastro = (data) => {

      console.log(data);
  
      if (data.placa.length != 7) {
        addMessage('A placa deve possuir 7 caracteres!', 'alert');
        return;
      }
  
      if (data.litros < 1) {
        addMessage('Os litros tem que maior que 0', 'alert');
        console.log(data.placa)
        return;
      }
  
      if (data.km < 1) {
        addMessage('O KM tem que ser maior que 0', 'alert');
        return;
      }
  
      let token = Cookies.get('token');
      axios
        .post('http://3.139.69.56:8080/abastecimento', data, {headers: {
          Authorization: `Bearer ${token}`,
        }},)
        .then((response) => {
          getAbastecimentos();
          addMessage('Abastecimento cadastrado com sucesso!', 'success');
        })
        .catch((error) => {
          console.log(error);
          addMessage('Veículo não encontrado!', 'error');
        });
  
        setModalAberto(false);
    }
  
    useEffect(() => {
      getAbastecimentos();
    }, []);
  
    function getAbastecimentos() {
      let token = Cookies.get('token');
      axios
        .get('http://3.139.69.56:8080/abastecimento', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          navigate('/login')
        });
    }
  
    if (isLoading) {
      return <LoadingMessage />;
    }
  
    return (
      <>
        <div className="bg-gray-100 min-h-screen p-8">
        <div className='absolute top-12 right-4'>
            {messages.map((message, index) => (
              <Notification
                key={index}
                text={message.text}
                type={message.type}
                onRemove={() => removeMessage(index)}
              />
            ))}
        </div>
          <h2 className="text-2xl font-semibold mb-4">Lista de Abastecimentos</h2>
          <AbastecimentoTable abastecimentos={data} onAdicionarAbastecimento={handleAbrirModal} onDeleteAbastecimento={onDeleteAbastecimento}/>
          <AbastecimentoModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
        </div>
      </>
    );
}

export default Abastecimentos