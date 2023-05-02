import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.tsx";
import List from "./components/List.tsx";
import Details from "./components/Details.tsx";
import Favorites from "./components/Favorites.tsx";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/list/:search" element={<List />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/:id" element={<Details />}></Route>
      </Routes>
    </>
  );
}

export default App;
