import avatar from "../../assets/Avatar.svg";
import "./SideBar.css";

function SideBar() {
  return (
   <section className="sidebar">
    <div className="sidebar__user-info">
        <img src={avatar} alt="User avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
    </div>
    </section>
  );
}

export default SideBar;
