import axios from "axios";

/*
Launch a local JSON database from the blog-post-server project. ngrok is setup in
blog-post-server and is used to redirect the baseURL to the database. Replace the
current baseURL with the ngrok forwareded URL. Note that the ngrok forwarded URL
changes every 2 hours; therefore, it needs to be updated accordingly.
*/

export default axios.create({
  baseURL: "https://5e9f78e37d0f.ngrok.io",
});
