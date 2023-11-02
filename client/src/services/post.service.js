import api from './api'


const getAllPublicPosts = () => {
    return api.get("/posts/public")
}

const getAllPrivatePosts = () => {
    return api.get('/posts/private')
}

const PostService = { getAllPrivatePosts, getAllPublicPosts }

export default PostService