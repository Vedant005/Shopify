// src/components/Header.tsx
import { useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="bg-blue-600 py-12 text-white text-center shadow-lg">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Item Management</h1>
      <div className="flex justify-center gap-6">
        <button
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${
            location.pathname === "/"
              ? "bg-white text-blue-600"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => navigate("/")}
        >
          Add Item
        </button>
        <button
          className={`px-6 py-3 rounded-xl text-lg font-semibold transition-all duration-200 ${
            location.pathname === "/view"
              ? "bg-white text-blue-600"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => navigate("/view")}
        >
          View Items
        </button>
      </div>
    </header>
  );
};

export default Header;
