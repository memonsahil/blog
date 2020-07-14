//Context helps pass values to any nested component within the { children } object.
//File name starts with lowercase since it's exporting a plain function.

import React, { useReducer } from "react";

export default (reducer, actions, initialState) => {
  const Context = React.createContext(); //React has a function for implementing context.

  const Provider = ({ children }) => {
    const [state, disptach] = useReducer(reducer, initialState);

    //actions == { addBlogPosts: (dispatch) => { return () => {} } }
    const boundActions = {}; //Empty object to store actions that are bound to dispatch.
    for (let key in actions) {
      boundActions[key] = actions[key](disptach); //Passes dispatch to the functions within actions and stores them within boundActions.
    }

    return (
      //state same as state: state in the object below.
      //Passing the entire boundActions object below.
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
