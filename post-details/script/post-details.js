import {appendElementWithClassAndInnertext} from '../../functions/functions.js';

let url = new URL(location.href);
let post = JSON.parse(url.searchParams.get('postData'));
let username = url.searchParams.get('username');//передаю username з users

const {userId, id, title, body} = post;

const container=document.querySelector('.container');
const divPost=appendElementWithClassAndInnertext(container,'div','post');

appendElementWithClassAndInnertext(divPost,'h2','',username);
appendElementWithClassAndInnertext(divPost,'h3','',`userId: ${userId}, postId: ${id}`);
appendElementWithClassAndInnertext(divPost,'h3','',title);
appendElementWithClassAndInnertext(divPost,'p','',body);
appendElementWithClassAndInnertext(container,'h2','title','Comments');

const commentsDiv=appendElementWithClassAndInnertext(container,'div','comments');

    fetch('https://jsonplaceholder.typicode.com/posts/' + id + '/comments')
        .then(resp => resp.json())
        .then(comments => {
            for (const comment of comments) {
                const {postId, id, name, email, body} = comment;
                const commentDiv = appendElementWithClassAndInnertext(commentsDiv,'div','comment');

                appendElementWithClassAndInnertext(commentDiv,'div','',`Post id: ${postId}, id: ${id}`);
                appendElementWithClassAndInnertext(commentDiv,'div','',`email: ${email}`);
                appendElementWithClassAndInnertext(commentDiv,'div','',name);
                appendElementWithClassAndInnertext(commentDiv,'p','',body);
            }
        });