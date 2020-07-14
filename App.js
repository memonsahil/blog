import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import IndexScreen from "./src/screens/IndexScreen";
import { Provider } from "./src/context/BlogContext"; //Using curley braces to import Provider since it is not a default export from that file.
//import { Provider as CommentsProvider } from './src/context/CommentsContext'; Renaming the Provider import based on its data type if multiple Providers are used.
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

const navigator = createStackNavigator(
  {
    Index: IndexScreen,
    Show: ShowScreen,
    Create: CreateScreen,
    Edit: EditScreen,
  },
  {
    initialRouteName: "Index",
    defaultNavigationOptions: {
      title: "Blogs",
    },
  }
);

const App = createAppContainer(navigator);

export default () => {
  return (
    //Provider wraps the App (therfore, all components within).
    <Provider>
      <App />
    </Provider>
  );

  /*
   return ( //When multiple Providers are used, their wrapping hierarchy does not matter.
    <CommentsProvider>
      <Provider>
        <App />
      </Provider>
    </CommentsProvider>
   );
  */
};
