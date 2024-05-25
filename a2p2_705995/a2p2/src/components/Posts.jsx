import { useState, useEffect } from "react";
import axios from "axios";
import Post from "./Post";
import LoadingIndicator from "./LoadingIndicator";
import ErrorIndicator from "./ErrorIndicator";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  async function fetchAndUpdateData() {
    setLoading(true);
    try {
      // Make a GET request to fetch posts from the API
      const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
      
      // Update the posts state with the fetched data
      setPosts(response.data);
      
      setLoading(false);
    } catch (error) {
      // Handle errors
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    // Fetch data when the component mounts
    fetchAndUpdateData();
  }, []);

  if (loading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div>
      <h1>List of Posts</h1>
      {/* Render the list of posts */}
      {posts.map((post) => (
        <Post key={post.id} title={post.title} body={post.body} />
      ))}
    </div>
  );
}

export default Posts;
