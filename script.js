const gameBord = document.getElementById('gameBoard')
const cards = [
    'https://picsum.photos/id/237/100/100', 
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];

let selectCards = [];

function createCard (cardUrl){
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = cardUrl;
    
    const cardContent = document.createElement('img');
    cardContent.classList.add('cardContent');
    cardContent.src = `${cardUrl}`;
    
    card.appendChild(cardContent);
    
    card.addEventListener("click", onCardClick)
    return card;
}

function duplicateArray(arraySimple) {
    let arrayDouble = [];
    arrayDouble.push(...arraySimple);
    arrayDouble.push(...arraySimple);
    return arrayDouble;
};

function shuffleArray(arrayToShuffle){
    const arrayShuffled = arrayToShuffle.sort(()=> 0.5 - Math.random());
    return arrayShuffled;
}

let allCards = duplicateArray(cards);
//melanger le tableau
allCards = shuffleArray(allCards)
allCards.forEach(card => {
    const cardHtml = createCard(card)
    gameBord.appendChild(cardHtml);
})

function onCardClick(e){
    const card = e.target.parentElement;
    card.classList.add("flip");
    

    selectCards.push(card);
    if(selectCards.length === 2){
        setTimeout(() => {
            if(selectCards[0].dataset.value === selectCards[1].dataset.value){
                //on a trouvé une paire
                selectCards[0].classList.add("matched");
                selectCards[1].classList.add("matched");
                selectCards[0].removeEventListener("click", onCardClick);
                selectCards[1].removeEventListener("click", onCardClick);

                const allCardNotFinded = document.querySelectorAll('.card:not(.matched)');
                console.log(allCardNotFinded.length)
                    if(allCardNotFinded.length == 0){
                    //Le joueur a gagné
                    alert('Bravo, vous avez gagné');
                    }
            }
            else{
                //on s'est trompé
                selectCards[0].classList.remove("flip");
                selectCards[1].classList.remove("flip");
            }
            selectCards = [];
        }, 500);
    }
}



