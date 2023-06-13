// Number Facts
// Part 1.1
async function favoriteNumberFact(){
    const {data} = await axios.get('http://numbersapi.com/16/trivia?json')
    console.log(data.text)

}

favoriteNumberFact()

// Part 1.2 & 1.3

async function fourFavoriteNumberFact(){
    const {data} = await axios.get('http://numbersapi.com/16,12,10,98/trivia?json');
    console.log(data)
    for (let key in data) {
        const numberFact = data[key];
        $("#number-facts").append(`<p>${numberFact}</p>`);
    }
}

fourFavoriteNumberFact()

// Deck of Cards
// Part 2.1


async function getCardFromNewDeck(){
    const {data} = await axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
    const card = data.cards[0];
        console.log(`${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`)
}

getCardFromNewDeck()

// Part 2.2
async function getTwoCardFromSameDeck(){
    const cardOnePromise = axios.get("https://deckofcardsapi.com/api/deck/new/draw/?count=1")
    const cardTwoPromise = axios.get(`https://deckofcardsapi.com/api/deck/new/draw/?count=1`);

    
    const card1 = (await cardOnePromise).data.cards[0]
    const card2 = (await cardTwoPromise).data.cards[0]

    console.log(`${card1.value.toLowerCase()} of ${card1.suit.toLowerCase()}`);
    console.log(`${card2.value.toLowerCase()} of ${card1.suit.toLowerCase()}`);
}

getTwoCardFromSameDeck()


// Part 2.3: Deck of Cards
async function getDeckId(){
    const deck_id = (await axios.get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")).data.deck_id
    return deck_id

}

async function drawCard(deck_id){
    const card = (await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)).data.cards[0]
    return `<img src="${card.images.png}" alt="${displayCard(card.value, card.suit)}" srcset="">`

}


$(async function () {
    const deck_id = await getDeckId()

    $("#draw-btn").on("click", async function () {
        const $cardsDiv = $("#cards");
        $cardsDiv.html(await drawCard(deck_id))
    });
});


// Helper function
function displayCard(value, suit) {
    return `${value.toLowerCase()} of ${suit.toLowerCase()}`;
}