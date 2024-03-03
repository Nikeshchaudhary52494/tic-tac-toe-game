import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import PlayArea from "./components/PlayArea";
import JoinGame from "./components/JoinGame";
import ShareId from "./components/ShareId";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/join" element={<JoinGame />} />
      <Route path="/shareId" element={<ShareId />} />
      <Route path="/playarea" element={<PlayArea />} />
    </Routes>
  );
}

export default App;
