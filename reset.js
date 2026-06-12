class ErrorPorCancelacion extends Error{
    constructor(mensaje){
        super(mensaje);
    }
}

reset.onclick = function(){
    try{
        let contador = document.getElementById("contador");
        let data = JSON.parse(document.getElementById("json").innerHTML);
        let historial = document.getElementById("historial");
        let ultimo_incidente = document.getElementById("fecha_incidente");

        //Actualiza JSON
        let descripcion = prompt("Describe el incidente");
        if (descripcion === null)
            throw new ErrorPorCancelacion();
        
        let fecha = prompt("Introduce la fecha del incidente en la forma dd/mm/aaaa hh:mm (opcional, por defecto es la fecha actual)", parseFecha(new Date()));
        if (fecha == "")
            fecha = parseFecha(new Date());

        //Tras manejo de entradas del usuario, convertimos la fecha de nuevo a un objeto Date
        fecha = parseDate(fecha);
        ultimo_incidente.innerHTML = `Fecha del último incidente: ${parseFecha(fecha)}`
        
        //Actualiza contador
        contador.innerHTML = "Días desde que Adam se volvió a dejar en ridículo: 0";

        data[`incidente${getNumUltimoIncidente(data)+1}`] = creaIncidente(fecha, descripcion);
        data.ultimo_incidente = data[`incidente${getNumUltimoIncidente(data)}`];
        if (data.ultimo_incidente === null)
            throw new ErrorPorCancelacion();

        descargarJSON(data);

        //Añadir entrada al historial
        let entrada = document.createElement("li");
        entrada.innerHTML = data.ultimo_incidente.descripcion;
        entrada.className = "elemento_historial";
        historial.append(entrada);
    }
    catch (e){
        if (e instanceof ErrorPorCancelacion)
            alert("Proceso cancelado.");
        else
            console.error(e);   
    }
}

function getNumUltimoIncidente(obj){
    let miembros = Object.keys(obj);
    miembros.sort();
    return Number(miembros[miembros.length-2].at(-1));    
}   

function creaIncidente(f, d){
    if (d === null)
        return null;
    else
        return {
            fecha: f,
            descripcion: d
        }
}

function parseFecha(fecha){
    let date = new Date(fecha);
    return `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
}

function parseDate(fecha){
    let tabla = fecha.trim().split("/");
    return new Date(`${tabla[2]}-${tabla[1]}-${tabla[0]}`);
}

function descargarJSON(objeto, nombreArchivo = "data.json") {
  const json = JSON.stringify(objeto, null, 2);

  const blob = new Blob([json], {
    type: "application/json"
  });

  const url = URL.createObjectURL(blob);

  const enlace = document.createElement("a");
  enlace.href = url;
  enlace.download = nombreArchivo;
  enlace.click();

  URL.revokeObjectURL(url);
}