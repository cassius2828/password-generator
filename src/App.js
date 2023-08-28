import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./App.css";
import {
  faArrowRight,
  faCheckSquare,
  faCopy,
  faXmarkSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

function App() {
  // password state + password length state
  const [password, setPassword] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [sliderNum, setSliderNum] = useState(20);
  // password requirements state
  const [upPass, setUpPass] = useState(false);
  const [lowPass, setLowPass] = useState(false);
  const [numPass, setNumPass] = useState(false);
  const [symPass, setSymPass] = useState(false);
  const [lengthPass, setLengthPass] = useState(false);
  // progress state
  const [barProgress, setBarProgress] = useState(0);
  // copy state
  const [copyState, setCopyState] = useState(false);
  const [hideText, setHideText] = useState(true);

  /////////////////////////////////
  // * sets bar progress based on num of passed requirements
  /////////////////////////////////
  const incrementBar = () => {
    let count = 0;
    if (count < 6) {
      if (upPass) {
        count = count + 1;
        setBarProgress(count);
      }

      if (lowPass) {
        count = count + 1;
        setBarProgress(count);
      }

      if (numPass) {
        count = count + 1;
        setBarProgress(count);
      }

      if (symPass) {
        count = count + 1;
        setBarProgress(count);
      }

      if (lengthPass) {
        count = count + 1;
        setBarProgress(count);
      }

      setBarProgress(count);
    }
  };

  /////////////////////////////////
  // * adds and removes bars based on if the input value passes
  // * the password requirements
  /////////////////////////////////
  const fillBars = (selector, count) => {
    if (barProgress >= count) {
      const bar = document.getElementById(selector);
      bar.classList.remove("empty");
      bar.classList.add("filled");
    } else if (barProgress < count) {
      const bar = document.getElementById(selector);
      bar.classList.remove("filled");
      bar.classList.add("empty");
    }
  };

  useEffect(() => {
    fillBars("bar1", 1);
    fillBars("bar2", 2);
    fillBars("bar3", 3);
    fillBars("bar4", 4);
    fillBars("bar5", 5);
  }, [barProgress]);

  useEffect(() => {
    incrementBar();
  }, [upPass, lowPass, numPass, symPass, lengthPass]);

  /////////////////////////////////
  // * MANUAL PASSWORD
  /////////////////////////////////
  const handleManualPassword = (e) => {
    setPassword(e.target.value);
  };

  /////////////////////////////////
  //  * GENERATE PASSWORD AND REGEX LOGIC
  /////////////////////////////////
  const regex =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!#$%&*+,-.:;<=>?@^_]).*$/;

  const generatePassword = () => {
    let newPassword = [];
    for (let i = 0; i < sliderNum; i++) {
      let randomNum = Math.floor(Math.random() * (122 - 33) + 33);
      // eliminates unwanted characters in the ascii range, turns into 'h' the other to '4'
      if (
        randomNum === 34 ||
        randomNum === 39 ||
        randomNum === 40 ||
        randomNum === 41 ||
        randomNum === 44 ||
        randomNum === 47
      ) {
        randomNum = 42;
      }

      if (
        randomNum === 91 ||
        randomNum === 92 ||
        randomNum === 93 ||
        randomNum === 96 ||
        randomNum === 124
      ) {
        randomNum = 45;
      }

      randomNum = randomNum.toString();
      let asciiCode = String.fromCharCode(randomNum);
      newPassword.push(asciiCode);
    }
    newPassword = newPassword.join("");
    setTempPassword(newPassword);
    return newPassword;
  };

  useEffect(() => {
    generatePassword();
  }, [sliderNum]);

  /////////////////////////////////
  //  * DISPLAY PASSWORD
  /////////////////////////////////
  // if the random password does not meet regex requirements, then run it again
  const displayPassword = () => {
    // setDisableManual(true)
    dimButton("generate");

    generatePassword();

    if (!tempPassword.match(regex)) {
      generatePassword();
    }
    setPassword(tempPassword);
  };

  //////////////////////////////////////////////////////////
  // * dims generate button
  //////////////////////////////////////////////////////////
  const dimButton = (selector) => {
    const id = document.getElementById(selector);
    id.classList.add("dim");
    setTimeout(() => {
      id.classList.remove("dim");
    }, 70);
  };
  //////////////////////////////////////////////////////////
  // * confirms copy for user
  //////////////////////////////////////////////////////////
  const confirmCopy = () => {
    setHideText(false);
    setTimeout(() => {
      setHideText(true);
    }, 750);
  };

  //////////////////////////////////////////////////////////
  // * gets value from slider and displays it as an INT
  //////////////////////////////////////////////////////////

  const sliderValue = () => {
    const slider = document.getElementById("password-length").value;
    setSliderNum(slider);
  };

  useEffect(() => {
    sliderValue();
  });

  //////////////////////////////////////////////////////////
  // * toggles icon based upon passing password requirements
  //////////////////////////////////////////////////////////
  const regexNum = /\d/g;
  const regexCap = /[A-Z]/g;
  const regexLow = /[a-z]/g;
  const regexSym = /[!#$%&*+,-.:;<=>?@^_]/g;

  const changeIcon = (selector, state) => {
    const icon = document.getElementById(selector);
    if (state) {
      icon.classList.add("passed");
      icon.classList.remove("failed");
    } else {
      icon.classList.remove("passed");
      icon.classList.add("failed");
    }
  };

  const toggleIconState = () => {
    if (password.length > 7) {
      setLengthPass(true);
    } else {
      setLengthPass(false);
    }
    if (password.match(regexCap)) {
      setUpPass(true);
    } else {
      setUpPass(false);
    }

    if (password.match(regexLow)) {
      setLowPass(true);
    } else {
      setLowPass(false);
    }

    if (password.match(regexNum)) {
      setNumPass(true);
    } else {
      setNumPass(false);
    }

    if (password.match(regexSym)) {
      setSymPass(true);
    } else {
      setSymPass(false);
    }
  };

  useEffect(() => {
    toggleIconState();
  }, [password]);

  useEffect(() => {
    changeIcon("upper", upPass);
    changeIcon("lower", lowPass);
    changeIcon("number", numPass);
    changeIcon("symbol", symPass);
    changeIcon("length", lengthPass);
  }, [upPass, lowPass, numPass, symPass, lengthPass]);

  // useEffect(() => {
  //   test()
  // },[password])

  /////////////////////////////////
  // ! START RETURN
  /////////////////////////////////
  return (
    <div className="main-container">
      {/* top content */}
      <p>Password Generator</p>
      <div className="password-display">
        <input
          autoComplete="off"
          id="password"
          type="text"
          minLength={8}
          maxLength={20}
          onChange={handleManualPassword}
          value={password}
        />
        <div onClick={confirmCopy} id="click-event-div">
          <p className={hideText ? "hidden-text" : "visible"}>copied!</p>
          <CopyToClipboard text={password} onCopy={() => setCopyState(true)}>
            <FontAwesomeIcon
              className="pointer"
              id="copy-icon"
              size="lg"
              icon={faCopy}
            />
          </CopyToClipboard>
        </div>

        {/* main content */}
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
          {/* row 1 */}
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
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

          {/* row 2 */}
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
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

          {/* row 3 */}
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
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

          {/* row 4 */}
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
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

          {/* row 5 */}
          <div className="row">
            <div className="icon-container">
              <FontAwesomeIcon
                id="length"
                size="lg"
                className="failed"
                icon={symPass ? faCheckSquare : faXmarkSquare}
              />
            </div>
            <div className="include">
              {" "}
              <span> password length {">"}= 8</span>
            </div>
          </div>
        </div>

        {/* next section */}
        <div className="strength-container">
          <span className="strength">strength</span>{" "}
          <div className="medium-contianer">
            {" "}
            <h3>
              {barProgress < 2
                ? "Weak"
                : barProgress < 4
                ? "Medium"
                : barProgress === 4
                ? "Strong"
                : barProgress === 5
                ? "Very Strong"
                : null}
            </h3>
          </div>
          <div className="bar-container">
            <div id="bar1" className="bars empty"></div>
            <div id="bar2" className="bars empty"></div>
            <div id="bar3" className="bars empty"></div>
            <div id="bar4" className="bars empty"></div>
            <div id="bar5" className="bars empty"></div>
          </div>
        </div>
        <button
          onClick={displayPassword}
          id="generate"
          className="generate pointer"
        >
          Generate <FontAwesomeIcon id="arrow" icon={faArrowRight} />{" "}
        </button>
      </div>
      <footer>
        Developed By{" "}
        <a href="https://github.com/cassius2828">Cassius Reynolds</a>
      </footer>
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



D3 will also let me style each selected one
https://www.freecodecamp.org/learn/data-visualization/data-visualization-with-d3/change-styles-based-on-data




add to scores app with D3
make viusalization bar and highlight your score amongst the rest!!

*/
