const typingText=document.querySelector(".typing-text p"),
 inpField = document.querySelector(".wrapper .input-field"),
 timeTag = document.querySelector(".item span b"),
 wpmTag = document.querySelector(".WPM span b"),
 cpmTag = document.querySelector(".CPM span b"),
 mistakeTag = document.querySelector(".Mistake span"),
 tryAgainBtn = document.querySelector("button");
 let timer,
 maxTime = 60,
 timeleft = maxTime,
 charIdex = Mistakes= isTyping = 0;
function randomParagraphs(){
    let randIdex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML ="";

    paragraphs[randIdex].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}
randomParagraphs();
inpField.addEventListener("input",initTyping);

function initTyping() {
    const characters = typingText.querySelectorAll("span");
    let typechar = inpField.value.split("")[charIdex];
    if(charIdex < characters.length -1 && timeleft >0){
        if(!isTyping){
            timer = setInterval(initTimer,1000);
            isTyping = true;
        }
    
        if(typechar == null){
            charIdex--;
            if(Mistakes>0){
                Mistakes--;
            }
            characters[charIdex].classList.remove("correct","incorrect");
    
        }else{
            if(characters[charIdex].innerText==typechar){
                characters[charIdex].classList.add("correct");
            }
            else{
                Mistakes=Mistakes+1;
                characters[charIdex].classList.add("incorrect");
            }
            charIdex++;
    
        }
        
        characters.forEach(span => span.classList.remove("active"))
        characters[charIdex].classList.add("active");
        mistakeTag.innerText = Mistakes;
        let wpm = Math.round((((charIdex - Mistakes) / 5) / (maxTime - timeleft))* 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 :wpm; 
        wpmTag.innerText = wpm;
        cpmTag.innerText = charIdex - Mistakes;

    }
    else{
        inpField.value=" ";
        clearInterval(timer);

    }

}
function initTimer(){
    if(timeleft >0){
        timeleft--;
        timeTag.innerText = timeleft;
    }
    else{
        clearInterval(timer);
    }
}
function resetGame(){
    randomParagraphs();
    inpField.value ="";
    clearInterval(timer);
    maxTime = 60,
    timeleft = maxTime,
    charIdex = Mistakes= isTyping = 0;
    timeTag.innerText = timeleft;
    wpmTag.innerText = 0;
    cpmTag.innerText = 0;


}
tryAgainBtn.addEventListener("click", resetGame);
