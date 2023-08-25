import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faArrowRight,
  faCheckSquare,
  faCopy,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

function App() {
  const [password, setPassword] = useState("");
  const [sliderNum, setSliderNum] = useState(20);
  const [upPass, setUpPass] = useState(false);
  const [lowPass, setLowPass] = useState(false);
  const [numPass, setNumPass] = useState(false);
  const [symPass, setSymPass] = useState(false);
  const [barProgress, setBarProgress] = useState(0);

  /////////////////////////////////
  // * sets bar progress based on num of passed requirements
  const barStatus = () => {
    let count = 0;
    if (upPass) count = count + 1;
    if (lowPass) count = count + 1;
    if (numPass) count = count + 1;
    if (symPass) count = count + 1;
    setBarProgress(count);
  };

  const fillBars = (selector, count) => {
    if (barProgress === count) {
      const bar = document.getElementById(selector);
      bar.classList.remove("empty");
      bar.classList.add("filled");
    }
  };

  useEffect(() => {
    fillBars("bar1", 1);
    fillBars("bar2", 2);
    fillBars("bar3", 3);
    fillBars("bar4", 4);
  }, [barProgress]);

  useEffect(() => {
    barStatus();
  }, [upPass, lowPass, numPass, symPass]);
  /////////////////////////////////

  // char codes used
  // 33 -- 122

  let randomNum = Math.random() * (122 - 33) + 33;

  /*
  setStr(prev => prev.concat(next))
  
  */



  // gets value from slider and displays it as an INT
  const sliderValue = () => {
    const slider = document.getElementById("password-length").value;
    setSliderNum(slider);
  };

  /////////////////////////////////
  // * toggles icon based upon passing password requirements
  const toggleIcon = (selector, state) => {
    const icon = document.getElementById(selector);
    if (state) {
      icon.classList.add("passed");
      icon.classList.remove("failed");
    } else {
      icon.classList.remove("passed");
      icon.classList.add("failed");
    }
  };

  useEffect(() => {
    toggleIcon("upper", upPass);
    toggleIcon("lower", lowPass);
    toggleIcon("number", numPass);
    toggleIcon("symbol", symPass);
  }, [upPass, lowPass, numPass, symPass]);
  /////////////////////////////////

  return (
    <div className="main-container">
      <p>Password Generator</p>
      <div className="password-display">
        <h2>{password}</h2>
        <FontAwesomeIcon id="copy-icon" size="lg" icon={faCopy} />
      </div>
      <div className="main-display">
        <div>
          <p id="char-length">character length</p>
          <h2 className="char-length-num">{sliderNum}</h2>
        </div>
        <div class="input-container">
          <input
            onChange={sliderValue}
            type="range"
            min={8}
            max={20}
            id="password-length"
          />
        </div>
        <div className="bottom-display">
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
                // onChange={toggleIcon("upper", upPass)}
                id="upper"
                size="lg"
                className="failed"
                icon={upPass ? faCheckSquare : faXmarkSquare}
              />
            </div>
            <div className="include">
              <span className="test">include uppercase letters</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
                // onChange={toggleIcon("lower", lowPass)}
                id="lower"
                size="lg"
                className="failed"
                icon={lowPass ? faCheckSquare : faXmarkSquare}
              />
            </div>
            <div className="include">
              <span>include lowercase letters</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
                // onChange={toggleIcon("number", numPass)}
                id="number"
                size="lg"
                className="failed"
                icon={numPass ? faCheckSquare : faXmarkSquare}
              />
            </div>
            <div className="include">
              {" "}
              <span>include numbers</span>
            </div>
          </div>
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
                // onChange={toggleIcon("symbol", symPass)}
                id="symbol"
                size="lg"
                className="failed"
                icon={symPass ? faCheckSquare : faXmarkSquare}
              />
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
            <div id="bar1" className="bars empty"></div>
            <div id="bar2" className="bars empty"></div>
            <div id="bar3" className="bars empty"></div>
            <div id="bar4" className="bars empty"></div>
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

/*
NOTABLE TASKS FOR PROJECT
1. Generate passcodes from ascii (fromCharCode(num))
- get random number betweeen 33 -- 122
- repeat action and save in state until it reaches the selected char length
- ensure that it will pass all requirements for a passcode 
- will it be editable or static? 

2. Slider needs to reflect value of char length num
- select input by id + value, then make that event listener target 
set to charlength state
- 

3. make font awesome icons appear according to password requirements being met
- need to make each bar light up for each check that is passed

4. Generate button triggers all actions and replaces values each time

*/
