//buscando o css
const linkHeader = document.createElement('link');
linkHeader.rel = 'stylesheet';
linkHeader.href = './components/header/header.css';
document.head.appendChild(linkHeader);

//gerando o header no <header id="header"></header>
document.getElementById('header').innerHTML = `
<div class="side">
    <img id="logo_menu" src="RIP - logo - branco.png" alt="Logo RIP">
    <div class="pesquisar">
        <input id="pesquisarHeader" type="text" class="pesquisar" placeholder="Pesquisar Treinamentos...">
        <i id="searchIcon" class="fa-solid fa-magnifying-glass"></i>
    </div>
</div>
<div class="side" id="main-container">

</div>
`;


