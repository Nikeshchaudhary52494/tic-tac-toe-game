import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import PlayArea from "./components/PlayArea";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/playarea" element={<PlayArea />} />
    </Routes>
  );
}

export default App;
