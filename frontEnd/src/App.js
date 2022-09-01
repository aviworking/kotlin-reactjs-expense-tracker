import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";

import EditCategory from "./pages/EditCategory";
import EditExpense from "./pages/EditExpense";
import Expenses from "./pages/Expenses";
import Home from "./pages/Home";

//Main application
const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="container py-4">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/edit-category/:id" element={<EditCategory />}></Route>
          <Route path="/expenses" element={<Expenses />}></Route>
          <Route path="/edit-expense/:id" element={<EditExpense />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
