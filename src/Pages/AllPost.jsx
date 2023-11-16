import React, { useEffect, useState } from 'react';
import serviceObj from '../conf/config';
import Container from '../container/Container';
import PostCard from '../components/PostCard';
import './AllPost.css';

function AllPost() {
  const [Posts, setPosts] = useState([]);
  const [isPost, setIsPost] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const posts = await serviceObj.listAllPost();
        console.log("Post Loaded Successfully! :: AllPost Component :: line 11: ", posts);

        if (posts) {
          setIsPost(true);
          setPosts(posts.documents);
        } 
      } catch (error) {
        console.log("Error to Load Post! :: AllPost Component :: line 9: ", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount
  return (
    <>
      {isPost ? (
      <>
        <div className="relative">
          <div className="line absolute left-0 top-1/2 h-1 w-1/4 bg-black"></div>
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold text-black">All Posts</h1>
          </div>
          <div className="line absolute right-0 top-1/2 h-1 w-1/4 bg-black"></div>
        </div>
        <div className="main-div flex w-full flex-wrap bg-white p-4">
          <Container>
            {Posts.map((post) => (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </Container>
        </div>
      </>
      ) : (
     <>   <div className="py-10">
     <div className="text-center">
       <h1 className="mt-2 text-2xl font-bold tracking-tight text-black sm:text-5xl">
         bit lonely here! <br />
         Time To Unlock the Achievements
       </h1>
       <p className="mt-4 text-base leading-7 text-gray-600">
         Sorry, you must login First
       </p>
       <button
         type="button"
         onClick={() => Navigate('/add-posts')}
         className="mt-7 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
       >
         Create Task
       </button>
     </div>
   </div></>
      )}
    </>
  );
  

}

export default AllPost;
