import { useState } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true); // Set loading state to true before making the request
    try {
      // Make a GET request to fetch posts from the API
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");

      // Update the posts state with the fetched data
      setPosts(res.data);

      setLoading(false); // Set loading state to false after successful data fetching
    } catch (error) {
      // Handle errors
      setError(true);
      setLoading(false); // Set loading state to false in case of error
    }
  }

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      <button onClick={fetchAndUpdateData}>
        Click to display list of posts
      </button>
      {/* Render the list of posts */}
      {posts.map((post) => (
        <Post {...post} key={post.id} />
      ))}
    </div>
  );
}

export default Posts;
