const createStore = (reducer: (state: {}, action: {type: string, payload: string}) => {}, initialState: {}) => {
    const subscribers: Function[] = [];
    let currentState = initialState;

    return {
        getState: () => currentState,
        subscribe: (fn: Function) => {
            subscribers.push(fn);
            fn(currentState);
        },
        dispatch: (action: {type: string, payload: string}) => {
            currentState = reducer(currentState, action);
            subscribers.forEach(fn => fn(currentState));
        }
    };
};

const deepCopy = (object: {}) => JSON.parse(JSON.stringify(object));

const reducer = (state: {}, action: {type: string, payload: string}) => {
    let newState = deepCopy(state);
    if(action.type === 'ADD_USER') {
        newState.user = action.payload;
        return newState;
    } else {
        return state;
    }
};


let state: {} = {};

let store = Object.freeze(createStore(reducer, state));

export default store;
