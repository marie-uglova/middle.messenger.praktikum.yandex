const createStore = (reducer, initialState) => {
    const subscribers = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: fn => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: action => {
            currentState = reducer(currentState, action);
            subscribers.forEach(fn => fn(currentState));
        }
    };
};

const deepCopy = object => JSON.parse(JSON.stringify(object));

const reducer = (state, action) => {
    let newState = deepCopy(state);
    if(action.type === 'ADD_USER') {
        newState.user = action.payload;
        return newState;
    } else {
        return state;
    }
};


let state = {};

/*let setTextAction = {
    type: 'SET_TEXT',
    buttonText: ''
};

let setUserProps = {
    type: 'SET_USER',
    buttonText: ''
};*/

let store = Object.freeze(createStore(reducer, state));

export default store;
