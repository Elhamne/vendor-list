import './App.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './components/Home';
import Vendors from './components/Vendors';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vendors" element={<Vendors />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
