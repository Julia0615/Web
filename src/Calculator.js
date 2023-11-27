import React, { useState } from 'react';
import './Calculator.css'; 


function Calculator() {
  console.log('Calculator component rendered');
  const [calc, setCalc] = useState('');
  const [result, setResult] = useState('');
  const [operationHistory, setOperationHistory] = useState('');
  const ops = ['+', '-', '*', '/', 'sqrt', 'x^2', 'x!', '=', '.', '(', ')'];
  const updateCalc = (value) => {
    if (!isNaN(value) && operationHistory.endsWith('^2')) {
      setOperationHistory(`${operationHistory.slice(0, -2)}^${value}`);
    } else if (
      (value === '(' && (calc === '' || ops.includes(calc.slice(-1)) || calc.slice(-1) === '(')) ||
      (!calc && value === '(')
    ) {
      setCalc((prevCalc) => prevCalc + value);
    } else if (value === ')' && calc.split('(').length <= calc.split(')').length) {
      return;
    } else {
      setCalc((prevCalc) => prevCalc + value);
    }
  
    if (!ops.includes(value)) {
      setOperationHistory((prevHistory) => prevHistory + value);
    } else if (value === '=') {
      calculate();
    } else if (value === 'sqrt') {
      if (!calc) {
        return;
      }
      if (calc[calc.length - 1] === ')') {
        
        setCalc((prevCalc) => prevCalc + 'sqrt');
        setResult('');
        setOperationHistory((prevHistory) => prevHistory + 'sqrt');
      } else {
       
        const sqrtResult = Math.sqrt(parseFloat(calc));
        setCalc(`(${calc})sqrt`);
        setResult(`${sqrtResult.toString()}`);
        setOperationHistory(`(${calc})sqrt`);
      }
    }
  }
  
  const createDigits = () => {
    const digits = [];
    for (let i = 1; i < 10; i++) {
      digits.push(
        <button onClick={() => updateCalc(i.toString())} key={i}>
          {i}
        </button>
      );
    }
    return digits;
  };
  const calculate = () => {
    try {
      let expression = calc.replace(/\^/g, '**');
      
 
      while (expression.includes('sqrt')) {
        const sqrtIndex = expression.indexOf('sqrt');
        const leftBracketIndex = expression.lastIndexOf('(', sqrtIndex);
        const rightBracketIndex = expression.indexOf(')', sqrtIndex);
  
        if (leftBracketIndex !== -1 && rightBracketIndex !== -1 && leftBracketIndex < sqrtIndex && rightBracketIndex > sqrtIndex) {
          const subExpression = expression.substring(leftBracketIndex + 1, rightBracketIndex);
          const subResult = Math.sqrt(evaluateExpression(subExpression));
          expression = expression.replace(`(${subExpression})sqrt`, subResult.toString());
        } else {
          throw new Error('Invalid Input');
        }
      }
  
    
      while (expression.includes('(') && expression.includes(')')) {
        const subExpression = expression.match(/\(([^()]+)\)/)[1];
        const subResult = evaluateExpression(subExpression);
        expression = expression.replace(`(${subExpression})`, subResult.toString());
      }
  
      setResult(evaluateExpression(expression).toString());
    } catch (error) {
      if (error.message !== 'Invalid Input') {
        setResult('Error');
      }
    }
  };
  
  const clear = () => {
    setCalc('');
    setResult('');
    setOperationHistory('');
  };


  
  const evaluateExpression = (expression) => {
    let result = expression;
    while (result.includes('!')) {
      const match = result.match(/(\d+)!/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num >= 0) {
          let factorial = 1;
          for (let i = 1; i <= num; i++) {
            factorial *= i;
          }
          result = result.replace(match[0], factorial.toString());
        } else {
          throw new Error('Invalid Input');
        }
      } else {
        throw new Error('Invalid Input');
      }
    }
    return eval(result);
  }
  const calculateSquare = () => {
    if (calc === '') {
      return;
    }
    const squareResult = Math.pow(parseFloat(calc), 2);
    setOperationHistory(`(${calc})^2`);
    setCalc(`${calc}^2`);
    setResult(squareResult.toString());
  };
  const calculateSqrt = () => {
    if (calc === '') {
      return;
    }
    const sqrtResult = Math.sqrt(parseFloat(calc));
    
    const formattedResult = sqrtResult.toFixed(2);
    setCalc(formattedResult);
    setResult('');
    setOperationHistory('');
  };
  

  const calculateFactorial = () => {
    if (calc === '') {
      return;
    }
    const num = parseFloat(calc);
    if (num < 0 || num !== Math.floor(num)) {
      setResult('Invalid Input');
    } else {
      const factorial = calculateRecursiveFactorial(num);
      setCalc(`${num}!`);
      setResult(factorial.toString());
    }
  };
  const calculateRecursiveFactorial = (n) => {
    if (n === 0) {
      return 1;
    }
    return n * calculateRecursiveFactorial(n - 1);
  };
  return (
    <div className="App">
      <div className="Calculator">
        <div className="display">
          {result ? <span>({result})</span> : ''}
          {calc || '0'}
        </div>
        <div className="Operators">
          <button onClick={() => updateCalc('/')}>/</button>
          <button onClick={() => updateCalc('+')}>+ </button>
          <button onClick={() => updateCalc('-')}>-</button>
          <button onClick={() => updateCalc('*')}>*</button>
          <button onClick={clear}>C</button>
          <button onClick={calculateSqrt}>sqrt</button>
          <button onClick={calculateSquare}>x^2</button>
          <button onClick={calculateFactorial}>x!</button>
          <button onClick={calculate}> =</button>
          <button onClick={() => updateCalc('(')}>(</button>
          <button onClick={() => updateCalc(')')}>)</button>
        </div>
        <div className="digits">{createDigits()}</div>
        <button onClick={() => updateCalc('0')}>0</button>
        <button onClick={() => updateCalc('.')}>.</button>
      </div>
    </div>
  );
}
export default Calculator; 