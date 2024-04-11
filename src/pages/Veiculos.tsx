import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingMessage from '../components/LoadingMessage';
import VeiculoTable from '../components/VeiculoTable';
import VeiculoModal from '../components/VeiculoModal';
import Notification from '../components/Notification';


export default function Veiculos() {
    
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

  const handleFinalizarCadastro = (data) => {
    if (data.placa.length != 7) {
      addMessage('A placa deve ter 7 caracteres!', 'alert');
      return;
    }

    if (data.marca.length < 3) {
      addMessage('A marca deve ter pelo menos 3 caracteres!', 'alert');
      return;
    }

    if (data.modelo.length < 3) {
      addMessage('O modelo deve ter pelo menos 3 caracteres', 'alert');
      return;
    }

    if (data.ano_fabricado < 1900) {
      addMessage('O ano não pode ser menor que 1900', 'alert');
      return;
    }

    if (data.consumo < 1) {
      addMessage('O consumo não pode ser 0', 'alert');
      return;
    }

    if (data.valor < 1) {
      addMessage('O valor não pode ser 0', 'alert');
      return;
    }

    if (data.km < 1) {
      addMessage('O KM não pode ser 0', 'alert');
      return;
    }

    let token = Cookies.get('token');
    axios
      .post('http://3.139.69.56:8080/veiculo', data, {headers: {
        Authorization: `Bearer ${token}`,
      }},)
      .then((response) => {
        addMessage('Veículo cadastrado com sucesso!', 'success');
        getVeiculos();
      })
      .catch((error) => {
        addMessage('Veículo já cadastrado no sistema!', 'error');
      });

    // Fechar o modal após finalizar o cadastro
    handleFecharModal();
  };

  useEffect(() => {
    getVeiculos();
  }, [])

  const getVeiculos = () => {
    let token = Cookies.get('token');
    axios
      .get('http://3.139.69.56:8080/veiculo', {
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
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Veículos</h2>
        <div className='absolute top-10 right-4'>
          {messages.map((message, index) => (
            <Notification
              key={index}
              text={message.text}
              type={message.type}
              onRemove={() => removeMessage(index)}
            />
          ))}
        </div>
        <VeiculoTable veiculos={data} onAdicionarVeiculo={handleAbrirModal} />
        <VeiculoModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
      </div>
    </>
  );
}
