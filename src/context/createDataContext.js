import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  //Context helps pass values to any nested component within the { children } object.
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, disptach] = useReducer(reducer, initialState);

    const boundActions = {}; //Empty object to store actions that are bound to dispatch.
    for (let key in actions) {
      //Passes dispatch to the functions within actions and stores them within boundActions.
      boundActions[key] = actions[key](disptach);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
