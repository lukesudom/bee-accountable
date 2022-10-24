import { useState } from "react";
import { Days } from "../components/features/days/days";

const getFormattedPrice = (price) => `$${price.toFixed(2)}`;

export default function DaySelector() {
  const [total, setTotal] = useState(0);

  return (
    <div className="App">
      <h3>Completed Days</h3>
      <ul className="days-list">
        {Days.map(({ name }, index) => {
          return (
            <li key={index}>
              <div className="days-list-item">
                <div className="left-section">
                  <input
                    type="checkbox"
                    id={`custom-checkbox-${index}`}
                    name={name}
                    value={name}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
            </li>
          );
        })}
        <li>
          <div className="days-list-item">
            <div className="left-section">Total Days Complete:</div>
          </div>
        </li>
      </ul>
    </div>
  );
}
