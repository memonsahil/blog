import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    case "delete_blogPost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    case "edit_blogPost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    default:
      return state;
  }
};

//Action functions:

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts");

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPosts = () => {
  return async (title, content, callback) => {
    //dispatch() is not invoked since the title and content are passed through jsonServer.post().
    await jsonServer.post("/blogposts", { title, content });

    if (callback) {
      callback();
    }
  };
};

const deleteBlogPosts = (dispatch) => {
  return async (id) => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: "delete_blogPost", payload: id });
  };
};

const editBlogPosts = (dispatch) => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({
      type: "edit_blogPost",
      payload: { id: id, title: title, content: content },
    });
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPosts, deleteBlogPosts, editBlogPosts },
  []
);
