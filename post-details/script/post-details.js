let url = new URL(location.href);
let post = JSON.parse(url.searchParams.get('postData'));
let username = url.searchParams.get('username');//передаю username з users

const {userId, id, title, body} = post;

const container=document.querySelector('.container')
const divPost = document.createElement('div');
divPost.classList.add('post');
container.appendChild(divPost);

const h2UserName = document.createElement('h2');
h2UserName.innerText = username;

const h3PostId = document.createElement('h3');
h3PostId.innerText = `userId: ${userId}, postId: ${id}`;


const h3PostTitle = document.createElement('h3');
h3PostTitle.innerText = `${title}`;

const pPostBody = document.createElement('p');
pPostBody.innerText = `${body}`;

divPost.append(h2UserName, h3PostId, h3PostTitle, pPostBody);

const commentsTitle=document.createElement('h2');
commentsTitle.classList.add('title');
commentsTitle.innerText='Comments';

const divComments = document.createElement('div');
divComments.classList.add('comments');
container.append(commentsTitle,divComments);
    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        .then(resp => resp.json())
        .then(comments => {
            for (const comment of comments) {
                const {postId, id, name, email, body} = comment;
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');

                const commentTitle = document.createElement('div');
                commentTitle.innerText = `Post id: ${postId}, id: ${id}`;

                const commentEmail = document.createElement('div');
                commentEmail.innerText = `email: ${email}`;

                const commentName = document.createElement('div');
                commentName.innerText = `${name}`;

                const commentBody = document.createElement('p');
                commentBody.innerText = `${body}`;

                commentDiv.append(commentTitle, commentEmail,commentName, commentBody);
                divComments.appendChild(commentDiv);
            }
        });