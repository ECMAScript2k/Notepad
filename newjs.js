
//////// Sat Sep 17 2022 13:30:52 GMT+0530 (India Standard Time)
const textarea=document.getElementById("textarea");
const checkbox=document.getElementById("checkbox");
const filename=document.getElementById("filename")
const ul=document.getElementById("ul")

var opened;
const notepad=document.querySelector(".notepad")
notepad.hidden=true    //-------------------------------------

console.log(textarea.value)         //notelist=  innertext    time

function opennote(e){
    notepad.hidden=false;
       if(opened)
       opened.id="closed"
    opened=e.target
       opened.id="opened"
    // console.log(`${e.target.attributes.time.value}`)
    textarea.value=localStorage.getItem(e.target.attributes.time.value)
    filename.value=e.target.innerText
    
    // const valuefrommemory=localStorage.getItem(e.target.time);
    // textarea.value=valuefrommemory
}


function renderlist(){
    x.forEach(element => {
        // console.log("runn")
        const newli=document.createElement("li");
        newli.className="list";
        newli.innerText=element.innertext
        newli.setAttribute("time",element.time);
        newli.addEventListener('click',opennote);
        newli.id="closed"
        ul.appendChild(newli)
    });

}

// console.log(timenow)

if(!localStorage.getItem("notelist")){
    // console.log("not found")
    var timenow=new Date;
    timenow=timenow.getTime()
    localStorage.setItem("notelist",JSON.stringify([{"innertext":"demo","time":timenow}]))
    localStorage.setItem(timenow,"demo note")
}

    x=JSON.parse(localStorage.getItem("notelist"))
    // console.log(x[0])
    renderlist();

function addnewnote(){
    newnote=document.createElement("li")
    // const timenow=new Date;
    var timenow=new Date;
    timenow=timenow.getTime()
    newnote.setAttribute("time",timenow)
    newnote.className="list"
    newnote.addEventListener('click',opennote);
    newnote.innerText="new..."
    newnote.id="closed"
    x[x.length]={"innertext":"new...","time":timenow}
    ul.appendChild(newnote)
    localStorage.setItem("notelist",JSON.stringify(x))
    localStorage.setItem(timenow,"write here")
}
// console.log(checkbox.checked)
function updatenote(e){
    if(checkbox.checked){
        console.log(opened.attributes.time)
       localStorage.setItem(opened.attributes.time.value,textarea.value)
    }
}

function rename(){
    filename.disabled=false
    filename.focus()
}

function focusout(){
     openedtime=opened.attributes.time.value
    //  console.log(filename.value)
     x.forEach(element=>{
        if(element.time==openedtime){
            element.innertext=filename.value
        }
     })
     localStorage.setItem("notelist",JSON.stringify(x))

     str='[time="'+openedtime+'"]'
     const tochange=document.querySelector(str)
     tochange.innerText=filename.value
    }
function deletenote(){
    // console.log(opened)
    ul.removeChild(opened)
    notepad.hidden=true
    openedtime=opened.attributes.time.value
    localStorage.removeItem(openedtime)
    x=x.filter(element=>element.time!=openedtime)
    localStorage.setItem("notelist",JSON.stringify(x))

}
function download(){
    const a=document.createElement('a')
    a.href=`data:text/plain,${textarea.value}`;
    a.download=`${filename.value}.txt`
    document.body.appendChild(a)
    a.click()
}