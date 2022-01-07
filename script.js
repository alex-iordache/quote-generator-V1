const apiUrl = `https://type.fit/api/quotes`;
let quotes = [];

const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector(".quote-author");
const twitterBtn = document.querySelector(".twitterBtn");
const newQuoteBtn = document.querySelector(".newQuoteBtn");
const loader = document.querySelector(".loader");

const getQuotes = function () {
  loading();
  const xhr = new XMLHttpRequest();
  xhr.open("get", `https://type.fit/api/quotes`);
  xhr.onload = function () {
    if (this.status === 200) {
      quotes = JSON.parse(this.responseText);
      newQuote();
      complete();
    } else {
      console.log(this);
    }
  };
  xhr.send();
};

const newQuote = function () {
  const quote = quotes[Math.trunc(Math.random() * quotes.length)];
  quoteText.textContent = quote.text;
  if (quote.text.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  if (quote.author) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = "Unknown";
  }
};

newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", function () {
  window.open(
    `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`,
    "_blank"
  );
});

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}
getQuotes();
