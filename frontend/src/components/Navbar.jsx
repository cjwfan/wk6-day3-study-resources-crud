import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="nav-link" to="/home">
        Home
      </Link>
      <span>|</span>
      <Link className="nav-link" to="/create">
        Add a Note
      </Link>
      <span>|</span>
      <Link className="nav-link" to="/resources">
        View Notes
      </Link>
    </nav>
  );
}

export default Navbar;
