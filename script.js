const quoteContainer=document.getElementById('quote-container');
const quoteText=document.getElementById('quote');
const authorText=document.getElementById('author');
const twitterBtn=document.getElementById('twitter');
const newQuoteBtn=document.getElementById('new-quote');
const loader=document.getElementById('loader');

// Show Loading

function loading(){
	loader.hidden=false;
	quoteContainer.hidden=true;
}

// Hide Loading
function complete(){
	if(!loader.hidden){
		quoteContainer.hidden = false;
		loader.hidden = true;
	}
}

// Get Quote From API

async function getQuote() {
	loading(); //Show Loader first
	const proxyURL = 'https://guarded-everglades-00643.herokuapp.com/'
	const apiURL ='http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
	try{
		const response = await fetch(proxyURL + apiURL);
		const data = await response.json();

		// if Author is blank then add 'Unknow'
		if (data.quoteAuthor===''){
			authorText.innerText='Unknown';
		} else{
			authorText.innerText = data.quoteAuthor;
		}

		// Reduce font size for looong quotes
		if (data.quoteText.lenght > 120){
			quoteText.classList.add('long-quote');
		} else{
			quoteText.classList.remove('long-quote');
		}
		
		quoteText.innerText = data.quoteText;
		// Stop Loader, and Show Quote
		complete();

	}catch(error){
		// getQuote();
		
	}
}

// Tweet Quote
const tweetQuote = ()=>{
	const quote = quoteText.innerText;
	const author = authorText.innerText;
	const twitterURL = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
	window.open(twitterURL,'_blank');
}

// Event Listner
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

//On Load
getQuote();
