// Part 1: Number Facts
// 1.
function favoriteNumber(number = 1) {
  let url = `http://numbersapi.com/${number}?json`;

  let promise = axios.get(url);
  promise.then((res) => {
    console.log(res.data.text);
  });
}

// 2.
function favoriteMultipleNumberData(numbers = [1, 2, 3, 911, 30322]) {
  let promiseArray = [];
  for (let i = 0; i < numbers.length; i++) {
    promiseArray.push(axios.get(`http://numbersapi.com/${numbers[i]}?json`));
  }

  const div = document.querySelector("#numberfacts");
  const makeUl = document.createElement("ul");
  div.append(makeUl);
  const ul = document.querySelector("ul");

  Promise.all(promiseArray).then((promiseArray) => {
    promiseArray.forEach((promise) => {
      const li = document.createElement("li");
      li.textContent = promise.data.text;
      ul.append(li);
    });
  });
}

// 3.
function get4Facts(number = 4) {
  const div = document.querySelector("#numberfacts");
  const makeUl = document.createElement("ul");
  div.append(makeUl);
  const ul = document.querySelector("ul");

  let promiseArray = [];
  for (let i = 0; i < 4; i++) {
    promiseArray.push(axios.get(`http://numbersapi.com/${number}?json`));
  }

  Promise.all(promiseArray).then((promiseArray) => {
    promiseArray.forEach((promise) => {
      const li = document.createElement("li");
      li.textContent = promise.data.text;
      ul.append(li);
    });
  });
}

// Part 2: Deck of Cards
// 1.
function drawCard() {
  let deckId;

  let deck = axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  deck.then((res) => {
    deckId = res.data.deck_id;

    let card = axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    card.then((res) => {
      const card = res.data.cards[0];
      console.log(`${card.value} of ${card.suit}`);
    });
  });
}

// 2.
function draw2Cards() {
  let deckId;

  let deck = axios.get(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  deck.then((res) => {
    deckId = res.data.deck_id;

    let firstDraw = axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );

    firstDraw.then((res) => {
      let card1 = res.data.cards[0];

      let secondDraw = axios.get(
        `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
      );
      secondDraw.then((res) => {
        let card2 = res.data.cards[0];

        console.log(`${card1.value} of ${card1.suit}`);
        console.log(`${card2.value} of ${card2.suit}`);
      });
    });
  });
}

// 3.
let button = document.querySelector(".button");
let table = document.querySelector(".table");
let deckId;

axios
  .get("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
  .then((res) => {
    deckId = res.data.deck_id;
  });

button.addEventListener("click", function () {
  axios
    .get(`http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((res) => {
      if (res.data.remaining != 0) {
        const card = res.data.cards[0];

        const image = document.createElement("img");
        image.src = res.data.cards[0].image;
        table.appendChild(image);

        console.log(`${card.value} of ${card.suit}`);
      } else {
        const warning = document.createElement("h1");
        warning.innerText = "No more cards!!";
        table.appendChild(warning);

        console.log("No more cards!");
      }
    });
});
