// components/Navbar.js
import { FaUsers, FaCar, FaGasPump, FaSignOutAlt, FaPollH } from 'react-icons/fa';
import { Link, useNavigate  } from 'react-router-dom';

import Cookies from 'js-cookie';

const NavigationMenu = () => {

  const navigate = useNavigate();

  function onLogout(){
    Cookies.remove('token');
    navigate('/login');
  }

  return (
    <nav className="bg-gray-800 text-white p-4 flex items-center justify-between">
      {/* Título à esquerda */}
      <h1 className="text-2xl font-semibold">Controle de Frota</h1>

      {/* Itens de navegação à direita */}
      <ul className="flex space-x-4">
        <li>
          <Link to="/users">
            <div className="flex flex-col items-center">
              <FaUsers className="w-5 h-5 mb-1" />
              Usuários
            </div>
          </Link>
        </li>
        <li>
          <Link to="/notas_fiscais">
            <div className="flex flex-col items-center">
              <FaPollH className="w-5 h-5 mb-1" />
              Notas fiscais
            </div>
          </Link>
        </li>
        <li>
          <Link to="/veiculos">
            <div className="flex flex-col items-center">
              <FaCar className="w-5 h-5 mb-1" />
              Veículos
            </div>
          </Link>
        </li>
        <li>
          <Link to="/abastecimentos">
            <div className="flex flex-col items-center">
              <FaGasPump className="w-5 h-5 mb-1" />
              Abastecimentos
            </div>
          </Link>
        </li>

        {/* Botão de Logout */}
        <li>
          <button
            onClick={onLogout}
            className="flex flex-col items-center cursor-pointer"
          >
            <FaSignOutAlt className="w-5 h-5 mb-1" />
            <span className="text-xs">Logout</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationMenu;
