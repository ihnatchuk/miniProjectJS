let url = new URL(location.href);
let user = JSON.parse(url.searchParams.get('userdata'));
const {id, username}=user;

function appendElementWithClassAndInnertext(ancestor, tag, className, innerText){
    const element = document.createElement(tag);
    if (className){
        element.classList.add(className);
    }
    element.innerText=innerText||'';
    ancestor.appendChild(element);
    return element;
}
function userObjectToDiv(uncestor, user){
    const capitalize=(str)=>str[0].toUpperCase()+str.slice(1);
    function objToDiv(user,level){
        for (const userKey in user) {
            if (typeof user[userKey]==='object') {
                appendElementWithClassAndInnertext(uncestor,'div',`level${level}`,`${capitalize(userKey)}:`);
                const innerObj = user[userKey];
                //let nextLevel=level+1;
                objToDiv(innerObj,level+1);//nextLevel//);
            } else{
                appendElementWithClassAndInnertext(uncestor,'div',`level${level}`,`${capitalize(userKey)}: ${user[userKey]}`);
            }
        }
    }
    objToDiv(user,1)
}

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







