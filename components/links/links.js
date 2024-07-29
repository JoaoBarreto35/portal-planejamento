const linksList = links.Links;

function createLink(type) {
    const linksContainer = document.getElementById("id-links-list");

    linksList.filter(item => item.tipo.includes(type)).map(item => {
        const myDiv = document.createElement("div");
        myDiv.className = "link";
        myDiv.dataset = "data-url=" + item.link;

        const icone = document.createElement("i");
        icone.className = item.icon;

        const text = document.createElement("p");
        text.textContent = item.nome;

        const aLink = document.createElement("a");
        aLink.href = item.link;
        aLink.target = "_blank";
        aLink.style.textDecoration ="none";


        myDiv.appendChild(icone);
        aLink.appendChild(text);

        myDiv.appendChild(aLink);

        linksContainer.appendChild(myDiv);
    });

}

createLink("");
const linksCreated = document.querySelectorAll(".link");

linksCreated.forEach(lnk => {
    lnk.addEventListener("click", function () {

    })
});
