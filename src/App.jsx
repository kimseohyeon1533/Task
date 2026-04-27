import {BrowserRouter, Routes, Route} from "react-router-dom";
import RootLayout from "../src/layout/RootLayout.jsx";
import Main from "../src/pages/Main/Main.jsx";
import ItemDetail from "../src/pages/ItemDetail/ItemDetail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/item:id" element={<ItemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;