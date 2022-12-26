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
export {appendElementWithClassAndInnertext, userObjectToDiv};