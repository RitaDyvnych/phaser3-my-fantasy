class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene3" });
  }

  woman;
  bag1;
  bag2;
  accessory1;
  accessory2;
  accessory3;
  place1;
  place2;
  choose;
  progress;
  cursor;
  man;
  manText;
  btnPlay;
  bcg_evening;
  bcg_sea;
  outfit;
  count = 0;

  create() {
    const dress = localStorage.getItem("Choosen-dress");

    this.woman = dress === "dress1" ? this.add.image(300, 465, "woman-dress1").setAlpha(0)
            : this.add.image(300, 465, "woman-dress2").setAlpha(0);

    this.bag1 = this.add.image(160, 700, "bag1").setAlpha(0);
    this.bag2 = this.add.image(440, 700, "bag2").setAlpha(0);

    this.accessory1 = this.add.image(160, 700, "accessory1").setAlpha(0).setDepth(1);
    this.accessory2 = dress === "dress1" ? this.add.image(440, 700, "accessory2").setAlpha(0).setDepth(1)
            : this.add.image(440, 700, "accessory3").setScale(0.5).setAlpha(0).setDepth(1);

    this.place1 = this.add.image(160, 700, "place1").setScale(0.5).setAlpha(0).setDepth(1);
    this.place2 = this.add.image(440, 700, "place2").setScale(0.5).setAlpha(0).setDepth(1);

    this.bcg_evening = this.add.image(155, 450, "bcg_evening").setAlpha(0);
    this.bcg_sea = this.add.image(155, 450, "bcg_sea").setAlpha(0);

    this.progress = this.add.image(300, 30, "progress1").setAlpha(0);
    this.choose = this.add.image(300, 30, "choose_your_bag").setAlpha(0);
    this.cursor = this.add.image(200, 1100, "cursor").setDepth(3);

    this.manText = dress === "dress1" ? 
        this.add.image(-300, 500, "man-text-win").setScale(0.5).setDepth(3).setAlpha(0)
        :this.add.image(-300, 500, "man-text-loose").setScale(0.5).setDepth(3).setAlpha(0);
    this.btnPlay = dress === "dress1" ? 
        this.add.image(300, 800, "btn_play_now").setDepth(4).setAlpha(0)
        :this.add.image(300, 800, "btn_retry").setDepth(4).setAlpha(0);

    let womanAnimation = this.tweens.add({
      targets: this.woman,
      delay: 500,
      duration: 600,
      alpha: 1,
      ease: "Cubic",
    });

    let bagAnimation = this.tweens.add({
      targets: [this.bag1, this.bag2],
      delay: 900,
      duration: 700,
      alpha: 1,
    });

    let progressAnimation = this.tweens.add({
      targets: this.progress,
      delay: 300,
      duration: 600,
      alpha: 1,
      // completeDelay: 500,
      onComplete: function (progressAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
      },
    });

    let chooseAnimation = this.tweens.add({
      targets: this.choose,
      delay: 1000,
      duration: 600,
      alpha: 1,
    });

    this.bag1.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.bagChoose("woman_dress1_bag1", "woman_dress2_bag1");
      },this);

    this.bag2.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.bagChoose("woman_dress1_bag2", "woman_dress2_bag2");
      },this);

    this.accessory1.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.accessoryChoose(
          "woman_dress1_bag1_accessory1",
          "woman_dress1_bag2_accessory1",
          "woman_dress2_bag1_accessory1",
          "woman_dress2_bag2_accessory1");
      },this);

    this.accessory2.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.accessoryChoose(
          "woman_dress1_bag1_accessory2",
          "woman_dress1_bag2_accessory2",
          "woman_dress2_bag1_accessory3",
          "woman_dress2_bag2_accessory3");
      },this);


      this.place1.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.placeChoose(this.bcg_evening);
      },this);

      this.place2.setInteractive().on("pointerdown", function (pointer, localX, localY, event) {
        this.placeChoose(this.bcg_sea);
      },this);

  }

  update() {
    this.count += 1;

    if (this.count === 120) {

      let cursorTopAnimation = this.tweens.add({
        targets: this.cursor,
        duration: 500,
        x: this.scale.orientation === Phaser.Scale.PORTRAIT ? 200 : 220,
        y: this.scale.orientation === Phaser.Scale.PORTRAIT ? 730 : 790,
      });

      let cursorRightAnimation = this.tweens.add({
        targets: this.cursor,
        delay: 700,
        duration: 500,
        x: this.scale.orientation === Phaser.Scale.PORTRAIT ? 400 : 500,
        completeDelay: 300,
        onComplete: function (cursorRightAnimation, targets) {
          targets[0].x = 190;
          targets[0].y = 1100;
        },
      });
  }
}

  bagChoose(item1, item2){
    this.count = 0;
    let womanAnimationBag = null;
    switch (this.woman.texture.key) {
      case "woman-dress1":
        this.woman = this.add.image(300, 465, item1).setAlpha(0);
        womanAnimationBag = this.tweens.add({
          targets: this.woman,
          duration: 700,
          alpha: 1,
          ease: "Cubic",
        });
        break;
      case "woman-dress2":
        this.woman = this.add.image(300, 465, item2).setAlpha(0);
        womanAnimationBag = this.tweens.add({
          targets: this.woman,
          duration: 700,
          alpha: 1,
          ease: "Cubic",
        });
        break;

      default:
        break;
    }

    this.bag1.setAlpha(0);
    this.bag2.setAlpha(0);

    let accessoryAnimation = this.tweens.add({
      targets: [this.accessory1, this.accessory2],
      delay: 300,
      duration: 500,
      alpha: 1,
    });

    this.progress.setAlpha(0);
    this.progress = this.add.image(300, 30, "progress2").setAlpha(0);
    this.choose.setAlpha(0);
    this.choose = this.add.image(300, 35, "choose_your_accessory").setAlpha(0);

    let progressAnimation2 = this.tweens.add({
      targets: this.progress,
      delay: 200,
      duration: 1000,
      alpha: 1,
      onComplete: function (progressAnimation2, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
      },
    });

    let chooseAnimation2 = this.tweens.add({
      targets: this.choose,
      delay: 900,
      duration: 700,
      alpha: 1,
    });
  }
  accessoryChoose(item1, item2, item3, item4){
    this.count = 0;
    let womanAnimationBagAccessory = null;

    switch (this.woman.texture.key) {
      case "woman_dress1_bag1":
        this.woman = this.add.image(300, 465, item1).setAlpha(0);
        womanAnimationBagAccessory = this.tweens.add({
          targets: this.woman,
          duration: 700,
          alpha: 1,
          ease: "Cubic",
        });
        break;
      case "woman_dress1_bag2":
        this.woman = this.add.image(300, 465, item2).setAlpha(0);
        womanAnimationBagAccessory = this.tweens.add({
          targets: this.woman,
          duration: 700,
          alpha: 1,
          ease: "Cubic",
        });
        break;
      case "woman_dress2_bag1":
        this.woman = this.add.image(300, 465, item3).setAlpha(0);
        womanAnimationBagAccessory = this.tweens.add({
          targets: this.woman,
          duration: 700,
          alpha: 1,
          ease: "Cubic",
        });
        break;
      case "woman_dress2_bag2":
          this.woman = this.add.image(300, 465, item4).setAlpha(0);
          womanAnimationBagAccessory = this.tweens.add({
            targets: this.woman,
            duration: 700,
            alpha: 1,
            ease: "Cubic",
          });
          break;

      default:
        break;
    }

    this.accessory1.setAlpha(0);
    this.accessory2.setAlpha(0);

    let placeAnimation = this.tweens.add({
      targets: [this.place1, this.place2],
      delay: 300,
      duration: 500,
      alpha: 1,
    });

    this.progress.setAlpha(0);
    this.progress = this.add.image(300, 30, "progress3").setAlpha(0);
    this.choose.setAlpha(0);
    this.choose = this.add.image(300, 35, "choose_your_place").setAlpha(0);

    let progressAnimation3 = this.tweens.add({
      targets: this.progress,
      delay: 200,
      duration: 1000,
      alpha: 1,
      onComplete: function (progressAnimation3, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
      },
    });

    let chooseAnimation3 = this.tweens.add({
      targets: this.choose,
      delay: 900,
      duration: 700,
      alpha: 1,
    });
  }

  placeChoose(bcg){
    this.count = 200;
    this.man = this.add.image(300, 465, "man2").setAlpha(0).setDepth(1);

    this.place1.setAlpha(0);
    this.place2.setAlpha(0);
    this.choose.setAlpha(0);

    this.outfit = this.add.image(300, 495, this.woman.texture.key).setDepth(2).setAlpha(0);

    bcg.setAlpha(1).setDepth(1);

    let manAnimation = this.tweens.add({
      targets: this.man,
      duration: 500,
      alpha: 1,
      x: 350,
    });

    let womanFinalAnimation = this.tweens.add({
      targets: this.outfit,
      delay: 800,
      duration: 500,
      alpha: 1,
      x: 190,
    });

    let manTextAnimation = this.tweens.add({
      targets: this.manText,
      delay: 1300,
      duration: 1800,
      alpha: 1,
      x: 300,
      ease: "Cubic",
      onComplete: function (animateTextMan, targets) {
        targets[0].x = -500;
      },
    });

    let btnPlayAnimation = this.tweens.add({
      targets: this.btnPlay,
      delay: 2800,
      duration: 3000,
      alpha: 1,
      ease: "Cubic",
    });

    this.btnPlay.setInteractive();
    this.btnPlay.on("pointerup", function () {
      window.open(
        "https://apps.apple.com/us/app/id1491717191?platform=ipad",
        "_blank"
      );
    });
  }
}