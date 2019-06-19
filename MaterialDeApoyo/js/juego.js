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

        //limitiar giro de la nave
        nave.body.allowRotation=false;
        //crear de balas
        balas= juego.add.group();
        balas.enableBody=true;
        balas.setBodyType= Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('checkWorldBounds', true);
        balas.setAll('outOfBoundsKill', true);

    },
    update: function(){
        fondoJuego.tilePosition.x -= 3;

        nave.rotation= juego.physics.arcade.angleToPointer(nave);
        //disparar Balas
        
         if(juego.input.activePointer.isDown){
            this.disparar();
         }
    }, 
        //disparar una sola bala
        disparar: function(){
            
            timer= juego.time.now + delay;
            var bala= balas.getFirstDead();

            if(
                balas.countDead() > 0){
                  
                    bala.anchor.setTo(0.5);
                    bala.reset(nave.x, nave.y);
                    bala.rotation=
                    juego.physics.arcade.angleToPointer(bala);
                    juego.physics.arcade.moveToPointer(bala, 300);
                }
                }
        
};
