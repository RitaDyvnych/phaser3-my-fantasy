class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene2" });
  }

  bcg;
  woman;
  choose;
  progress;
  dress1;
  dress2;
  cursor;

  create(){
    this.bcg = this.add.image(155, 450, "bcg_room").setTint(0x000000).setAlpha(0);
    this.woman = this.add.image(-300, 470, "woman2");
    this.choose = this.add.image(300, 30, "choose_your_dress").setAlpha(0);
    this.dress1 = this.add.image(160, 700, "dress1").setScale(0.5).setAlpha(0);
    this.dress2 = this.add.image(440, 700, "dress2").setScale(0.5).setAlpha(0);
    this.cursor = this.add.image(200, 1100, "cursor");

    this.onOrientationChange(
      this.orientation,
      this.woman,
      this.dress1,
      this.dress2,
      this.choose,
      this.cursor
    );
    this.scale.on('orientationchange', this.onOrientationChange, this);

    let bcgAnimation = this.tweens.add({
      targets: this.bcg,
      delay: 0,
      alpha: 0.8,
      ease: "Cubic",
    })

    let womanAnimation = this.tweens.add({
      targets: this.woman,
      delay: 20,
      duration: 1500,
      x: 300,
      y: 470,
      ease: "Cubic",
    });

    let chooseAnimation = this.tweens.add({
      targets: this.choose,
      delay: 500,
      duration: 1000,
      alpha: 1,
    });

    let dressAnimation = this.tweens.add({
      targets: [this.dress1, this.dress2],
      delay: 1000,
      duration: 1000,
      alpha: 1,
    });

    let cursorTopAnimation = this.tweens.add({
      targets: this.cursor,
      delay: 2000,
      duration: 500,
      x: this.scale.orientation === Phaser.Scale.PORTRAIT ? 200 : 220,
      y: this.scale.orientation === Phaser.Scale.PORTRAIT ? 730 : 790,
    })

    let cursorRightAnimation = this.tweens.add({
      targets: this.cursor,
      delay: 3000,
      duration: 500,
      x: this.scale.orientation === Phaser.Scale.PORTRAIT ? 400 : 500,
      completeDelay: 300,
        onComplete: function (cursorRightAnimation, targets) {
          targets[0].x = 190;
          targets[0].y = 1100;
        },
    })

    this.dress1.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      this.dressChoose();
      localStorage.setItem("Choosen-dress", "dress1");
      this.scene.add("Scene3", Scene3, true);
    }, this);

    this.dress2.setInteractive().on('pointerdown', function(pointer, localX, localY, event){
      this.dressChoose();
      localStorage.setItem("Choosen-dress", "dress2");
      this.scene.add("Scene3", Scene3, true);
    }, this);

  }
  update(){
    this.onOrientationChange(
      this.orientation,
      this.woman,
      this.dress1,
      this.dress2,
      this.choose,
      this.cursor
    );
    this.scale.on('orientationchange', this.onOrientationChange, this);
  }

  dressChoose() {
    this.bcg.setAlpha(0);
    this.cursor.setAlpha(0);
    this.choose.setAlpha(0);
    this.dress1.setAlpha(0);
    this.dress2.setAlpha(0);

    this.progress = this.add.image(300, 30, "progress0").setAlpha(0);

    let progressAnimation = this.tweens.add({
      targets: this.progress,
      duration: 300,
      alpha: 1,
      completeDelay: 300,
      onComplete: function (progressAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
      },
    });

    let womanAnimation2 = this.tweens.add({
      targets: this.woman,
      duration: 1500,
    });
  }

  onOrientationChange(orientation, woman, dress1, dress2, choose, cursor) {
    if (orientation === Phaser.Scale.PORTRAIT) {
      woman?.setScale(1);
      dress1?.setScale(0.5).setX(160).setY(700);
      dress2?.setScale(0.5).setX(440).setY(700);
      choose?.setScale(1).setY(30);
      cursor?.setScale(1);
    } else if (orientation === Phaser.Scale.LANDSCAPE) {
      woman?.setScale(0.45);
      dress1?.setScale(0.23).setX(230).setY(570);
      dress2?.setScale(0.23).setX(370).setY(570);
      choose?.setScale(0.5).setY(270);
      cursor?.setScale(0.5);
    }
  }
}