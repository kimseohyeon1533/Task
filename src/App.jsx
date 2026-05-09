import { BrowserRouter, Routes, Route } from "react-router-dom";
import RootLayout from "./layout/RootLayout.jsx";
import Main from "./pages/Main/Main.jsx";
import ItemDetail from "./pages/ItemDetail/ItemDetail.jsx";
import ProductFormPage from "./pages/ProductForm/ProductFormPage.jsx";
import DeleteProductPage from "./pages/DeleteProduct/DeleteProductPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/add" element={<ProductFormPage mode="add" />} />
          <Route path="/edit/:id" element={<ProductFormPage mode="edit" />} />
          <Route path="/delete/:id" element={<DeleteProductPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
