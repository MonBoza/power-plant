// This function stores our state.
export const storeState = () => {
    let currentState = {};
    return (stateChangeFunction = state => state) => {
      const newState = stateChangeFunction(currentState);
      currentState = {...newState};
      return newState;
    }
  }
  
export const stateControl = storeState();

// This is a function factory. 
// We can easily create more specific functions that 
// alter a plant's soil, water, and light to varying degrees.
export const changeState = (prop) => {
  return (value) => {
    return (state) => ({
      ...state,
      [prop] : (state[prop] || 0) + value
    })
  }
}

// We create four functions using our function factory. 
// We could easily create many more.
export const feed = changeState("soil")(1);
export const blueFood = changeState("soil")(5);

const hydrate = changeState("water")(1);
const superWater = changeState("water")(5);
