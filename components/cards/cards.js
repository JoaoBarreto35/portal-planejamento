//buscando o css
const linkCards = document.createElement('link');
linkCards.rel = 'stylesheet';
linkCards.href = './components/cards/cards.css';
document.head.appendChild(linkCards);

function createCard(Treinamento) {
    const card = document.createElement("div");
    card.className = "card";

    const cardTitle = document.createElement("div");
    cardTitle.className = "card-title";
    cardTitle.textContent = Treinamento.titulo;

    const cardSpan = document.createElement("div");
    cardSpan.className = "card-span";
    cardSpan.textContent = Treinamento.tipo + " >> " + Treinamento.categoria;

    const cardText = document.createElement("div");
    cardText.className = "card-text";
    cardText.textContent = Treinamento["texto breve"];

    const cardButton = document.createElement("button");
    cardButton.className = "card-button button-transparent";
    cardButton.textContent = "Veja Mais";
    cardButton.addEventListener("click",function(){
        localStorage.setItem("Item",Treinamento.titulo);
        window.location.href = "conteudo.html";
    });

    card.appendChild(cardTitle);
    card.appendChild(cardSpan);
    card.appendChild(cardText);
    card.appendChild(cardButton);


    return card;
}
function createListCategory(category, Treinamento) {
    const cardCategory = document.createElement("div");
    cardCategory.className = "cards-category";

    const titleCategory = document.createElement("h3");
    titleCategory.className = "cards-category-title";

    const barCategory = document.createElement("div");
    barCategory.className = "cards-category-bar";

    const cardsList = document.createElement("cards-list");


}
//type, category, title, text
function SearchFilterCard(text) {
    let count = 0;
    const cardList = document.getElementsByClassName('cards-list');
    for (let i = 0; i < cardList.length; i++) {
        Treinamentos.filter(Treinamento => Treinamento.titulo.toUpperCase().includes(text.toUpperCase()) || Treinamento.categoria.toUpperCase().includes(text.toUpperCase()) || Treinamento.tipo.toUpperCase().includes(text.toUpperCase())).map(Treinamento => {
            cardList[i].appendChild(createCard(Treinamento));
            count = count + 1;
        });
    }

    if (count === 0) {
        const notFound = document.createElement("p");
        notFound.textContent = "Resultado não encontrado para : " + text;
        cardList[0].appendChild(notFound);

    }
}


function plataformaCard() {
    const container = document.getElementById("container-card");
    const titleContainer = document.createElement("h1");
    titleContainer.className = "cards-title";

    
    const urldata = window.location.search;
    const urlParams = new URLSearchParams(urldata);
    const textPlataforma = urlParams.get('plataforma');

    console.log(textPlataforma);
    titleContainer.textContent = textPlataforma;
    container.appendChild(titleContainer);
    const type = textPlataforma;
    document.title = "Treinamentos "+type;
    let categories = [];

    Treinamentos.filter(Treinamento => Treinamento.tipo===type).map(Treinamento => {
        categories.push(Treinamento.categoria);
    });
    const categoryList = [...new Set(categories)];

    for (let i in categoryList) {

        const cardCategory = document.createElement("div");
        cardCategory.className = "cards-category";
        cardCategory.id = categoryList[i]; 

        const titleCategory = document.createElement("h3");
        titleCategory.className = "cards-category-title";
        titleCategory.textContent = categoryList[i];

        const barCategory = document.createElement("div");
        barCategory.className = "cards-category-bar";

        const cardsList = document.createElement("div");
        cardsList.className="cards-list";

        Treinamentos.filter(Treinamento => Treinamento.tipo===type && Treinamento.categoria===categoryList[i]).map(Treinamento => {
            cardsList.appendChild(createCard(Treinamento));
        });

        cardCategory.appendChild(titleCategory);
        cardCategory.appendChild(barCategory);
        cardCategory.appendChild(cardsList);

        container.appendChild(cardCategory);
    }



}
plataformaCard();