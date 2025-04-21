import "./Header.css";
import logo from "../../assets/Logo.svg";
import avatar from "../../assets/Avatar.svg";

function Header({ onAddClothesClick, city }) {
  const today = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <p className="header__date-and-location">
        {today}, {city}
      </p>
      <button className="header__add-clothes-btn" onClick={onAddClothesClick}>
        + Add Clothes
      </button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      </div>
    </header>
  );
}

export default Header;