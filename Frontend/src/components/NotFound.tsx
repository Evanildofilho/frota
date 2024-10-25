import { Link } from 'react-router-dom'; // Se estiver usando react-router-dom

const NotFound = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="text-center p-8 bg-white shadow-md rounded-md">
        <h1 className="text-4xl font-bold mb-4 text-red-500">Você não possui permissão para acessar essa função!</h1>
        <Link to="/veiculos" className="inline-block px-6 py-2 text-white bg-blue-500 rounded hover:bg-blue-700 transition duration-300">Voltar</Link>
      </div>
    </div>
  );
};

export default NotFound;