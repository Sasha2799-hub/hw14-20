import LoginPage from "./components/Login Page/Login"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/Products Tabel/ProductsTable'
import Header from "./components/Header";
import PreviewPage from "./components/Preview Page/PreviewPage"

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/products" element={<ProductsTable />} />
        <Route path="/display" element={<PreviewPage />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App