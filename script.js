const ph =
document.getElementById("ph");

const turbidez =
document.getElementById("turbidez");

const temperatura =
document.getElementById("temperatura");

const nivel =
document.getElementById("nivel");

const statusDiv =
document.getElementById("status");

const listaAlertas =
document.getElementById("listaAlertas");

const temaBtn =
document.getElementById("temaBtn");

/* TEMA ESCURO */

temaBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark"
        );
    }
);

/* ALERTAS */

function adicionarAlerta(
    texto,
    tipo
){

    const alerta =
    document.createElement("div");

    alerta.classList.add("alerta");

    if(tipo == "risco"){

        alerta.classList.add(
            "alertaRisco"
        );

    }else{

        alerta.classList.add(
            "alertaAtencao"
        );
    }

    alerta.innerText = texto;

    listaAlertas.prepend(alerta);

    if(listaAlertas.children.length > 5){

        listaAlertas.removeChild(
            listaAlertas.lastChild
        );
    }
}

/* STATUS */

function verificarStatus(
    valorPH,
    valorTurbidez
){

    if(valorTurbidez > 70){

        statusDiv.innerText =
            "ALTO RISCO";

        statusDiv.className =
            "status risco";

        adicionarAlerta(
            "Turbidez elevada detectada",
            "risco"
        );

        navigator.vibrate(300);
    }

    else if(
        valorPH < 6 ||
        valorPH > 8
    ){

        statusDiv.innerText =
            "ATENÇÃO";

        statusDiv.className =
            "status atencao";

        adicionarAlerta(
            "pH fora do ideal",
            "atencao"
        );
    }

    else{

        statusDiv.innerText =
            "ÁGUA BOA";

        statusDiv.className =
            "status boa";
    }
}

/* GRÁFICO PH */

const ctxPH =
document.getElementById(
    "graficoPH"
);

const graficoPH =
new Chart(ctxPH, {

    type:'line',

    data:{
        labels:[],
        datasets:[{
            label:'pH',
            data:[],
            borderWidth:3,
            tension:0.4
        }]
    },

    options:{
        responsive:true
    }
});

/* GRÁFICO TEMPERATURA */

const ctxTemp =
document.getElementById(
    "graficoTemp"
);

const graficoTemp =
new Chart(ctxTemp, {

    type:'line',

    data:{
        labels:[],
        datasets:[{
            label:'Temperatura',
            data:[],
            borderWidth:3,
            tension:0.4
        }]
    },

    options:{
        responsive:true
    }
});

/* GRÁFICO TURBIDEZ */

const ctxTurbidez =
document.getElementById(
    "graficoTurbidez"
);

const graficoTurbidez =
new Chart(ctxTurbidez, {

    type:'line',

    data:{
        labels:[],
        datasets:[{
            label:'Turbidez',
            data:[],
            borderWidth:3,
            tension:0.4
        }]
    },

    options:{
        responsive:true
    }
});

/* ATUALIZA GRÁFICOS */

function atualizarGraficos(
    hora,
    valorPH,
    valorTemp,
    valorTurbidez
){

    graficoPH.data.labels.push(hora);

    graficoPH.data.datasets[0].data.push(
        valorPH
    );

    graficoTemp.data.labels.push(hora);

    graficoTemp.data.datasets[0].data.push(
        valorTemp
    );

    graficoTurbidez.data.labels.push(hora);

    graficoTurbidez.data.datasets[0].data.push(
        valorTurbidez
    );

    if(
        graficoPH.data.labels.length > 12
    ){

        graficoPH.data.labels.shift();

        graficoPH.data.datasets[0].data.shift();

        graficoTemp.data.labels.shift();

        graficoTemp.data.datasets[0].data.shift();

        graficoTurbidez.data.labels.shift();

        graficoTurbidez.data.datasets[0].data.shift();
    }

    graficoPH.update();

    graficoTemp.update();

    graficoTurbidez.update();
}

/* DADOS */

async function atualizarDados(){

    try{

        /* SIMULAÇÃO */

        const valorPH =
        (Math.random() * 3 + 5)
        .toFixed(1);

        const valorTurbidez =
        Math.floor(
            Math.random() * 100
        );

        const valorTemp =
        Math.floor(
            Math.random() * 10 + 20
        );

        const valorNivel =
        Math.floor(
            Math.random() * 100
        );

        ph.innerText =
            valorPH;

        turbidez.innerText =
            valorTurbidez + " NTU";

        temperatura.innerText =
            valorTemp + "°C";

        nivel.innerText =
            valorNivel + "%";

        verificarStatus(
            valorPH,
            valorTurbidez
        );

        const hora =
        new Date().toLocaleTimeString();

        atualizarGraficos(
            hora,
            valorPH,
            valorTemp,
            valorTurbidez
        );

    }catch(erro){

        statusDiv.innerText =
            "ESP32 DESCONECTADO";

        statusDiv.className =
            "status risco";
    }
}

setInterval(
    atualizarDados,
    3000
);

atualizarDados();

/* SERVICE WORKER */

if("serviceWorker" in navigator){

    navigator.serviceWorker.register(
        "service-worker.js"
    );
}