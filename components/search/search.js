document.addEventListener('DOMContentLoaded', (event) => {
    const Ssearch = document.getElementById('searchIcon');
    Ssearch.addEventListener('click', redirect);
});
document.addEventListener('DOMContentLoaded', (event) => {
    const Sinput = document.getElementById('pesquisarHeader');
    Sinput.addEventListener('keydown', (event => {
        if (event.key === "Enter") {
            redirect();
        };
    }));
});


function redirect() {
    const searchValue = document.getElementById('pesquisarHeader').value;
    window.location.href = `pesquisar.html?search=${encodeURIComponent(searchValue)}`;

}
