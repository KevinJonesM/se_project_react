import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ onAddClothesClick, city }) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      {/* LOGO con Link a la ruta principal */}
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>

      <p className="header__date-and-location">
        {today}, {city}
      </p>

      <ToggleSwitch />

      <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
        + Add Clothes
      </button>

      {/* Usuario con Link a /profile */}
      <Link to="/profile" className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </Link>
    </header>
  );
}

export default Header;
