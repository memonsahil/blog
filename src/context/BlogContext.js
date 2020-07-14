import createDataContext from "./createDataContext";
import jsonServer from "../api/jsonServer";

//The initial state is created in the Provider within createDataContext().
//The state for blogContext is passed as an array to createDataContext() below.
const blogReducer = (state, action) => {
  switch (action.type) {
    case "get_blogposts":
      return action.payload;
    /*
        case 'add_blogPost':
          return [
              ...state,
              {id: Math.floor(Math.random() * 99999),
                title: action.payload.title,
                content: action.payload.content}
            ];
        */
    case "delete_blogPost":
      return state.filter((blogPost) => blogPost.id !== action.payload);
    //state.filter returns the blogPosts whose id is not equal to action.payload (id to be deleted).
    case "edit_blogPost":
      return state.map((blogPost) => {
        return blogPost.id === action.payload.id ? action.payload : blogPost;
      });
    //Return the mapped (updated) state on that particular blogPost based on the return value from the ternary condition.
    default:
      return state;
  }
};

//Action functions:

const getBlogPosts = (dispatch) => {
  return async () => {
    const response = await jsonServer.get("/blogposts"); //Getting blogposts from the jsonServer.

    dispatch({ type: "get_blogposts", payload: response.data });
  };
};

const addBlogPosts = (dispatch) => {
  return async (title, content, callback) => {
    await jsonServer.post("/blogposts", { title, content });

    //dispatch() is not invoked since title and content are passed through jasonServer.post().
    //dispatch({type: 'add_blogPost', payload: {title, content}}); //Same as title: title, content: content
    if (callback) {
      //If a callback() function exits, then callback().
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
      //If a callback() function exits, then callback().
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  blogReducer,
  { getBlogPosts, addBlogPosts, deleteBlogPosts, editBlogPosts },
  []
);
