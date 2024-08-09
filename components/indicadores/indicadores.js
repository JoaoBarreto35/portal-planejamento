const linkindicadores = document.createElement('link');
linkindicadores.rel = 'stylesheet';
linkindicadores.href = './components/indicadores/indicadores.css';
document.head.appendChild(linkindicadores);



async function getLinesApi(apiEndpoint, token) {
    try {
        const response = await fetch(apiEndpoint, {
            method: 'GET',
            headers: {
                'Authorization': token // Codifica as credenciais em base64
            }
        });

        if (!response.ok) {
            throw new Error('Erro na requisição: ' + response.statusText);
        }

        const data = await response.json();
        return data["data"];
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

// Exemplo de uso
function filter_site(data, site) {
    return data.filter(item => item.parent_description.includes(site)).length;
}
async function backlog() {
    const feedBack = document.getElementById("feedback-backlog");

    //config api
    const apiEndpoint = "https://app.fracttal.com/api/work_requests/?id_status=";
    const paramsBacklog = ["1", "2", "3", "7", "8", "9", "10", "11"];
    const sites = ["SJK", "EDE", "TTE", "GPX", "BOT", "EUG"];
    const tokens = ["Basic cHZDYjdrb1NFVDZkUHFMNlJVYUI6UU5wWTZNcjdZeVBsRVBGSXB2T2QxbmFwb2I2TmgySXlXd0p5VUhpdzNISFg5cklmdklieDBpVA==", "Basic cTNWSlhiRVJkR1ZwRFpDbDJ3czpMUk5Mb0Z6Nndqc0FYQmVTUzV4YjBjbWZGY2xUS1RJeUNZUUdFN1pGNG5ZMDRrNkNKVmt2WkQ="]
    let jsonData = [];

    //pegando o backlog
    feedBack.textContent = "Carregando Chamados em aberto..."
    for (let i = 0; i < paramsBacklog.length; i++) {

        jsonData = jsonData.concat(await getLinesApi(apiEndpoint + paramsBacklog[i], tokens[0]));
        jsonData = jsonData.concat(await getLinesApi(apiEndpoint + paramsBacklog[i], tokens[1]));
        console.log(jsonData);
        feedBack.textContent = "Carregando " + jsonData[jsonData.length - 1].requests_x_status_description + "...";

    }
    for (let i = 0; i < sites.length; i++) {
        feedBack.textContent = "Gerando " + sites[i];
        console.log(sites[i] + jsonData.filter(item => item.parent_description.includes(sites[i])).length);
        const cardIndicator = document.createElement("div");
        cardIndicator.className = "indicador-card";

        const nameIndicator = document.createElement("p");
        nameIndicator.textContent = sites[i];

        const valueIndicator = document.createElement("h2");
        valueIndicator.textContent = jsonData.filter(item => item.parent_description.includes(sites[i])).length;

        cardIndicator.appendChild(nameIndicator);
        cardIndicator.appendChild(valueIndicator);

        let Aqtd = 0;
        Aqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "HIGH").length;

        let Bqtd = 0;
        Bqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "MEDIUM").length;

        let Cqtd = 0;
        Cqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "LOW").length;

        cardIndicator.appendChild(createBarGraph(Aqtd, Bqtd, Cqtd, renameAndFormatDates(jsonData), sites[i]));
        showClassA(jsonData,sites[i],cardIndicator);
        document.getElementById("container-backlog").appendChild(cardIndicator);
    }
    const animationDown = document.createElement("div");
    animationDown.className = "animation-down-container";
    document.getElementById("container-backlog").appendChild(animationDown);
    loadAnimationDownArrow();
    feedBack.remove();
    const lastUpdate = document.createElement("p");
    lastUpdate.id = "lastUpdate";
    let dateNow = new Date();
    lastUpdate.textContent = "Última atualização " + dateNow.toLocaleString('pt-br');
    document.body.appendChild(lastUpdate);
    setInterval(loopAtualizar, 120000);
}
function createBarGraph(a, b, c,jsonBruto,site) {
    console.log(a);
    console.log(b);
    console.log(c);
    const graph = document.createElement("div");
    graph.className = "graphBar";

    const bar1 = document.createElement("div");
    bar1.className = "graphBarContain";

    const p1 = document.createElement("p");
    p1.textContent = "A";

    const value1 = document.createElement("div");
    let apoio = (a * 100) / (a + b + c);
    value1.style.width = apoio + "%";
    value1.style.height = "100%";
    value1.style.backgroundColor = "red";

    const rot1 = document.createElement("p");
    rot1.className = "rotulo";
    rot1.textContent = a;

    // console.log(rot1.textContent);

    bar1.appendChild(p1);
    bar1.appendChild(value1);
    bar1.appendChild(rot1);

    bar1.addEventListener("click",function () {
        createBacklogDetail(bar1,filterJsonColumns(jsonBruto.filter(item=>item.parent_description.includes(site) && item.priorities_description==="HIGH"),chooseColumns()));
    });
    graph.appendChild(bar1);
    //////////////
    const bar2 = document.createElement("div");
    bar2.className = "graphBarContain";

    const p2 = document.createElement("p");
    p2.textContent = "B";

    const value2 = document.createElement("div");
    apoio = (b * 100) / (a + b + c);
    value2.style.width = apoio + "%";
    value2.style.height = "100%";
    value2.style.backgroundColor = "yellow";

    const rot2 = document.createElement("p");
    rot2.className = "rotulo";
    rot2.textContent = b;

    bar2.appendChild(p2);
    bar2.appendChild(value2);
    bar2.appendChild(rot2);
    bar2.addEventListener("click",function () {
        createBacklogDetail(bar2,filterJsonColumns(jsonBruto.filter(item=>item.parent_description.includes(site) && item.priorities_description==="MEDIUM"),chooseColumns()));
    });
    graph.appendChild(bar2);
    //////////////
    const bar3 = document.createElement("div");
    bar3.className = "graphBarContain";

    const p3 = document.createElement("p");
    p3.textContent = "C";

    const value3 = document.createElement("div");
    apoio = (c * 100) / (a + b + c);
    value3.style.width = apoio + "%";
    value3.style.height = "100%";
    value3.style.backgroundColor = "green";

    const rot3 = document.createElement("p");
    rot3.className = "rotulo";
    rot3.textContent = c;

    bar3.appendChild(p3);
    bar3.appendChild(value3);
    bar3.appendChild(rot3);
    bar3.addEventListener("click",function () {
        createBacklogDetail(bar3,filterJsonColumns(jsonBruto.filter(item=>item.parent_description.includes(site) && item.priorities_description==="LOW"),chooseColumns()));
    });
    graph.appendChild(bar3);
    //////////////

    return graph;
}

backlog();

function createBacklogDetail(myDiv,jsonToShow) {
    const closeButton = document.createElement("button");
    closeButton.textContent = "X";
    
    const title = document.createElement("h1");
    title.textContent = "Classe "+myDiv.firstElementChild.textContent;
    const detail = document.createElement("div");
    detail.id = "detail-Backlog";
    closeButton.addEventListener("click", function(){
        detail.remove();
    });
    detail.appendChild(closeButton);
    detail.appendChild(title);
    const tableBack = document.createElement("div");
    tableBack.id = "table-backlog";
    tableBack.appendChild(createTableFromJSON(jsonToShow));
    detail.appendChild(tableBack);
    document.body.appendChild(detail);


    
}

// document.getElementById("eita").addEventListener("click", function () {

//     createBacklogDetail(this);
// });
function createTableFromJSON(jsonData) {
    // Cria a tabela e o cabeçalho
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    table.appendChild(thead);
    table.appendChild(tbody);

    // Obtém os nomes das colunas
    const columns = Object.keys(jsonData[0]);

    // Cria a linha do cabeçalho
    const headerRow = document.createElement('tr');
    columns.forEach(column => {
        const th = document.createElement('th');
        th.textContent = column;
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Cria as linhas da tabela
    jsonData.forEach(item => {
        const row = document.createElement('tr');
        columns.forEach(column => {
            const td = document.createElement('td');
            td.textContent = item[column];
            row.appendChild(td);
        });
        tbody.appendChild(row);
    });

    // Retorna a tabela criada
    return table;
}

// Exemplo de uso

function filterJsonColumns(originalJson, columnsToKeep) {
    return originalJson.map(item => {
        let filteredItem = {};
        columnsToKeep.forEach(column => {
            if (item.hasOwnProperty(column)) {
                filteredItem[column] = item[column];
            }
        });
        return filteredItem;
    });
}
// document.body.appendChild(createTableFromJSON(jsonData));

function chooseColumns(){
    const columns = ["id_code","requests_x_status_description","date","items_description","description"];

    return columns;
}

function renameAndFormatDates(jsonData) {
    return jsonData.map(item => {
        let newItem = {};
        for (let key in item) {
            let newKey = key; // Aqui você pode adicionar lógica para renomear as chaves, se necessário
            if (key === 'date') {
                newItem[newKey] = formatDate(item[key]);
            } else {
                newItem[newKey] = item[key];
            }
        }
        return newItem;
    });
}

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Os meses são indexados a partir de 0
    const year = String(date.getFullYear()).slice(-2); // Pega os últimos 2 dígitos do ano
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
}

// Exemplo de uso
async function loopAtualizar(){
    

    //config api
    const apiEndpoint = "https://app.fracttal.com/api/work_requests/?id_status=";
    const paramsBacklog = ["1", "2", "3", "7", "8", "9", "10", "11"];
    const sites = ["SJK", "EDE", "TTE", "GPX", "BOT", "EUG"];
    const tokens = ["Basic cHZDYjdrb1NFVDZkUHFMNlJVYUI6UU5wWTZNcjdZeVBsRVBGSXB2T2QxbmFwb2I2TmgySXlXd0p5VUhpdzNISFg5cklmdklieDBpVA==", "Basic cTNWSlhiRVJkR1ZwRFpDbDJ3czpMUk5Mb0Z6Nndqc0FYQmVTUzV4YjBjbWZGY2xUS1RJeUNZUUdFN1pGNG5ZMDRrNkNKVmt2WkQ="]
    let jsonData = [];

    //pegando o backlog
    
    for (let i = 0; i < paramsBacklog.length; i++) {

        jsonData = jsonData.concat(await getLinesApi(apiEndpoint + paramsBacklog[i], tokens[0]));
        jsonData = jsonData.concat(await getLinesApi(apiEndpoint + paramsBacklog[i], tokens[1]));
        console.log(jsonData);
       

    }
    // alert("oi");
    while (document.getElementById("container-backlog").firstChild) {
        document.getElementById("container-backlog").removeChild(document.getElementById("container-backlog").firstChild);
    }
    for (let i = 0; i < sites.length; i++) {

        console.log(sites[i] + jsonData.filter(item => item.parent_description.includes(sites[i])).length);
        const cardIndicator = document.createElement("div");
        cardIndicator.className = "indicador-card";

        const nameIndicator = document.createElement("p");
        nameIndicator.textContent = sites[i];

        const valueIndicator = document.createElement("h2");
        valueIndicator.textContent = jsonData.filter(item => item.parent_description.includes(sites[i])).length;

        cardIndicator.appendChild(nameIndicator);
        cardIndicator.appendChild(valueIndicator);

        let Aqtd = 0;
        Aqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "HIGH").length;

        let Bqtd = 0;
        Bqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "MEDIUM").length;

        let Cqtd = 0;
        Cqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description === "LOW").length;

        cardIndicator.appendChild(createBarGraph(Aqtd, Bqtd, Cqtd, renameAndFormatDates(jsonData), sites[i]));
        showClassA(jsonData,sites[i],cardIndicator);
        document.getElementById("container-backlog").appendChild(cardIndicator);
    }
    const animationDown = document.createElement("div");
    animationDown.className = "animation-down-container";
    document.getElementById("container-backlog").appendChild(animationDown);
    loadAnimationDownArrow();
    // alert("oi");
    if (document.getElementById("lastUpdate") !== null){
        document.getElementById("lastUpdate").remove();

    }
    const lastUpdate = document.createElement("p");
    lastUpdate.id = "lastUpdate";
    let dateNow = new Date();
    lastUpdate.textContent = "Última atualização " + dateNow.toLocaleString('pt-br');
    document.body.appendChild(lastUpdate);

}
function showClassA(itens,site,target){
    if(document.getElementById("CriticalAlert"+site)!==null){
        const CriticalAlert = document.getElementById("CriticalAlert"+site);
        CriticalAlert.remove();
    }else{
        const CriticalAlert = document.createElement("CriticalAlert"+site);
        CriticalAlert.className="CriticalAlert";
    }
    itens.filter(item=>item.priorities_description==="HIGH"&&item.parent_description.includes(site)&&item.requests_x_status_description==="OPEN_STATUS").map(item=>{
        const Txt = document.createElement("p");
        Txt.textContent = item.id_code + "-" + items_description;
        CriticalAlert.appendChild(Txt);
    });
    target.appendChild(CriticalAlert);
}