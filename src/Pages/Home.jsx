// import React from 'react';
// import { useEffect, useState } from 'react';
// import serviceObj from '../conf/config';
// import PostCard  from '../components/PostCard'

// function Home() {
//   const [post, setPost] = useState([]);
//   useEffect(() => {
//     serviceObj.listPost().then((post) => {
//       setPost(post);
    
//       if (post.length === 0) {
//         return (
//           <>
//             <div class="flex items-center justify-center">
//               <div class="py-10">
//                 <div class="text-center">
//                   <h1 class="mt-2 text-2xl font-bold tracking-tight text-black sm:text-5xl">
//                     bit lonely here ! <br />
//                     Time To Unlock the Achivements
//                   </h1>
//                   <p class="mt-4 text-base leading-7 text-gray-600">Sorry, we couldn't find any Posts ! .</p>
//                   <button
//                     type="button"
//                     class="mt-7 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
//                   >
//                     Create New Task &plus;
//                   </button>
//                 </div>

//               </div>
//             </div>

//           </>
//         )
//       }

//     }
//     )


//     return (
//       <>
//         <div className="flex flex-wrap">
//           {
//             post.map((post) => (
//               <div key={post.$id} className='p-2'>
//                 <PostCard {...post} />
//               </div>
//             ))
//           }
//         </div>
//       </>
//     )

//   }

//   ,[])

// }

// export default Home;
import React, { useEffect, useState } from 'react';
import serviceObj from '../conf/config';
import PostCard from '../components/PostCard';
import { useNavigate } from 'react-router-dom';
import store from '../store/store';
import { useSelector } from 'react-redux';
import './Home.css'
function Home() {
  const [post, setPost] = useState([]);
  const Navigate=useNavigate();
  const authstatus = useSelector((state) => state.todo.status)
  useEffect(() => {
       serviceObj.listPost().then((posts) => {
      setPost(posts);
    });
  }, []); // empty dependency array to mimic componentDidMount behavior

  return (

    <div className="flex flex-wrap justify-center items-center">
      
      {
        !authstatus ? (<div className="flex flex-col items-center justify-center gap-8 mt-14 mb-32">
        <div className="text-box mb-10 mt-16 flex flex-row gap-3">
          <div className="text text-5xl font-bold text-black">Your</div>
          <div className="web3 text text-5xl font-bold text-transparent text-white" >Goal</div>
          <div className="text text-5xl font-bold text-black">Our</div>
          <div className="web3 text text-5xl font-bold text-transparent text-white" >Priority</div>
        </div>
      
        <div className="big-desc font-inter mx-auto max-w-screen-lg text-center text-lg font-normal leading-7 tracking-wide text-black md:text-xl md:leading-8 lg:text-2xl lg:leading-9">
          Streamline your day with our to-do list. Stay <br />
          organized, accomplish tasks, and boost <br />
          productivity effortlessly.
        </div>
        <div className="sml-desc font-inter mx-auto hidden max-w-screen-lg text-center text-lg font-normal leading-7 tracking-wide text-black md:text-xl md:leading-8 lg:text-2xl lg:leading-9">
          Stay organized, <br />
          accomplish tasks
        </div>
        <button onClick={()=>Navigate('/login')} className="big-btn h-14 w-96 rounded-[45.50px] bg-black hover:bg-slate-800 hover:transition-all">
          <div className=" text-center font-mono leading-[46.25px] tracking-[4px] text-white">Create Task </div>
        </button>
      
      <button className="hidden sml-btn mt-8 mx-auto h-14 w-72 md:w-96 rounded-full bg-black hover:bg-slate-800 hover:transition-all">
          <div className="text-center font-mono text-white">Create Task</div>
      </button>
      
      
      </div>):(  
      post.length === 0 ? (
        
          <div class="py-10">
            <div class="text-center">
              <h1 class="mt-2 text-2xl font-bold tracking-tight text-black sm:text-5xl">
                bit lonely here! <br />
                Time To Unlock the Achivements
              </h1>
              <p class="mt-4 text-base leading-7 text-gray-600">
                You Must Create Some tasks
              </p>
              <button
                type="button"
                onClick={()=>Navigate('/add-posts')}
                class="mt-7 rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Create Task
              </button>
            </div>
          
        </div>
      ) : (
        post.map((singlePost) => (
          <div key={singlePost.$id} className="p-2">
            <PostCard {...singlePost} />
          </div>
        ))
      ))
      }
    </div>
  );
}

export default Home;
