import React, { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native"; //TouchableOpacity turns any element touchable.
import { Context } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";
import ShowScreen from "./ShowScreen";

const IndexScreen = ({ navigation }) => {
  //Object destructured to get navigation from props.
  //console.log(props);   To view the props object and its functions within.

  const { state, deleteBlogPosts, getBlogPosts } = useContext(Context); //useContext is used to access the BlogContext.

  useEffect(() => {
    getBlogPosts(); //Used for getting the blogposts from the server initially.

    const listener = navigation.addListener("didFocus", () => {
      //Get the blogposts everytime when the IndexScreen is in focus.
      getBlogPosts();
    });

    return () => {
      //Turning off the listener when the IndexScreen is dismounted.
      listener.remove(); //This callback() will be invoked when the IndexScreen is removed.
    };
  });

  return (
    //onPress = {addBlogPosts} same as onPress = {() => addBlogPosts()}.
    <View>
      <FlatList
        data={state}
        keyExtractor={(blogPost) => blogPost.title}
        renderItem={({ item }) => {
          return (
            //Passing the id for that particular item through navigation.
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}
            >
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title} - {item.id}
                </Text>
                <TouchableOpacity onPress={() => deleteBlogPosts(item.id)}>
                  <Feather name="trash" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

//To add the create icon in the header.
IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerRight: () => (
      <TouchableOpacity onPress={() => navigation.navigate("Create")}>
        <Feather name="plus" size={30} />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderColor: "grey",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
