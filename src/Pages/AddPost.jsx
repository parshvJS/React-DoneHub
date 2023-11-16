import React from 'react';
import Container from '../container/Container';
import PostForm from '../components/Post_form/PostForm'
function AddPost() {
  return (
 <div className="py-8">
    <Container>
        <PostForm/>
    </Container>
 </div>
  );
}

export default AddPost;