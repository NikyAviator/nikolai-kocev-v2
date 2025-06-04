import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx';
import ScrollToTopButton from './Components/ui/ScrollToTopButton.jsx';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="relative flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
          <ScrollToTopButton />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
