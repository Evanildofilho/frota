import { FaPen, FaPlus } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NotasFiscaisTable = ({ notasFiscais, onAdicionarNotaFiscal }) => {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-4">
        <button
          onClick={onAdicionarNotaFiscal}
          className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
        >
          <FaPlus className="w-4 h-4 mr-2" />
          Adicionar Nota Fiscal
        </button>
      </div>
      <table className="min-w-full border border-gray-300 divide-y divide-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 font-semibold text-left">Ações</th>
            <th className="py-2 px-4 font-semibold text-left">Número da Nota Fiscal</th>
            <th className="py-2 px-4 font-semibold text-left">Nome/Razão Social</th>
            <th className="py-2 px-4 font-semibold text-left">CNPJ</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Emissão</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Entrada/Saída</th>
            <th className="py-2 px-4 font-semibold text-left">Descrição do Produto/Serviço</th>
            <th className="py-2 px-4 font-semibold text-left">Valor da Nota Fiscal</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Criação</th>
            <th className="py-2 px-4 font-semibold text-left">Data de Atualização</th>
          </tr>
        </thead>
        <tbody>
          {notasFiscais.map((notaFiscal) => (
            <tr key={notaFiscal.id} className="hover:bg-gray-50">
              <td className="py-2 px-4"><Link to={`/nota_fiscal/${notaFiscal.numeroNotaFiscal}`}><FaPen/></Link></td>
              <td className="py-2 px-4">{notaFiscal.numeroNotaFiscal}</td>
              <td className="py-2 px-4">{notaFiscal.nomeRazaoSocial}</td>
              <td className="py-2 px-4">{notaFiscal.cnpj}</td>
              <td className="py-2 px-4">{notaFiscal.dataDeEmissao}</td>
              <td className="py-2 px-4">{notaFiscal.dataDeEntradaSaida}</td>
              <td className="py-2 px-4"><Link to={`/nota_fiscal/${notaFiscal.numeroNotaFiscal}`}>Clique para editar!</Link></td>
              <td className="py-2 px-4">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(notaFiscal.valorNotaFiscal)}</td>
              <td className="py-2 px-4">{notaFiscal.created_at}</td>
              <td className="py-2 px-4">{notaFiscal.updated_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default NotasFiscaisTable;
