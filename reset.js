class ErrorPorCancelacion extends Error{
    constructor(mensaje){
        super(mensaje)
    }
}

reset.onclick = function(){
    try{
        let contador = document.getElementById("contador");
        let data = JSON.parse(document.getElementById("json").innerHTML);
        let historial = document.getElementById("historial");
        
        //Actualiza contador
        contador.innerHTML = "Días desde que Adam se volvió a dejar en ridículo: 0";

        //Actualiza JSON
        data[`incidente${getNumUltimoIncidente(data)+1}`] = creaIncidente(new Date(), prompt("Describe el incidente"));
        data.ultimo_incidente = data[`incidente${getNumUltimoIncidente(data)}`];
        if (data.ultimo_incidente === null)
            throw new ErrorPorCancelacion();

        alert("Copia el siguiente texto y guárdalo en un archivo de texto llamado data.json, y súbelo al discord");
        alert(JSON.stringify(data));

        //Añadir entrada al historial
        let entrada = document.createElement("li");
        entrada.innerHTML = data.ultimo_incidente.descripcion;
        historial.append(entrada);
    }
    catch (e){
        if (e instanceof ErrorPorCancelacion)
            alert("Proceso cancelado.");
        else
            console.error(e)      
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