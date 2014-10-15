var tablero;
var teclas =
{
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

var objetos = {
    fondo: {
        imgs:[
            {
                url: "imgs/fondo.png",
                ok: false,
                funcion: confirmarFondo
            }
        ]
    },
    tifis: {
        velocidad: 20,
        x: 0,
        y: 0,
        imgs:[
            {
                url: "imgs/diana-frente.png",
                ok: false,
                funcion: confirmarFrente
            },
            {
                url: "imgs/diana-atras.png",
                ok: false,
                funcion: confirmarAtras
            },
            {
                url: "imgs/diana-izq.png",
                ok: false,
                funcion: confirmarIzq
            },
            {
                url: "imgs/diana-der.png",
                ok: false,
                funcion: confirmarDer
            }
        ]
    },
    liz:{
        imgs:[
            {
                url: "imgs/liz.png",
                ok: false,
                funcion: confirmarLiz
            }
        ],
        x: 400,
        y: 200
    }
}

var objFondo=objetos.fondo;
var objTifis=objetos.tifis;
var objLiz=objetos.liz;

function precargaImgs(){
    
    var imgPrecarga;
    
    for(objeto in objetos){
        for(sprite in objetos[objeto].imgs){
            
            imgPrecarga=objetos[objeto].imgs[sprite];
            
            imgPrecarga.imagen=new Image();
            imgPrecarga.imagen.src=imgPrecarga.url;
            imgPrecarga.imagen.onload=imgPrecarga.funcion;
        }
    }
}

function inicio()
{
    var canvas = document.getElementById("campo");
    tablero = canvas.getContext("2d");
    
    precargaImgs();

    document.addEventListener("keydown", teclado);

}
function teclado(evento)
{
    var codigo = evento.keyCode;
    var tifis=objTifis;
    var permitirMover=false;
    var colision=false;
    
    if(codigo == teclas.UP && tifis.y>0)
    {
        if (tifis.y>340 && tifis.y<370 && tifis.x>110) {
            colision=true;
        }else if (tifis.y>200 && tifis.y<230 && tifis.x<130) {
            colision=true;
        }else if (tifis.y>200 && tifis.y<230 && tifis.x>170 && tifis.x<230) {
            colision=true;
        }
        
        if (!colision) {
            tifis.y -= tifis.velocidad;
        }
    }
    if(codigo == teclas.DOWN && (tifis.y<440))
    {
        if (tifis.y>130 && tifis.y<150 && tifis.x<130) {
            colision=true;
        }else if (tifis.y>280 && tifis.y<310 && tifis.x>110) {
            colision=true;
        }
        
        if (!colision) {
            tifis.y += tifis.velocidad;
        }
    }
    if(codigo == teclas.LEFT && (tifis.x>0))
    {
        if (tifis.x<150 && tifis.y>150 && tifis.y<210) {
            colision=true;
        }else if (tifis.x<250 && tifis.x>210 && tifis.y<210) {
            colision=true;
        }
        
        if (!colision) {
            tifis.x -= tifis.velocidad;
        }
    }
    if(codigo == teclas.RIGHT && (tifis.x<445))
    {
        if (tifis.x>90 && tifis.y>310 && tifis.y<350) {
            colision=true;
        }
        else if (tifis.x>150 && tifis.x<170 && tifis.y<220) {
            colision=true;
        }
        
        if (!colision) {
            tifis.x += tifis.velocidad;
        }
    }
    dibujar(codigo);
}

function confirmarFondo()
{
    objFondo.imgs[0].ok = true;
    dibujar();
}

function confirmarFrente()
{
    objTifis.imgs[0].ok = true;
    dibujar();
}
function confirmarAtras()
{
    objTifis.imgs[1].ok = true;
    dibujar();
}
function confirmarIzq()
{
    objTifis.imgs[2].ok = true;
    dibujar();
}
function confirmarDer()
{
    objTifis.imgs[3].ok = true;
    dibujar();
}

function confirmarLiz()
{
    objLiz.imgs[0].ok = true;
    dibujar();
}

function dibujar(direccion)
{
    if(objFondo.imgs[0].ok)
    {
        tablero.drawImage(objFondo.imgs[0].imagen, 0, 0);    
    }

    var tifisOrientada = objTifis.imgs[0].imagen;
    
    if(objTifis.imgs[0].ok && objTifis.imgs[1].ok && objTifis.imgs[2].ok && objTifis.imgs[3].ok)
    {
        if(direccion == teclas.DOWN || direccion == undefined)
        {
            tifisOrientada = objTifis.imgs[0].imagen;
        }
        else if(direccion == teclas.UP)
        {
            tifisOrientada = objTifis.imgs[1].imagen;
        }
        else if(direccion == teclas.LEFT)
        {
            tifisOrientada = objTifis.imgs[2].imagen;
        }
        else if(direccion == teclas.RIGHT)
        {
            tifisOrientada = objTifis.imgs[3].imagen;
        }
    }
    
    tablero.drawImage(tifisOrientada, objTifis.x, objTifis.y);
    
    if(objLiz.imgs[0].ok)
    {
        tablero.drawImage(objLiz.imgs[0].imagen, objLiz.x, objLiz.y);
    }
}