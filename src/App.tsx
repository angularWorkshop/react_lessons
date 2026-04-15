import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Catalog } from './pages/catalog';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="app__header">
          <h1>Product Catalog</h1>
        </header>
        <Routes>
          <Route path="/" element={<Catalog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
