import Header from './components/ui/Header';
import './styles.css';

function App() {
  return (
    <>
      {/* <BrowserRouter>
        <header>
          <Header />
        </header>
        <main>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/randomcolor' element={<RandomColor />} />
            <Route path='/imageslider' element={<Images />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </BrowserRouter> */}
      <header>
        <Header />
      </header>
      <main>
        {/* <Routes>  
        </Routes> */}
      </main>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
}

export default App;
