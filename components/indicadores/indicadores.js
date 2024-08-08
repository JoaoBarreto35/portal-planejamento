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
        Aqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description==="HIGH").length;
        
        let Bqtd = 0;
        Bqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description==="MEDIUM").length;
        
        let Cqtd = 0;
        Cqtd = jsonData.filter(item => item.parent_description.includes(sites[i]) && item.priorities_description==="LOW").length;
        
        cardIndicator.appendChild(createBarGraph(Aqtd,Bqtd,Cqtd));
        document.getElementById("container-backlog").appendChild(cardIndicator);
    }
    const animationDown = document.createElement("div");
    animationDown.className = "animation-down-container";
    document.getElementById("container-backlog").appendChild(animationDown);
    loadAnimationDownArrow();
    feedBack.remove();
}
function createBarGraph(a,b,c){
    console.log(a);
    console.log(b);
    console.log(c);
    const graph = document.createElement("div");
    graph.className = "graphBar";
    
    const bar1 = document.createElement("div");
    bar1.className ="graphBarContain";

    const p1 = document.createElement("p");
    p1.textContent = "A";
    
    const value1 = document.createElement("div");
    let apoio = (a*100)/(a+b+c);
    value1.style.width =  apoio + "%";
    value1.style.height = "100%";
    value1.style.backgroundColor = "red";
 
    const rot1 = document.createElement("p");
    rot1.className = "rotulo";
    rot1.textContent = a;
    
    // console.log(rot1.textContent);
    
    bar1.appendChild(p1);
    bar1.appendChild(value1);
    bar1.appendChild(rot1);
    
    graph.appendChild(bar1);
    //////////////
    const bar2 = document.createElement("div");
    bar2.className ="graphBarContain";
    
    const p2 = document.createElement("p");
    p2.textContent = "B";
    
    const value2 = document.createElement("div");
    apoio = (b*100)/(a+b+c);
    value2.style.width =  apoio + "%";
    value2.style.height = "100%";
    value2.style.backgroundColor = "yellow";
    
    const rot2 = document.createElement("p");
    rot2.className = "rotulo";
    rot2.textContent = b;
    
    bar2.appendChild(p2);
    bar2.appendChild(value2);
    bar2.appendChild(rot2);
    
    graph.appendChild(bar2);
    //////////////
    const bar3 = document.createElement("div");
    bar3.className ="graphBarContain";
    
    const p3 = document.createElement("p");
    p3.textContent = "C";
    
    const value3 = document.createElement("div");
    apoio = (c*100)/(a+b+c);
    value3.style.width =  apoio + "%";
    value3.style.height = "100%";
    value3.style.backgroundColor = "green";
    
    const rot3 = document.createElement("p");
    rot3.className = "rotulo";
    rot3.textContent = c;
    
    bar3.appendChild(p3);
    bar3.appendChild(value3);
    bar3.appendChild(rot3);

    graph.appendChild(bar3);
    //////////////

    return graph;
}

backlog();

// function createGraphPizza(name, dados, tam) {
//     // name = nome html do grafico a ser inserido
//     // dados json com a,b e c {a:10,b:50,c:90}
//     var canvas = document.getElementById(name);
//     var ctx = canvas.getContext('2d');
//     var total = Object.values(dados).reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
//     var raioExterno = tam / 2; // Raio externo ajustado para 50
//     var raioInterno = (tam / 2) * 0.8; // Raio interno ajustado para 0 (gráfico de pizza completo)
//     var anguloInicio = 0;
//     var rótulos = [];

//     Object.keys(dados).forEach(function (chave) {
//         var proporcao = dados[chave] / total;
//         var anguloFinal = anguloInicio + proporcao * 2 * Math.PI;

//         ctx.beginPath();
//         ctx.moveTo(tam / 2, tam / 2); // Centro do círculo ajustado para (tam/2, tam/2)
//         ctx.arc(tam / 2, tam / 2, raioExterno, anguloInicio, anguloFinal);
//         ctx.arc(tam / 2, tam / 2, raioInterno, anguloFinal, anguloInicio, true);
//         ctx.closePath();

//         // Definir cores diferentes para cada segmento
//         if (chave === 'a') {
//             ctx.fillStyle = 'red';
//         } else if (chave === 'b') {
//             ctx.fillStyle = 'green';
//         } else if (chave === 'c') {
//             ctx.fillStyle = 'blue';
//         }

//         ctx.fill();

//         // Calcular posição dos rótulos
//         var anguloMeio = (anguloInicio + anguloFinal) / 2;
//         var raioTexto = raioExterno + 20; // Ajustar a distância do rótulo para fora do gráfico
//         var xTexto = tam / 2 + raioTexto * Math.cos(anguloMeio);
//         var yTexto = tam / 2 + raioTexto * Math.sin(anguloMeio);

//         rótulos.push({ texto: `${chave}: ${dados[chave]}`, x: xTexto, y: yTexto });

//         anguloInicio = anguloFinal;
//     });

//     // Desenhar rótulos por cima de tudo
//     ctx.fillStyle = 'black'; // Cor do texto
//     ctx.font = 'bold 12px Arial';
//     ctx.textAlign = 'center';
//     ctx.textBaseline = 'middle';
//     rótulos.forEach(function (rótulo) {
//         ctx.fillText(rótulo.texto, rótulo.x, rótulo.y);
//     });
// }







