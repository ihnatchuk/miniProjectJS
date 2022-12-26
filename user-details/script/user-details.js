import {appendElementWithClassAndInnertext, userObjectToDiv} from '../../functions/functions.js';

let url = new URL(location.href);
let user = JSON.parse(url.searchParams.get('userdata'));
const {id, username}=user;

const container=document.querySelector('.container');
const divUser=appendElementWithClassAndInnertext(container,'div','user');
userObjectToDiv(divUser,user);

const button =appendElementWithClassAndInnertext(container,'button','','Posts of current user');

button.onclick = () => {
    let postsDiv = document.getElementsByClassName('posts')[0];
    if (!postsDiv) {
        fetch('https://jsonplaceholder.typicode.com/users/' + id + '/posts')
            .then(resp => resp.json())
            .then(posts => {
                postsDiv=appendElementWithClassAndInnertext(container,'div','posts');
                for (const post of posts) {
                    const {id, title} = post;
                    const postDiv=appendElementWithClassAndInnertext(postsDiv,'div','post');
                    appendElementWithClassAndInnertext(postDiv,'div','',`${id}. ${title}`);

                    const a =appendElementWithClassAndInnertext(postDiv,'a','','Details');
                    a.href = '../post-details/post-details.html?postData=' + JSON.stringify(post) + `&username=${username}`;
                    }
            })
    }
};







