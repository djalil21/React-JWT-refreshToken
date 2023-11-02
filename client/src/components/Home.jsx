import { useEffect, useState } from "react"
import PostService from "../services/post.service";
import {v4 as uuid} from 'uuid'

const Home = () => {
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        PostService.getAllPublicPosts().then((res) => {
            setPosts(res.data)
        }, (error) => {
            console.log(error)
        })
    },[])

  return (
    <div>
      {posts.map((post) => (
        <h3 key={uuid()}>{post.content}</h3>
      ))}
    </div>
  );
}

export default Home