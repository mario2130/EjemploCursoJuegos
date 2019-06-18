var nave;
var balas;
var timer = 8;
var delay = 488;
var fondoJuego;


var Iniciar = {

    preload: function(){
juego.load.image('nave', 'imagenes/nave.png');
juego.load.image('laser', 'imagenes/bala.png');
juego.load.image('malo', 'imagenes/asteroide.png');
juego.load.image('bg', 'imagenes/fondo.png');
    }, 
    create: function()
    {
        fondoJuego = juego.add.tileSprite(0,0,400,540,'bg');
        //juego.add.tileSprite(0,0,400,540,'bg');

        nave = juego.add.sprite(40,juego.height / 2 ,'nave');
        nave.anchor.setTo(0.5);
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(nave, true);
    },
    update: function(){
fondoJuego.tilePosition.x -= 3;
    }
};