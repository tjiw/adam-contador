async function cargarJson(evento){
    const file = evento.target.files[0];

    if (!file) return;

    const text = await file.text();
    const data = JSON.parse(text);

    procesa(data);

    let div1 = document.getElementById("pre_insert");
    let div2 = document.getElementById("post_insert");
    let div3 = document.getElementById("div_historial");
    let footer = document.querySelector("footer");

    div1.style = "display:none";
    div2.style = "text-align:center";
    div3.style = "";
    footer.style = "display: sticky; border-top: 2px; border-style: solid none none none";

    let almacenamiento = document.getElementById("json");
    almacenamiento.innerHTML = JSON.stringify(data);
    imprimeHistorial(data)
}

function procesa(data){ 
             
    let fecha_actual = document.getElementById("fecha_actual");
    let fecha_incidente = document.getElementById("fecha_incidente");
    let contador = document.getElementById("contador");
    let historial = document.getElementById("historial");

    fecha_actual.innerHTML = `Fecha actual: ${parseFecha(new Date())}`;
    fecha_incidente.innerHTML = `Fecha del último incidente: ${parseFecha(data.ultimo_incidente.fecha)}`;

    contador.innerHTML = `Días desde que Adam se volvió a dejar en ridículo: ${restaFechas(new Date(), new Date(data.ultimo_incidente.fecha))}`
}

function parseFecha(fecha){
    let date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

function restaFechas(fechaMayor, fechaMenor){
    let diferencia = Math.abs(fechaMayor.getTime() - fechaMenor.getTime());
    return (new Date(diferencia).getDate());
}

function imprimeHistorial(data){
    let historial = document.getElementById("historial");
    for (let key in data){
        if (key != "ultimo_incidente"){
            let entrada = document.createElement("li");
            entrada.className = "elemento_historial";
            historial.append(entrada);
            entrada.innerHTML = data[key].descripcion;
        }
    }
}

