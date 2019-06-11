var Iniciar = {

    preload: function(){
juego.load.image('nave', 'imagenes/nave.png');
juego.load.image('laser', 'imagenes/bala.png');
juego.load.image('malo', 'imagenes/asteroide.png');
juego.load.image('bg', 'imagenes/fondo.png');
    },
    create: function()
    {
        juego.add.tileSprite(0,0,400,540,'bg');
        juego.add.tileSprite(0,0,62,59,'nave');
    },
    update: function(){

    }
};