import Post from "../container/Post";
import axios from "../hooks/useAxios"
import request from "../hooks/useRequest";
import { createClient } from 'pexels';
const query = 'Nature';
import { useEffect,useState } from "react";

const HomePage = ()=>{
    
    const API_KEY =process.env.NEXT_PUBLIC_API_KEY;
    const client = createClient(API_KEY);
    const [posts,setPosts] = useState('')
    const [urlVideos, setUrlVideos] = useState('')
    useEffect(()=>{
         async function getData(){
    
             try {        
                 const answer = await axios.post(request.fetchPosts,{
                        sizes:30,
                        max_comments:60,
                        min_comments:5,
                        max_likes:80,
                        min_likes:8,
                        max_shares:80,
                        min_shares:8,
                 })
                 setPosts(answer.data.data)
             } catch (error) {
                 console.log(error);
                 setPosts([]);
             }
            
            client.videos.search({ query}).then(response => {
                setUrlVideos(response.videos[0].video_files[0].link)
            });
        }
        getData()



    },[])

    return <>
        {
            posts == '' && urlVideos == '' ? null :
            posts.map((page,index)=>(
                <Post
                    key={index}
                    videoLink={urlVideos}
                    pageName={page.pageName} 
                    comments={page.comments} 
                    date={page.date} 
                    description={page.description} 
                    share={page.share} 
                    likes={page.likes}  
                />
            ))
        }
    </>
}

export default HomePage;