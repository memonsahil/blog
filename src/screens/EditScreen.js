import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Context } from "../context/BlogContext";
import BlogPostForm from "../components/BlogPostForm";

const EditScreen = ({ navigation }) => {
  const { state, editBlogPosts } = useContext(Context);

  const id = navigation.getParam("id");

  const blogPost = state.find((blogPost) => blogPost.id === id);

  return (
    <BlogPostForm //Passing props to BlogPostForm.
      initialValues={{ title: blogPost.title, content: blogPost.content }}
      onSubmit={(title, content) => {
        editBlogPosts(id, title, content, () => navigation.pop());
      }} //navigation.pop automatically sends the user to the previous screen when called.
    />
  );
};

const styles = StyleSheet.create({});

export default EditScreen;
