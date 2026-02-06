// React apps are built from components.
// This file defines ONE component: App.
//
// React itself is already loaded by Vite,
// but we explicitly import useState because
// we need it to store and update values.
import { useState } from "react";

// Optional CSS file for styling
import "./App.css";

// This is a React FUNCTION COMPONENT.
// React will call this function to render your UI.
export default function App() {

  // -------------------------------
  // STATE (React’s core concept)
  // -------------------------------
  // useState creates a piece of reactive state.
  // Format:
  // const [value, setValue] = useState(initialValue)
  //
  // When setValue(...) is called:
  //  - React re-runs this component
  //  - The UI automatically updates

  // Core user inputs
  const [currentAge, setCurrentAge] = useState(35);
  const [annualSpend, setAnnualSpend] = useState(60000);
  const [extraInvested, setExtraInvested] = useState(1000);

  // Advanced inputs
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [inflation, setInflation] = useState(2.5);
  const [returnRate, setReturnRate] = useState(8.0);
  const [retirementAge, setRetirementAge] = useState(65);

  // Output value
  // null means “not calculated yet”
  const [resultDays, setResultDays] = useState(null);

  // -------------------------------
  // CALCULATION LOGIC
  // -------------------------------
  // This function runs when the user
  // clicks the Calculate button.
  function calculateImpact() {

    // Convert nominal return to real return
    // (this adjusts for inflation)
    const realReturn =
      (1 + returnRate / 100) / (1 + inflation / 100) - 1;

    // Guard rails: bad assumptions = zero impact
    if (realReturn <= 0) {
      setResultDays(0);
      return;
    }

    const yearsToRetirement = retirementAge - currentAge;
    if (yearsToRetirement <= 0) {
      setResultDays(0);
      return;
    }

    // Compound the extra investment forward
    const futureValue =
      extraInvested * Math.pow(1 + realReturn, yearsToRetirement);

    // Convert dollars into years of spending
    const yearsBought = futureValue / annualSpend;

    // Convert years → days
    const daysRaw = yearsBought * 365;
    const days = Math.round(daysRaw*10)/10;

    // Update state → UI updates automatically
    setResultDays(days);
  }

  // -------------------------------
  // JSX (UI DEFINITION)
  // -------------------------------
  // JSX looks like HTML but is actually JavaScript.
  // You can embed JS expressions using { }.
  return (
    <div className="app">
      <h1>Younger Retirement</h1>

      <div className="card">

        {/* INPUT: Current Age */}
        <label>
          Current Age
          <input
            type="number"
            value={currentAge}
            // onChange fires whenever user types
            // e.target.value is always a string,
            // so we convert it to Number
            onChange={(e) => setCurrentAge(Number(e.target.value))}
          />
        </label>

        {/* INPUT: Annual Spend */}
        <label>
          Annual Spend ($)
          <input
            type="number"
            value={annualSpend}
            onChange={(e) => setAnnualSpend(Number(e.target.value))}
          />
        </label>

        {/* INPUT: Extra Invested */}
        <label>
          Extra Invested Today ($)
          <input
            type="number"
            value={extraInvested}
            onChange={(e) => setExtraInvested(Number(e.target.value))}
          />
        </label>

        {/* TOGGLE ADVANCED SETTINGS */}
        <button onClick={() => setShowAdvanced(!showAdvanced)}>
          {showAdvanced ? "Hide Advanced" : "Show Advanced"}
        </button>

        {/* CONDITIONAL RENDERING */}
        {/* This block only appears when showAdvanced === true */}
        {showAdvanced && (
          <div className="advanced">

            <label>
              Inflation (%)
              <input
                type="number"
                step="0.1"
                value={inflation}
                onChange={(e) => setInflation(Number(e.target.value))}
              />
            </label>

            <label>
              Return (%)
              <input
                type="number"
                step="0.1"
                value={returnRate}
                onChange={(e) => setReturnRate(Number(e.target.value))}
              />
            </label>

            <label>
              Retirement Age
              <input
                type="number"
                value={retirementAge}
                onChange={(e) =>
                  setRetirementAge(Number(e.target.value))
                }
              />
            </label>

          </div>
        )}

        {/* CALCULATE BUTTON */}
        <button className="primary" onClick={calculateImpact}>
          Calculate
        </button>

        {/* RESULT DISPLAY */}
        {/* Only shows after calculation */}
        {resultDays !== null && (
          <div className="result">
            <strong>
              This moves retirement up by{" "}
              {resultDays} days
            </strong>
            <div>
              (~{Math.round(resultDays / 30)} months)
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
