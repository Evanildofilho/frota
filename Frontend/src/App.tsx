import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import NotasFiscais from './pages/NotasFiscais'
import Login from './pages/Login'
import Users from './pages/Users'
import Abastecimentos from './pages/Abastecimentos'
import Veiculos from './pages/Veiculos'
import NavigationMenu from './components/NavigationMenu'
import VeiculoEdit from './pages/VeiculoEdit'
import NotasFiscaisEdit from './pages/NotasFiscaisEdit'
import AbastecimentosEdit from './pages/AbastecimentoEdit'
import NotFound from './components/NotFound'


function App() {

  return (
    <>
      <NavigationMenu />
      <Routes>
        <Route path='/' element={<Navigate to="/veiculos" />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path='/abastecimentos' element={<Abastecimentos/>}/>
        <Route path='/abastecimentos/:id' element={<AbastecimentosEdit/>}/>
        <Route path='/veiculos' element={<Veiculos/>}/>
        <Route path='/veiculos/:placa' element={<VeiculoEdit/>}/>
        <Route path='/notas_fiscais' element={<NotasFiscais/>}/>
        <Route path='/nota_fiscal/:id' element={<NotasFiscaisEdit/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
