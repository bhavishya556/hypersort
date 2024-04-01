import './App.css';
import Singup from './pages/auth/Singup';
import Singin from './pages/auth/Singin';
import Home from './pages/Home';
import { Route ,Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Routes >
      <Route path='/' element={ <Singup/>}></Route>
      <Route path='/singin' element={   <Singin/>}></Route>
      <Route path='/home' element={   <Home/>}></Route>
     
    
      
      
    </Routes>
  );
}

export default App;
