import Phaser from "phaser"

class Fruit extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, key, type) {
        super(scene, x, y, key, type);
        this.scene = scene;
        this.x = x;
        this.y = y; 
    }
}