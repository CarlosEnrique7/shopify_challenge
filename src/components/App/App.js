import Home from "../Home/Home";
import Liked from "../Liked/Liked";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/liked" element={<Liked />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
