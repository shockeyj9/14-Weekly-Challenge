const hiddenForm =   document.querySelector('.hidden-form');

function showForm (){
    document.querySelector('.hidden-form').hidden = false;
}

const newCommentHandler = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment').value.trim();
    const blogID = document.location.pathname.split("/")[2];

    if (content) {
      const response = await fetch(`/api/comments`, 
      {
        method: 'POST',
        body: JSON.stringify({content,blogID}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace(`/blog/${blogID}`);
      } else {
        alert('Failed to create comment');
      }
    }
  };


  const updateHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector('#blog-title').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    const blogID = document.location.pathname.split("/")[2];

    if (title && content) {
      const response = await fetch(`/api/blogs/${blogID}`, 
      {
        method: 'PUT',
        body: JSON.stringify({title, content}),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog');
      }
    }
  };

  const deleteHandler = async (event) => {
    event.preventDefault();
  
    const blogID = document.location.pathname.split("/")[2];
   
    if (blogID) {
      const response = await fetch(`/api/blogs/${blogID}`, 
      {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete blog');
      }
    }
  };

  

  
  if (hiddenForm){
    
    document
    .querySelector('.hidden-form')
    .addEventListener('submit', newCommentHandler);
    
    document
    .querySelector('.add-comment')
    .addEventListener('click', showForm);
  }else{
    
    document
    .querySelector('.btn-update')
    .addEventListener('click', updateHandler);

    document
    .querySelector('.btn-delete')
    .addEventListener('click', deleteHandler);

  }