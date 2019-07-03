var nave;
var balas;
var timer = 0;
var delay = 400;
var fondoJuego;
var aparecer;


var Iniciar = {

    preload: function() {
        juego.load.image('nave', 'imagenes/nave.png');
        juego.load.image('laser', 'imagenes/bala.png');
        juego.load.image('malo', 'imagenes/asteroide.png');
        juego.load.image('bg', 'imagenes/fondo.png');
    },
    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 400, 540, 'bg');
        //juego.add.tileSprite(0,0,400,540,'bg');

        nave = juego.add.sprite(40, juego.height / 2, 'nave');
        nave.anchor.setTo(0.5);
        juego.physics.startSystem(Phaser.Physics.ARCADE);
        juego.physics.arcade.enable(nave, true);

        //limitiar giro de la nave
        nave.body.allowRotation = false;

        //crear de balas
        balas = juego.add.group();
        balas.enableBody = true;
        balas.setBodyType = Phaser.Physics.ARCADE;
        balas.createMultiple(20, 'laser');
        balas.setAll('anchor.x', 0.5);
        balas.setAll('anchor.y', 1);
        balas.setAll('checkWorldBounds', true);
        balas.setAll('outOfBoundsKill', true);

        ///malos
        malos = juego.add.group();
        malos.enableBody = true;
        malos.setBodyType = Phaser.Physics.ARCADE;
        malos.createMultiple(20, 'malo');
        malos.setAll('anchor.x', 0.5);
        malos.setAll('anchor.y', 1);
        malos.setAll('checkWorldBounds', true);
        malos.setAll('outOfBoundsKill', true);


        aparecer = juego.time.events.loop(1500, this.crearEnemigos, this);

        fondoJuego.inputEnabled = true;
        fondoJuego.events.onInputDown.add(this.disparar, this);

    },
    update: function() {
        fondoJuego.tilePosition.x -= 3;

        nave.rotation = juego.physics.arcade.angleToPointer(nave);
        //disparar Balas

        // if (juego.input.activePointer.isDown) {
        //     console.error('disparo');
        //     setTimeout(this.disparar(), 500);
        // }



        juego.physics.arcade.overlap(balas, malos, this.colision, null, this);
    },
    //disparar una sola bala
    disparar: function() {
        console.log('disparar');
        timer = juego.time.now + delay;
        var bala = balas.getFirstDead();

        // console.log(timer);
        // console.log(balas.countDead());
        // console.log(juego.time.now);
        if (
            //juego.time.now > timer &&
            balas.countDead() > 0) {

            bala.anchor.setTo(0.5);
            bala.reset(nave.x, nave.y);
            bala.rotation =
                juego.physics.arcade.angleToPointer(bala);
            juego.physics.arcade.moveToPointer(bala, 300);
        }
    },
    crearEnemigos: function() {

        var enem = malos.getFirstDead();
        var num = Math.floor(Math.random() * 10 + 1);
        enem.reset(400, num * 55);
        enem.anchor.setTo(0.5);
        enem.body.velocity.x = -100;
        enem.CheckWorldBounds = true;
        enem.outOfBoundsKill = true;
    },
    colision: function(bala, malo) {
        bala.kill();
        malo.kill();

    }



};