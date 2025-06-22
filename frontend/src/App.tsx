import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import AddItem from "./pages/AddItem";
import ViewItems from "./pages/ViewItem";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AddItem />} />
        <Route path="/view" element={<ViewItems />} />
      </Routes>
    </Router>
  );
}

export default App;
