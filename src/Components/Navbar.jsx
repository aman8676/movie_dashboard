import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    if (location.pathname === "/") {
      // Force reload of Home component
      e.preventDefault();
      navigate("/", { replace: true });
      window.location.reload(); // or trigger your own refresh logic
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-black px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-purple-500 tracking-wide">
          <Link to="/">🎬 Movie App</Link>
        </div>

        <div className="flex gap-6">
          <Link
            to="/"
            onClick={handleHomeClick}
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Home
          </Link>

          <Link
            to="/Favorite"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            Favorites
          </Link>

          <Link
            to="/people"
            className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
          >
            People
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
