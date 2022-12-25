let url = new URL(location.href);
let user = JSON.parse(url.searchParams.get('userdata'));
const {id, username}=user;

const container=document.querySelector('.container')
const divUser = document.createElement('div');
divUser.classList.add('user');
container.appendChild(divUser);

const capitalize=(str)=>str[0].toUpperCase()+str.slice(1);
function userObjectKeysToDiv(user,level){
    for (const userKey in user) {
        if (typeof user[userKey]==='object') {
            const divKey = document.createElement('div');
            divKey.classList.add(`level${level}`);
            divKey.innerText = `${capitalize(userKey)}:`;
            divUser.appendChild(divKey);
            const innerObj = user[userKey];
            let nextLevel=level+1;
            userObjectKeysToDiv(innerObj,nextLevel);
        } else{
            const divKey = document.createElement('div');
            divKey.classList.add(`level${level}`);
            divKey.innerText = `${capitalize(userKey)}: ${user[userKey]}`;
            divUser.appendChild(divKey);
        }
    }
}
userObjectKeysToDiv(user,1);

const button = document.createElement('button');
const a = document.createElement('a');
button.innerText = 'Posts of current user';
container.appendChild(button);

button.onclick = () => {
    let postsDiv = document.getElementsByClassName('posts')[0];
    if (!postsDiv) {
        fetch('https://jsonplaceholder.typicode.com/users/' + id + '/posts')
            .then(resp => resp.json())
            .then(posts => {
                    postsDiv = document.createElement('div');
                    postsDiv.classList.add('posts');
                    const container = document.querySelector('.container');
                    container.appendChild(postsDiv);

                    for (const post of posts) {
                        const {id, title} = post;
                        const postDiv = document.createElement('div');
                        postDiv.classList.add('post');

                        const postTitle = document.createElement('div');
                        postTitle.innerText = `${id}. ${title}`;

                        const a = document.createElement('a');
                        a.href = '../post-details/post-details.html?postData=' + JSON.stringify(post) + `&username=${username}`;
                        a.innerText = 'Details';

                        postDiv.append(postTitle, a);
                        postsDiv.appendChild(postDiv);
                    }
            })
    }

};







