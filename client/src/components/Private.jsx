import PostService from "../services/post.service";
// import AuthService from "../services/auth.service";
// import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

const Private = () => {
  const [posts, setPosts] = useState([]);
  // const navigate = useNavigate();

  useEffect(() => {
    PostService.getAllPrivatePosts().then(
      (res) => {
        setPosts(res.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  return (
    <div>
      <h1>private</h1>
      {posts && posts.map((post) => (
        <h3 key={uuid()}> {post.content}</h3>
      ))}


    </div>
  );
};

export default Private;
