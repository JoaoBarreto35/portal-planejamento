function create_main() {

    const linkmain = document.createElement('link');
    linkmain.rel = 'stylesheet';
    linkmain.href = './components/main/main.css';
    document.head.appendChild(linkmain);
    const mainContainer = document.getElementById("main-container");


    mainContainer.innerHTML = `
    <label class="burger" for="burger">
                <input type="checkbox" id="burger">
                <span></span>
                <span></span>
                <span></span>
                </label>
                <nav class="menu-column" id="menu-column">
                    <ul>
                        <div class="div-itens">
                            <a class="goToPage" href="index.html">
                                <li>Home</li>
                            </a>
                        </div>
                        <div class="div-itens">
                            <a>
                                <li class="sub-menu-father">Treinamentos <i class="fa-solid fa-angle-down"></i>
                                    <ul class="sub-menu-children">
                                        <li class="li-redirect">Embraer</li>
                                        <li class="li-redirect">Fracttal</li>
                                        <li class="li-redirect">Interno</li>
                                        <li class="li-redirect">SAP</li>
                                    </ul>
                                </li>
                            </a>
    
                        </div>
                        <div class="div-itens">
                            <a class="goToPage" href="index.html#links">
                                <li>Links</li>
                            </a>
    
                        </div>
                        <div class="div-itens">
                            <a>
                                <li>PDI</li>
                            </a>
    
                        </div>
                        <div class="div-itens">
                            <a class="goToPage" href="indicadores.html">
                                <li>Indicadores</li>
    
                            </a>
    
                        </div>
    
                    </ul>
                </nav>
            `




}

create_main();




const subItens = document.getElementsByClassName("li-redirect");

Array.from(subItens).forEach(function (item) {
    item.addEventListener("click", function () {
        toggleMenu();
        window.location.href = `plataforma.html?plataforma=${encodeURIComponent(this.textContent)}`;
    })
});

const goToPage = document.getElementsByClassName("goToPage");

Array.from(goToPage).forEach(function (item) {
    item.addEventListener("click", function () {
        toggleMenu();
        
    })
});

const subMenus = document.getElementsByClassName("sub-menu-father");

// Convertendo a HTMLCollection em um array
Array.from(subMenus).forEach(function (item) {
    item.addEventListener('click', function () {
        openSubMenu(item);
    });
});


const burger = document.getElementById("burger");

burger.addEventListener('change', function (item) {
    toggleMenu();
});


function toggleMenu() {
    const menuColumn = document.getElementById("menu-column");
    if (menuColumn.style.width === "29vh") {
        menuColumn.style.width = "0";
        menuColumn.style.borderLeft = "none";
        const backMenu = document.getElementById("BackMenu");
        backMenu.remove();
        burger.checked = false;

    } else {
        menuColumn.style.width = "29vh";
        menuColumn.style.borderLeft = "1px solid var(--color-primary)";
        const backMenu = document.createElement("div");
        backMenu.id = "BackMenu";
        backMenu.className = "BackMenu";
        backMenu.addEventListener('click', function () {
            toggleMenu();
        })
        document.body.appendChild(backMenu);
        burger.checked = true;
    }

}


function openSubMenu(element) {
    const item = element.children[1];
    const downIcon = element.children[0];
    var qtd = item.childElementCount;

    if (item.offsetHeight === 0) {
        item.style.height = `calc((1.25rem + 30px) * ${qtd})`;
        element.style.backgroundColor = "var(--color-background-secondary)";
        downIcon.classList.remove("fa-angle-down");
        downIcon.classList.add("fa-angle-up");


    } else {
        item.style.height = "0";
        element.style.backgroundColor = "transparent";
        downIcon.classList.remove("fa-angle-up");
        downIcon.classList.add("fa-angle-down");


    }
}
