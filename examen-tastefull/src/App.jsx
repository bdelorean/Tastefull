import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Category from "./pages/Category";
import DetailRecipe from "./pages/DetailRecipe";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/category/:categoryName" element={<Category />} />
            <Route path="/recipe/:recipeId" element={<DetailRecipe />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
