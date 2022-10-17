import "./styles/App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Register, Users, EditUser, Error } from "./pages/index";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Navbar />}>
          <Route index element={<Users />} />
          <Route path="add-user" element={<Register />} />
          <Route path="/" element={<Users />} />
          <Route path="edit-user" element={<EditUser />} />
        </Route>
        <Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
