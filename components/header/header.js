//buscando o css
const linkHeader = document.createElement('link');
linkHeader.rel = 'stylesheet';
linkHeader.href = './components/header/header.css';
document.head.appendChild(linkHeader);

//gerando o header no <header id="header"></header>
document.getElementById('header').innerHTML = `
<div class="side">
    <img id="logo_menu" src="RIP - logo - branco.png" alt="Logo RIP" >
    <div class="pesquisar">
        <input id="pesquisarHeader" type="text" class="pesquisar" placeholder="Pesquisar...">
        <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
    </div>
</div>
<div class="side">
    <nav>
        <a href="index.html" >Home</a>
        <div class="sub-father" >Treinamentos
            <ul class="sub-menu">
                <li>Embraer</li>
                <li>Fracttal</li>
                <li>Interno</li>
                <li>SAP</li>
                
            </ul>
        </div>
        <a href="index.html#links">Links</a>
        <a>PDI</a>
    </nav>
</div>
`;


const subItens = document.querySelectorAll("li");

subItens.forEach(item => {
    item.addEventListener("click", function () {
        window.location.href = `plataforma.html?plataforma=${encodeURIComponent(this.textContent)}`;
    })
});

