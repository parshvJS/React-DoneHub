import React from 'react';
import { useState,useEffect } from 'react';
import serviceObj from '../conf/config';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from '../components/Post_form/PostForm'


function EditPost() {
    const [post,setPosts]=useState(null);
    const {slug} = useParams()
    const navigate=useNavigate();
    useEffect(()=>{
        if(slug){
            serviceObj.getPost(slug)
            .then((post)=>{
                setPosts(post)

            })
        }
        else{
            navigate('/')
        }
    })

  return post ? (
    <div className='py-8'>
        <PostForm post={post}/>
    </div>
  ):(<h1>This Post Doesn't Exist</h1>);
}

export default EditPost;