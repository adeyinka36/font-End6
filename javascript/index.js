

const qwerty = document.getElementById("qwerty");
const phraseDiv = document.getElementById("phrase");
const overlay = document.getElementById("overlay");
const reset = document.getElementsByClassName("btn__reset")[0];
const phraseList= document.getElementById("phraseList");
let missed =0;
const phrases=[
    "it is never too late",
    "life is good",
    "live your life",
    "never give up",
    "live and let live"
]
// getting a random phrase 
const randomArry= phrases[Math.floor(Math.random()*4)]


reset.addEventListener("click",()=>overlay.style.visibility="hidden");


function getRandomPhraseAsArray(array){
    console.log(array)
    return array.split('')

}


// adding phrase to display with approprait class
function addPhraseToDisplay(phrase){
    console.log(phrase)
    for(let i=0;i<phrase.length;i++){
        if(phrase[i]!==" "){
            const node=document.createElement('LI');
            const text=document.createTextNode(phrase[i])
            node.appendChild(text)
            node.classList.add("letter")
            phraseList.appendChild(node)
        }
        else{
            const node=document.createElement('LI');
            const text=document.createTextNode(phrase[i])
            node.appendChild(text)
            node.classList.add("space")
            phraseList.appendChild(node)
        }
    }
}


function checkLetter(letter){
    let letters= document.getElementsByClassName("letter")
let result=[]

    for (let i=0;i<letters.length;i++){
        if(letters[i].innerText===letter){
           
            letters[i].classList.add("show")
            letters[i].style.transitionDuration=".2s"
            letters[i].style.transform="rotate(360deg)"
             result.push(letters[i])
            
        }
       
    }
    console.log(result)
    if(result.length){return result}
    else{return null}
}


// adding event listener when online keyboard is clicked
qwerty.addEventListener("click",(e)=>{
    
    if(e.target.tagName==="BUTTON"){
    e.target.className="chosen";

let letterFound= checkLetter(e.target.innerText)

    console.log(e.target.innerText)
     if(!letterFound){
         
         const  tries=document.getElementsByClassName("tries");
        tries[missed].firstElementChild.src="images/lostHeart.png"
         missed++
         
     }
     
     checkWin()
     
    }
})

// creating  and styling reoad button
const reload= document.createElement('Button');
reload.style.display="inline-block"
reload.style.width= "10vw"
reload.className="btn_reset";
reload.innerText="Play again";
reload.style.alignSelf="center"


// addding a reload event handler to reload button and making necesarry changes 
reload.addEventListener("click",()=>{
  console.log(phraseList)
     missed=0;

     qwerty.innerHTML=`<div class="keyrow">
     <button>q</button><button>w</button><button>e</button><button>r</button><button>t</button><button>y</button><button>u</button><button>i</button><button>o</button><button>p</button>
   </div>
   <div class="keyrow">
     <button>a</button><button>s</button><button>d</button><button>f</button><button>g</button><button>h</button><button>j</button><button>k</button><button>l</button>
   </div>
   <div class="keyrow">
     <button>z</button><button>x</button><button>c</button><button>v</button><button>b</button><button>n</button><button>m</button>
   </div>`

  const ran= phrases[Math.floor(Math.random()*4)]
   const newArray= getRandomPhraseAsArray(ran);
   addPhraseToDisplay(newArray)
   overlay.style.visibility="hidden"


})



// fuunction to check for winner

function checkWin(){
    const letters= document.getElementsByClassName("letter");
    const shown= document.getElementsByClassName("show");

    if(shown.length===letters.length){
      phraseList.innerHTML=""
        reset.style.display="none";
        overlay.classList.add("win");
        overlay.appendChild(reload)
        overlay.style.visibility="visible"
        
    }
    else if (missed >=5){
       phraseList.innerHTML=""
      overlay.firstElementChild.innerText="You Win!"
      reset.style.display="none"
      overlay.classList.add("lose");
      overlay.appendChild(reload)
      overlay.style.visibility="visible";
    }
    
}



// showing hidden phrase on the scree
const phraseArray = getRandomPhraseAsArray(randomArry);
addPhraseToDisplay(phraseArray)
