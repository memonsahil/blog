import axios from "axios";

/*
Launch a local json database from the blog-post-server project. ngrok is setup in
the blog-post-server project and is used to redirect the baseURL to the database.
Replace the ngrok forwareded URL with the current baseURL. Note that the ngrok 
forwarded URL changes every 8 hours.
*/

export default axios.create({
  baseURL: "http://afc1c7c69ba5.ngrok.io",
});
