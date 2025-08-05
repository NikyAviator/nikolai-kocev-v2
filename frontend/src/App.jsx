import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './Components/Header.jsx';
import HomePage from './Pages/HomePage.jsx';
import Footer from './Components/Footer.jsx';
import ScrollToTopButton from './Components/ui/ScrollToTopButton.jsx';
// import AuthPage from './Pages/AuthPage.jsx';
import SignUp from './Pages/SignUp.jsx';
import SignIn from './Pages/SignIn.jsx';
import BlogChoice from './Pages/BlogChoice.jsx';

import './styles.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
        <Header />

        <main className="relative flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/login" element={<AuthPage mode="signin" />} />
            <Route path="/signup" element={<AuthPage mode="signup" />} /> */}
            <Route path="/blog-choice" element={<BlogChoice />} />
            {/* Auth routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
          <ScrollToTopButton />
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
