import './App.css';
import { Routes, Route } from "react-router-dom";
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Adminexpense from './components/Adminexpense';
import Expense from './components/Expense';
import Addexp from './components/Addexp';
import Expreport from "./components/Expreport";
import Updateexp from './components/Updateexp';
import Comments from './components/Comments';
// import Fileup from './components/Fileup';

function App() {
  return (
      <Routes>
        <Route element={<Login />} path="/" />
        <Route element={<Signup />} path="/signup" />
        <Route element={<Logout />} path="/logout" />
        <Route element={<Adminexpense />} path="/adminexpense" />
        <Route element={<Expense />} path="/expense" />
        <Route element={<Addexp />} path="/addexp" />
        <Route element={<Expreport />} path="/expreport" />
        <Route element={<Updateexp />} path="/updateexp" />
        <Route element={<Comments />} path="/comments" />
        {/* <Route element={<Fileup />} path="/fileup" /> */}

      </Routes>


  );
}

export default App;