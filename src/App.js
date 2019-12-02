import React from 'react';
import { evaluate } from 'mathjs'
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      display: []
    };
  }

  makeCalculations = () => {
    // get what is displayed and joins
    let toCalculate = this.state.display.join("");
    // use math to evaluate
    let displayResult = evaluate(toCalculate);
    // display result
    if(displayResult) {
      this.setState({
        display: [displayResult]
      })
    }


  };

  handleClick = e => {
    const value = e.target.value;

    switch (value) {
        // if clear is clicked, clear state
      case "clear":
        this.setState({
          display: []
        });
        document.getElementById("decimal").disabled = false;
        break;
        // if equals is clicked, make calculations
      case "equals":
        this.makeCalculations();
        break;

      // separation of case "-" so TC12 passes
      case "-":
        // re-enable decimal button 
        document.getElementById("decimal").disabled = false;

        this.setState(prevState => ({
          display: [...prevState.display, value]
        }));
        break;
        
      // if operators are clicked succesively, use the last one (except subtraction)
      case "+": 
      case "*":
      case "/":
        const lastItem = this.state.display.slice(-1).toString();
        const operators = ["+", "-", "*", "/"];
        // re-enable decimal button 
        document.getElementById("decimal").disabled = false;

        operators.includes(lastItem)
          ? this.setState(prevState => ({
              // replace previous operator with the current operator
              display: [...prevState.display.shift(), value]
            }))
          : this.setState(prevState => ({
              display: [...prevState.display, value]
            }));
        break;

      default:
        // TC10 - prevent number from starting with multiple 0 0 0
        if (this.state.display.length === 0 && value == 0) {
          console.log('')
        } else {
          this.setState(prevState => ({
            display: [...prevState.display, value]
          }));
        }

    }
  };

  handleDecimal = e => {
    // prevent from adding a second decimal to the same number by disabling
    // decimal button until clear or operators are pressed
    document.getElementById("decimal").disabled = true;
    // accept floats starting with 0
    if (this.state.display.length === 0) {
      this.setState({
        display: ["0."]
      });
    } else {
      this.handleClick(e);
    }
  };

  render() {
    return (
      <div id="calculator">
        {/* if list is empty, display 0, else display list content */}
        <div id="display">
          {this.state.display.length === 0
            ? this.state.display.length
            : this.state.display}
        </div>
        <button id="equals" onClick={this.handleClick} value="equals">
          =
        </button>
        <button id="zero" onClick={this.handleClick} value="0">
          0
        </button>
        <button id="one" onClick={this.handleClick} value="1">
          1
        </button>
        <button id="two" onClick={this.handleClick} value="2">
          2
        </button>
        <button id="three" onClick={this.handleClick} value="3">
          3
        </button>
        <button id="four" onClick={this.handleClick} value="4">
          4
        </button>
        <button id="five" onClick={this.handleClick} value="5">
          5
        </button>
        <button id="six" onClick={this.handleClick} value="6">
          6
        </button>
        <button id="seven" onClick={this.handleClick} value="7">
          7
        </button>
        <button id="eight" onClick={this.handleClick} value="8">
          8
        </button>
        <button id="nine" onClick={this.handleClick} value="9">
          9
        </button>
        <button id="add" onClick={this.handleClick} value="+">
          +
        </button>
        <button id="subtract" onClick={this.handleClick} value="-">
          -
        </button>
        <button id="multiply" onClick={this.handleClick} value="*">
          *
        </button>
        <button id="divide" onClick={this.handleClick} value="/">
          /
        </button>
        <button id="decimal" onClick={this.handleDecimal} value=".">
          .
        </button>
        <button id="clear" onClick={this.handleClick} value="clear">
          CLEAR
        </button>
      </div>
    );
  }
}

export default App;
