import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';
import { PhotoPage } from './components/PhotoPage';
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Main />}></Route>
            <Route path="/:id" element={<PhotoPage />}></Route>
          </Routes>
        </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
