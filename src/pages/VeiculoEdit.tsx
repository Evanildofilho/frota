import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import LoadingMessage from "../components/LoadingMessage";
import VeiculoDetails from "../components/VeiculoDetails";
import Notification from "../components/Notification";

function VeiculoEdit(){

    const navigate = useNavigate();

    const { placa } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [messages, setMessages] = useState([]);
  
    const addMessage = (text, type) => {
      setMessages([...messages, { text, type }]);
    };
  
    const removeMessage = (index) => {
      const updatedMessages = [...messages];
      updatedMessages.splice(index, 1);
      setMessages(updatedMessages);
    };
    useEffect(() => (
      getVeiculo()
    ), [])

    const getVeiculo = () => {
      let token = Cookies.get('token');
      axios
        .get(`http://localhost:8080/veiculo/${placa}`, {
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
      
      <div>
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
        <VeiculoDetails veiculoData={data} addMessage={addMessage}/>
      </div>
    );
}

export default VeiculoEdit;