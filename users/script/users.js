import {appendElementWithClassAndInnertext} from '../../functions/functions.js';

fetch('http://jsonplaceholder.typicode.com/users')
    .then(resp=>resp.json())
    .then(users=>{

        let container=document.getElementsByClassName('container')[0];
        for (const user of users) {
            const {id, name}=user;
            const divUser=appendElementWithClassAndInnertext(container,'div','user');
            appendElementWithClassAndInnertext(divUser,'h2','',`${id} ${name}`);
            const a=appendElementWithClassAndInnertext(divUser,'a','',);
            a.href='user-details/user-details.html?userdata='+JSON.stringify(user);

            let svgClone = document.querySelector('svg').cloneNode(true);
            svgClone.classList.remove('display-none');
            a.appendChild(svgClone);
        }
    });
