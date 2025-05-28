import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className='min-h-screen flex flex-col'>
        <Header />

        <main className='flex-grow'>
          <Routes>
            <Route path='/' element={<HomePage />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
