import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const CreateScreen = ({ navigation }) => {
  //Object destructured the action - addBlogPosts from Context which is in BlogContext which received it from createDataContext.
  const { addBlogPosts } = useContext(Context);

  return (
    <BlogPostForm //Passing props to BlogPostForm.
      onSubmit={(title, content) => {
        addBlogPosts(title, content, () => navigation.navigate("Index"));
      }}
    />
  );
};

const styles = StyleSheet.create({});

export default CreateScreen;
