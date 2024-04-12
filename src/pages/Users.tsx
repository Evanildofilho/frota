import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import LoadingMessage from "../components/LoadingMessage";
import Notification from "../components/Notification";
import UserTable from "../components/UserTable";
import UserFormModal from "../components/UserFormModal";

function Users(){
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [modalAberto, setModalAberto] = useState(false);
    const [messages, setMessages] = useState([]);
  
    const handleAbrirModal = () => {
      setModalAberto(true);
    };
  
    const handleFecharModal = () => {
      setModalAberto(false);
    };
  
    const addMessage = (text, type) => {
      setMessages([...messages, { text, type }]);
    };
  
    const removeMessage = (index) => {
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
    };
  
    const handleDeletarUser = (userId) => {
      let token = Cookies.get('token');
      axios
        .delete(`http://localhost:8080/user/deletar/${userId}`, {headers: {
          Authorization: `Bearer ${token}`,
        }})
        .then((response) => {
          getUsers();
          addMessage('Usuário deletado com sucesso!', 'success');
        })
        .catch((error) => {
          addMessage('Usuário não encontrado!', 'error');
        });
    }
  
    const handleFinalizarCadastro = (data) => {
      if (data.login.length < 3) {
        addMessage('O nome de usuário deve ter pelo menos 3 caracteres.', 'alert');
        return;
      }
  
      if (data.password.length < 3) {
        addMessage('A senha dev ter pelo menos 3 caracteres.', 'alert');
        return;
      }
  
      let token = Cookies.get('token');
      axios
        .post('http://localhost:8080/auth/register', data, {headers: {
          Authorization: `Bearer ${token}`,
        }},)
        .then((response) => {
          getUsers();
          addMessage('Usuário cadastrado com sucesso!', 'success');
        })
        .catch((error) => {
          addMessage('Usuário já cadastrado no sistema!', 'error');
        });
      setModalAberto(false);
    };
  
    useEffect(() => {
      getUsers();
    }, []);
  
    function getUsers() {
      let token = Cookies.get('token');
      axios
        .get('http://localhost:8080/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          navigate("/**")
        });
    }
    
    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <>
        <div className="bg-gray-100 min-h-screen p-8">
          <h2 className="text-2xl font-semibold mb-4">Lista de Usuários</h2>
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
          <UserTable users={data} onAdicionarVeiculo={handleAbrirModal} onDeleteUser={handleDeletarUser}/>
  
          {/* Renderize o modal */}
          <UserFormModal isOpen={modalAberto} onClose={handleFecharModal} onFinalizarCadastro={handleFinalizarCadastro} />
        </div>
      </>
    );
  
}

export default Users