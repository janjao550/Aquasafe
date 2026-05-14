// script.js

const ph = document.getElementById("ph");
const turbidez = document.getElementById("turbidez");
const temperatura = document.getElementById("temperatura");
const nivel = document.getElementById("nivel");

const statusDiv = document.getElementById("status");

const listaAlertas = document.getElementById("listaAlertas");

const ctx = document.getElementById("graficoPH");

const dadosGrafico = {
    labels: [],
    datasets: [{
        label: 'pH',
        data: [],
        borderWidth: 3,
        tension:0.4
    }]
};

const grafico = new Chart(ctx, {
    type: 'line',
    data: dadosGrafico,
    options:{
        responsive:true
    }
});

function adicionarAlerta(texto, tipo){

    const alerta = document.createElement("div");

    alerta.classList.add("alerta");

    if(tipo == "risco"){
        alerta.classList.add("alertaRisco");
    }else{
        alerta.classList.add("alertaAtencao");
    }

    alerta.innerText = texto;

    listaAlertas.prepend(alerta);

    if(listaAlertas.children.length > 5){
        listaAlertas.removeChild(listaAlertas.lastChild);
    }
}

function atualizarDados(){

    const valorPH = (Math.random() * 3 + 5).toFixed(1);

    const valorTurbidez = Math.floor(Math.random() * 100);

    const valorTemp = Math.floor(Math.random() * 10 + 20);

    const valorNivel = Math.floor(Math.random() * 100);

    ph.innerText = valorPH;

    turbidez.innerText = valorTurbidez + " NTU";

    temperatura.innerText = valorTemp + "°C";

    nivel.innerText = valorNivel + "%";

    if(valorTurbidez > 70){

        statusDiv.innerText = "ALTO RISCO";

        statusDiv.className = "status risco";

        adicionarAlerta(
            "Turbidez elevada detectada",
            "risco"
        );

    }
    else if(valorPH < 6 || valorPH > 8){

        statusDiv.innerText = "ATENÇÃO";

        statusDiv.className = "status atencao";

        adicionarAlerta(
            "pH fora do ideal",
            "atencao"
        );

    }
    else{

        statusDiv.innerText = "ÁGUA BOA";

        statusDiv.className = "status boa";
    }

    const hora = new Date().toLocaleTimeString();

    dadosGrafico.labels.push(hora);

    dadosGrafico.datasets[0].data.push(valorPH);

    if(dadosGrafico.labels.length > 12){

        dadosGrafico.labels.shift();

        dadosGrafico.datasets[0].data.shift();
    }

    grafico.update();
}

setInterval(
    atualizarDados,
    3000
);

atualizarDados();