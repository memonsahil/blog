import React, { useReducer } from "react";

/*
Context API:
Context helps pass values to any nested component within the { children } object.
*/

export default (reducer, actions, initialState) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, disptach] = useReducer(reducer, initialState);

    // Empty object to store actions that are bound to dispatch.
    const boundActions = {};
    for (let key in actions) {
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
