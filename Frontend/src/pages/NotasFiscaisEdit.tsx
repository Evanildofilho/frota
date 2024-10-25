import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import LoadingMessage from "../components/LoadingMessage";
import NotasFiscaisDetails from "../components/NotaFiscalDetails";

function NotasFiscaisEdit() {

    const navigate = useNavigate();

    const { id } = useParams();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      getNotaFiscal();
    }, []);

    const getNotaFiscal = () => {
      let token = Cookies.get('token');
      axios
        .get(`http://localhost:8080/nota_fiscal/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setData(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          // navigate('/login');
        });
    };

    if (isLoading) {
      return <LoadingMessage />;
    }

    return (
      <div>
        <NotasFiscaisDetails notaFiscalData={data}/>
      </div>
    );
}

export default NotasFiscaisEdit;
