import { Route, Routes } from "react-router-dom";
import "./App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <main className="main-content">
        {/* routes ke upar mai woh chiz likhta hu ? jo mujhe sab page pe common chahiye */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes> 
      </main>
    </div>
  );
}

export default App;
