import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";

function ToggleSwitch() {
  const { currentTemperatureUnit, handleToggleUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <div className="toggle-buttons">
      <button
        className={`toggle-button ${currentTemperatureUnit === "F" ? "active" : ""}`}
        onClick={() => handleToggleUnit("F")}
      >
        F
      </button>
      <button
        className={`toggle-button ${currentTemperatureUnit === "C" ? "active" : ""}`}
        onClick={() => handleToggleUnit("C")}
      >
        C
      </button>
    </div>
  );
}

export default ToggleSwitch;
