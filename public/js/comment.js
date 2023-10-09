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

  document
  .querySelector('.hidden-form')
  .addEventListener('submit', newCommentHandler);

  document
  .querySelector('.add-comment')
  .addEventListener('click', showForm);