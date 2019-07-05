var nave;
var balas;
var timer = 0;
var delay = 400;
var fondoJuego;
var aparecer;
var puntos;
var vidas;
var txtPuntos;
var txtVidas;

var Iniciar = {

    preload: function() {
        juego.load.image('nave', 'imagenes/nave.png');
        juego.load.image('laser', 'imagenes/bala.png');
        juego.load.image('malo', 'imagenes/asteroide.png');
        juego.load.image('bg', 'imagenes/fondo.png');
    },
    create: function() {
        fondoJuego = juego.add.tileSprite(0, 0, 400, 540, 'bg');

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

        ///crear enemigos
        aparecer = juego.time.events.loop(1000, this.crearEnemigos, this);

        ///fix para disparar con un clic
        fondoJuego.inputEnabled = true;
        fondoJuego.events.onInputDown.add(this.disparar, this);

        ///puntajes
        puntos = 0;
        juego.add.text(20, 20, "Puntos", { font: "14px Arial", fill: "#FFF" });
        txtPuntos = juego.add.text(80, 20, "0", { font: "14px Arial", fill: "#FFF" });

        ///vidas
        vidas = 5;
        juego.add.text(120, 20, "Vidas", { font: "14px Arial", fill: "#FFF" });
        txtVidas = juego.add.text(180, 20, "5", { font: "14px Arial", fill: "#FFF" });

    },
    update: function() {
        fondoJuego.tilePosition.x -= 3;

        nave.rotation = juego.physics.arcade.angleToPointer(nave);
        juego.physics.arcade.overlap(balas, malos, this.colision, null, this);

        ///
        malos.forEachAlive(function(m) {
            if (m.position.x > 10 && m.position.x < 12) {
                vidas -= 1;
                txtVidas.text = vidas;
            }
        });

        if (vidas == 0) {
            juego.state.start("Terminado");
        }
    },
    //disparar una sola bala
    disparar: function() {
        console.log('disparar');
        timer = juego.time.now + delay;
        var bala = balas.getFirstDead();

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

        puntos++;
        txtPuntos.text = puntos;
    }



};