//criando terminal
//buscando o css
const linkTerminal = document.createElement('link');
linkTerminal.rel = 'stylesheet';
linkTerminal.href = './components/terminal/terminal.css';
document.head.appendChild(linkTerminal);


//inserindo o terminal no html
document.getElementById('terminal').innerHTML = `
    <div id="conversation">
        <div class="conversation-left">
            <p>Olá, Bem vindo! Me chamo João.<br>Em qual das opções abaixo mais se encaixa o que você
            deseja?</p>
        </div>
    </div>
`;

//funções terminal

function insertButton(element, response, filterName, variable) {

    let list = [];

    Treinamentos.filter(Treinamento => Treinamento[filterName].includes(variable)).map(Treinamento => {
        list.push(Treinamento[response]);
    });

    list = [...new Set(list)];
    const mydiv = document.createElement("div");
    mydiv.className = "conversation-right";

    // const mybutton = document.createElement("button");
    // mybutton.className = "button-terminal";
    // mybutton.textContent = list;

    for (const item in list) {
        const mybutton = document.createElement("button");
        mybutton.className = "button-terminal button-terminal-" + response;
        mybutton.textContent = list[item];

        mydiv.appendChild(mybutton);
    }
    element.appendChild(mydiv);
}
function insertLink(element, type, category) {

    const mydiv = document.createElement("div");
    mydiv.className = "conversation-left";

    let listApoio = [];
    let max = 0;
    Treinamentos.filter(Treinamento => Treinamento.tipo.includes(type) && Treinamento.categoria.includes(category)).map(Treinamento => {
        listApoio.push(Treinamento.titulo);
    });

    if (listApoio.length > 3) {
        max = 3;
    }
    else {
        max = listApoio.length;
    }

    Treinamentos.filter(Treinamento => Treinamento.tipo.includes(type) && Treinamento.categoria.includes(category)).slice(0, max).map(Treinamento => {
        const addLinks = document.createElement("a");
        addLinks.textContent = Treinamento.titulo + "; ";
        addLinks.addEventListener("click", function () {
            localStorage.setItem("Item", Treinamento.titulo);
            window.location.href = "conteudo.html";
        });
        mydiv.appendChild(addLinks);

    });
    element.appendChild(mydiv);



}
function newChat() {
    const chat = document.getElementById("conversation");
    const msg = document.createElement("div");
    msg.className = "conversation-right"
    const btn = document.createElement("button");
    btn.className = "button-terminal";
    btn.textContent = "Voltar ao inicio";
    btn.addEventListener("click",function (){
        cleanChat();
    });


    msg.appendChild(btn);
    chat.appendChild(msg);

    
}
function cleanChat() {
    const div = document.getElementById('terminal');
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    document.getElementById('terminal').innerHTML = `
    <div id="conversation">
        <div class="conversation-left">
            <p>Olá, Bem vindo! Me chamo João.<br>Em qual das opções abaixo mais se encaixa o que você
            deseja?</p>
        </div>
    </div>
`;
    var chat = document.getElementById("conversation");
    insertButton(chat, "tipo", "tipo", "");
    const botoes = document.querySelectorAll(".button-terminal-tipo");

    // Adiciona o evento de clique a cada botão
    botoes.forEach(botao => {
        botao.addEventListener("click", function () {


            const chat = document.getElementById("conversation");

            const msgPadrao = document.createElement("div");
            msgPadrao.className = "conversation-left";

            const texto = document.createElement("p");
            texto.textContent = "Ótimo! Escolha entre as categorias inclusas em " + this.textContent;

            msgPadrao.appendChild(texto);
            chat.appendChild(msgPadrao);

            insertButton(chat, "categoria", "tipo", this.textContent);
            linkCategorias(this.textContent);
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var chat = document.getElementById("conversation");
    insertButton(chat, "tipo", "tipo", "");
})
document.addEventListener("DOMContentLoaded", function () {
    // Seleciona todos os elementos com a classe "button-terminal-type"
    const botoes = document.querySelectorAll(".button-terminal-tipo");

    // Adiciona o evento de clique a cada botão
    botoes.forEach(botao => {
        botao.addEventListener("click", function () {


            const chat = document.getElementById("conversation");

            const msgPadrao = document.createElement("div");
            msgPadrao.className = "conversation-left";

            const texto = document.createElement("p");
            texto.textContent = "Ótimo! Escolha entre as categorias inclusas em " + this.textContent;

            msgPadrao.appendChild(texto);
            chat.appendChild(msgPadrao);

            insertButton(chat, "categoria", "tipo", this.textContent);
            linkCategorias(this.textContent);
        });
    });
});

function linkCategorias(old) {
    // Seleciona todos os elementos com a classe "button-terminal-type"
    const btns = document.querySelectorAll(".button-terminal-categoria");
    console.log(btns);
    // Adiciona o evento de clique a cada botão
    btns.forEach(botao => {
        botao.addEventListener("click", function () {


            const chat = document.getElementById("conversation");

            const msgPadrao = document.createElement("div");
            msgPadrao.className = "conversation-left";

            const texto = document.createElement("p");
            texto.textContent = this.textContent + "? Interessante. Aqui estão alguns títulos sobre o tema:";
            msgPadrao.appendChild(texto);


            chat.appendChild(msgPadrao);
            insertLink(chat, old, this.textContent);


            // insertButton(chat, "categoria","tipo",this.textContent);    
            const msgPadrao2 = document.createElement("div");
            msgPadrao2.className = "conversation-left";

            const texto2 = document.createElement("p");
            const msgToPlat = document.createElement("a");
            let apoio = this.textContent;
            msgToPlat.addEventListener("click", function () {
                window.location.href = `plataforma.html?plataforma=${encodeURIComponent(old)}#${apoio}`;
            })
            msgToPlat.textContent = old + ">>" + this.textContent;
            texto2.textContent = "Caso não seja o que você procura, recomendo ir até a página ";
            msgPadrao2.appendChild(texto2);
            msgPadrao2.appendChild(msgToPlat);
            chat.appendChild(msgPadrao2);
            newChat();
        });
    });
};