
function tarea(){
    console.log('acá va la tarea', new Date());
}

function lanzarSiempreALaHora(hora, minutos, tarea){
    var ahora = new Date();
    console.log('lanzado',ahora);
    var momento = new Date(ahora.getFullYear(), ahora.getMonth(), ahora.getDate(), hora, minutos);
    if(momento<=ahora){ // la hora era anterior a la hora actual, debo sumar un día
        momento = new Date(momento.getTime()+1000*60*60*24);
    }
    console.log('para ser ejecutado en',momento,momento.getTime()-ahora.getTime());
    setTimeout(function(){
        tarea();
        lanzarSiempreALaHora(hora,minutos,tarea);
    },momento.getTime()-ahora.getTime());
}

lanzarSiempreALaHora(16,41, tarea);
  
  