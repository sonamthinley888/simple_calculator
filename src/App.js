
import React, { useReducer } from 'react';
import "./Styles.css"
import DigitButton from "./DigitButton"
import OperationButton from './OperationButton';

export const ACTIONS = {

  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: 'choose-operation',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit',
  EVALUATE: 'evaluate',
}

// Initial state
const initialState = {};


//  The reducer function listens for dispatched actions and updates the state accordingly.

function reducer(state, {type,payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      // If the last action was an evaluation, pressing a new digit should reset the state (by setting overwrite to false).
      if (state.overwrite) {
        return{          
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        }
      }
      // The reducer also ensures no leading 0s and only one . is allowed in the currentOperand.
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      };
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
        };
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`
      };
    
    case ACTIONS.CHOOSE_OPERATION:
        
        // It also handles the case when an operation is chosen without a current operand (e.g., pressing + before typing any number).
      if (state.currentOperand == null && state.previousOperand == null){
        return state
        }

      if (state.currentOperand === null) {
        return{
          ...state,
          operation: payload.operation,
        }
      }

        // The CHOOSE_OPERATION action stores the current operand in the previousOperand and sets the operation. 
      if (state.previousOperand == null) {
        return {
          ...state, 
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        }

        }
      return {
      ...state,
      previousOperand: evaluate(state),
      operation: payload.operation,
      currentOperand: null
      }
    

    case ACTIONS.CLEAR: 
      return {}
      
    case ACTIONS.DELETE_DIGIT: 
      if (state.overwrite) {
        return{
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state

      if (state.currentOperand.length === 1 ) {
        return {...state, currentOperand: null}
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }


    case ACTIONS.EVALUATE:
    // The EVALUATE action uses a helper evaluate function to calculate the result and clear out the operation and previousOperand.
      if (
        state.operation == null || 
        state.currentOperand == null || 
        state.previousOperand == null
      ) {
        return state
      }

      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        
      }
     
    }
}

// HELPER FUNCTIONS

// evaluate: Performs the actual arithmetic calculation based on the operation and both operands.

function evaluate({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) return "" 
  let computation = ""
  switch (operation) {
    case "+":
      computation = prev + current
      break
    case "-":
      computation = prev - current
      break
    case "*":
      computation = prev * current
      break
    case "÷":
      computation = prev / current
      break
  
  }
  return computation.toString();
}

//  formatOperand: Formats the operand (removes unnecessary decimal places) using Intl.NumberFormat.

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})

// The formatOperand function ensures the result is displayed with no more than zero decimal places, making it more readable.

function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split('.')
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}



//  STATE MANAGEMENT WITH USEREDUCER: The useReducer hook is used to handle the state for the calculator. 

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(
    reducer,
    initialState
  );

  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)} {operation}
        </div>
        <div className="current-operand"> 
          {formatOperand(currentOperand)}
        </div>
        
      </div>  

      <button className="span-two" 
        onClick={()=>dispatch({type: ACTIONS.CLEAR}) }>
          AC
      </button>

      <button onClick={()=>dispatch({type: ACTIONS.DELETE_DIGIT}) }>
        DEL
      </button>
      <OperationButton operation ="÷" dispatch={dispatch}/>
     
      <DigitButton digit ="1" dispatch={dispatch} />
      <DigitButton digit ="2" dispatch={dispatch} />
      <DigitButton digit ="3" dispatch={dispatch} />
      <OperationButton operation ="*" dispatch={dispatch}/>

      <DigitButton digit ="4" dispatch={dispatch} />
      <DigitButton digit ="5" dispatch={dispatch} />
      <DigitButton digit ="6" dispatch={dispatch} />
      <OperationButton operation ="+" dispatch={dispatch}/>

      <DigitButton digit ="7" dispatch={dispatch} />
      <DigitButton digit ="8" dispatch={dispatch} />
      <DigitButton digit ="9" dispatch={dispatch} />
      <OperationButton operation ="-" dispatch={dispatch}/>

      <DigitButton digit ="0" dispatch={dispatch} />
      <DigitButton digit ="." dispatch={dispatch} />
      <button className="span-two"
        onClick={()=>dispatch({type: ACTIONS.EVALUATE}) }>
      =
      </button>
    </div>  
    
  )
}

export default App
