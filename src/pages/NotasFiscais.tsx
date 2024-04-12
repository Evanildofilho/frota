import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import LoadingMessage from '../components/LoadingMessage';
import NotasFiscaisTable from '../components/NotasFiscaisTable';
import NotasFiscaisModal from '../components/NotasFiscaisModal';
import Notification from '../components/Notification';

function NotasFiscais() {
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
    // Adapte as validações conforme necessário para os campos de Notas Fiscais
    // ...

    let token = Cookies.get('token');
    axios
      .post('http://localhost:8080/nota_fiscal', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        addMessage('Nota Fiscal cadastrada com sucesso!', 'success');
        getNotasFiscais();
      })
      .catch((error) => {
        addMessage('Erro ao cadastrar Nota Fiscal. Verifique os dados e tente novamente.', 'error');
      });

    // Fechar o modal após finalizar o cadastro
    handleFecharModal();
  };

  useEffect(() => {
    getNotasFiscais();
  }, []);

  const getNotasFiscais = () => {
    let token = Cookies.get('token');
    axios
      .get('http://localhost:8080/nota_fiscal', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        navigate('/login');
      });
  };

  if (isLoading) {
    return <LoadingMessage />;
  }

  return (
    <>
      <div className="bg-gray-100 min-h-screen p-8">
        <h2 className="text-2xl font-semibold mb-4">Lista de Notas Fiscais</h2>
        <div className="absolute top-10 right-4">
          {messages.map((message, index) => (
            <Notification
              key={index}
              text={message.text}
              type={message.type}
              onRemove={() => removeMessage(index)}
            />
          ))}
        </div>
        <NotasFiscaisTable notasFiscais={data} onAdicionarNotaFiscal={handleAbrirModal} />
        <NotasFiscaisModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
      </div>
    </>
  );
}

export default NotasFiscais