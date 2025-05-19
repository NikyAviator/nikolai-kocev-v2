import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/about' element={<AboutmeSection />} />
        </Routes>
      </main>
      <footer>{/* Footer goes here */}</footer>
    </BrowserRouter>
  );
}

export default App;
