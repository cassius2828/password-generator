import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faArrowRight,
  faCheckSquare,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="main-container">
      <p>Password Generator</p>
      <div className="password-display">
        <h2>FDf65%^ld_</h2>
        <FontAwesomeIcon icon={faCopy} />
      </div>
      <div className="main-display">
        <div>
          <p id="char-length">character length</p>
          <h2>10</h2>
        </div>
        <div class="input-container">
          <input type="range" min={0} max={20} id="password-length" />
        </div>
        <div className="bottom-display">
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon className="icon" icon={faCheckSquare} />
            </div>
            <div className="include">
              <span>include uppercase letters</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon className="icon" icon={faCheckSquare} />
            </div>
            <div className="include">
              <span>include lowercase letters</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon className="icon" icon={faCheckSquare} />
            </div>
            <div className="include">
              {" "}
              <span>include numbers</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon className="icon" icon={faCheckSquare} />
            </div>
            <div className="include">
              {" "}
              <span> include symbols</span>
            </div>
          </div>
        </div>
        <div className="strength-container">
          <span className="strength">strength</span>{" "}
          <div className="medium-contianer">
            {" "}
            <h3>Medium</h3>
          </div>
          <div className="bar-container">
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
            <div className="bars"></div>
          </div>
        </div>
        <button className="generate">
          Generate <FontAwesomeIcon id="arrow" icon={faArrowRight} />{" "}
        </button>
      </div>
    </div>
  );
}

export default App;
