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
// change the state
const experimentalFeed = changeState("soil")(-2);
const feed = changeState("soil")(2);
const blueFood = changeState("soil")(3);

const bathWater = changeState("soil")(-3);
const hydrate = changeState("soil")(2);
const superWater = changeState("soil")(4);

const blackLight = changeState("soil")(-1);
const giveLight = changeState("soil")(2);
const superSun = changeState("soil")(3);

const screamo = changeState("soil")(-4);
const countryMusic = changeState("soil")(3);
const classicalMusic = changeState("soil")(6);

// const canEat = function(plant) {
//   const obj = {
//     eat: function(feed) {
//       return `${plant.name} absorbed the ${feed} `
//     }
//   }
//   return obj;
// }

// const canGrow = function(plant) {
//   const obj = {
//     grow: function(light) {
//       return `${plant} grows tall in ${light}`
//     }
//   }
//   return obj;
// }

const canEat = (plant) => ({
  eat: (food) => {
    return `The ${plant.name} eats the ${food}.`
  }
});

const canGrow= (plant) => ({
  grow: () => {
    return `The ${plant.name} grows.`
  }
});
const growingEatingPlant = function(name) {
  let state = {
    name
  }

  return { ...state, ...canGrow(state), ...canEat(state) };
}

const canDoThings = function(creature) {
  const obj = {
    eat: function(food) {
      return `The ${creature} eats the ${food}.`
    },
    sleep: function() {
      return `The ${creature} sleeps.`
    }
  }
  return obj;
}






// new plants
const audrey2 = storeState();
const pixie = storeState();




window.onload = function() {
  const foodActions = [
    { action: experimentalFeed, label: 'experimentalFeed' },
    { action: feed, label: 'Feed' },
    { action: blueFood, label: 'Blue Food' },
  ]
  const hydrateActions = [
    { action: superWater, label: 'Super Water' },
    { action: bathWater, label: 'Bath Water'},
    { action: hydrate, label: 'hydrate'}
  ];

   const musicAction =[
    { action: screamo, label: 'screamo'},
    { action: countryMusic, label: 'countryMusic' },
    { action: classicalMusic, label: 'classicalMusic' },
  ];

  const lightAction = [
    { action: blackLight, label: 'blackLight' },
    { action: giveLight, label: 'giveLIght' },
    { action: superSun, label: 'superSun' },
  ];
  // This function has side effects because we are manipulating the DOM.
  // Manipulating the DOM will always be a side effect. 
  // Note that we only use one of our functions to alter soil. 
  // You can easily add more.
    document.getElementById('feed').onclick = function() {
    const randomFoodAction = foodActions[Math.floor(Math.random() * foodActions.length)];
    const newState = stateControl(randomFoodAction.action);
    document.getElementById('soil-value').innerText = `PlantScore: ${newState.soil}`;
    }
    document.getElementById('light').onclick = function () {
    const randomLightAction = lightAction[Math.floor(Math.random() * lightAction.length)];
    const newState = stateControl(randomLightAction.action);
    document.getElementById('soil-value').innerText = `PlantScore: ${newState.soil}`;
    }
    document.getElementById('hydrate').onclick = function () {
    const randomHydrateAction = hydrateActions[Math.floor(Math.random() * hydrateActions.length)];
    const newState = stateControl(randomHydrateAction.action);
    document.getElementById('soil-value').innerText = `PlantScore: ${newState.soil}`;
    }
    document.getElementById('music').onclick = function() {
    const randomMusicAction = musicAction[Math.floor(Math.random() * musicAction.length)];
    const newState = stateControl(randomMusicAction.action);
    document.getElementById('soil-value').innerText = `PlantScore: ${newState.soil}`;
    }
  

  

  // This function doesn't actually do anything useful in this application 
  // — it just demonstrates how we can "look" at the current state 
  // (which the DOM is holding anyway). 
  // However, students often do need the ability to see the current state 
  // without changing it so it's included here for reference.
  const showStateButton = document.getElementById('show-state');

  showStateButton.onclick = function () {
    const currentState = stateControl();
    document.getElementById('soil-value').innerText = `Plant Growth: ${currentState.soil}`;

    if (currentState.soil >= 8) {
      const popUpElement = document.getElementById('pop up');
      popUpElement.classList.remove('hidden');
    }
  };
};
