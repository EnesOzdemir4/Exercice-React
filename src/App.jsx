// src/App.jsx
import { BrowserRouter } from "react-router-dom";
import SearchForm from "./components/SearchForm";
import IndicatorTable from "./components/IndicatorTable";
import "./index.css";


function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Tableau de bord - Banque mondiale</h1>
        <SearchForm />
        <IndicatorTable />
      </div>
    </BrowserRouter>
  );
}

export default App;
