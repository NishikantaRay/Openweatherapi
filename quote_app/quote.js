const quote = document.getElementById("quotes");

const author =document.getElementById("author");

const newQ =document.getElementById("newQ");

const tweetMe =document.getElementById("tweetme");

let realData ="";

let quotesData ="";

//tweet a quotes
const tweet =()=>{
    let tweetpost =`https://twitter.com/intent/tweet?text=${quotesData.text} ${quotesData.author}`;
    window.open(tweetpost);
};

//get new quotes
const getnewQuotes=()=>{
    let rnum = Math.floor(Math.random()*100);
    quotesData =realData[rnum];
    // console.log(rnum);
    // console.log(realData[rnum].text);
    quote.innerText =  `" ${quotesData.text} "`;
    quotesData==null ? (author.innerText = Unkown):(author.innerText=`-${quotesData.author}`);
    // author.innerText =  `${realData[rnum].author}`;
};

//get quotes
const getQuotes = async () => {
    const api ="https://type.fit/api/quotes";
    try {   
        let data = await fetch(api);
        realData = await data.json();
        getnewQuotes();
        // console.log(realData[10].text);
        // console.log(realData[10].author);
    } catch (error) {
        console.log(error);
    }
};

//add eventlistner for button
tweetMe.addEventListener("click",tweet);

newQ.addEventListener("click",getnewQuotes);

getQuotes();
