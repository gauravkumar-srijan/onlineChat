
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './component/pages/home';
import Chat from './component/pages/chat';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;
