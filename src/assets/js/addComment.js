import axios from 'axios';

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentCount = document.getElementById('jsCommentCount');

const increaseCount = () => {
  commentCount.innerHTML = parseInt(commentCount.innerHTML, 10) + 1;
};

const addComment = (comment) => {
  const li = document.createElement('li');
  const span = document.createElement('span');
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
};

const sendComment = async (comment) => {
  const videoId = window.location.href.split('/videos/')[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: 'POST',
    data: {
      comment
    }
  });
  if (response.status === 200) {
    addComment(comment);
    increaseCount();
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector('input');
  const comment = commentInput.value;
  sendComment(comment);
};

function init() {
  addCommentForm.addEventListener('submit', handleSubmit);
}

if (addCommentForm) {
  init();
}
