class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "Scene1" });
  }

  bcg;
  man;
  manText;
  woman;
  womanText;

  create() {
    this.bcg = this.add.image(155, 450, "bcg_room").setTint(0xffffff).setAlpha(0.25);
    this.man = this.add.image(-300, 450, "man");
    this.manText = this.add.image(-300, 480, "man-text").setScale(0.37);
    this.woman = this.add.image(-300, 450, "woman");
    this.womanText = this.add.image(-300, 480, "woman-text").setScale(0.37);

    let manAnimation = this.tweens.add({
      targets: this.man,
      delay: 0,
      duration: 1500,
      x: 300,
      y: 450,
      ease: "Back",
      onComplete: function (manAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
        manAnimation.remove();
      },
    });

    let manTextAnimation = this.tweens.add({
      targets: this.manText,
      delay: 150,
      duration: 1400,
      x: 300,
      y: 450,
      alpha: 1,
      ease: "Cubic",
      onComplete: function (manTextAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
        manTextAnimation.remove();
      },
    });

    let womanAnimation = this.tweens.add({
      targets: this.woman,
      delay: 1500,
      duration: 1500,
      x: 300,
      y: 450,
      ease: "Back",
      onComplete: function (womanAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
        womanAnimation.remove();
      },
    });

    let womanTextAnimation = this.tweens.add({
      targets: this.womanText,
      delay: 1650,
      duration: 1500,
      x: 300,
      y: 450,
      alpha: 1,
      ease: "Cubic",
      onComplete: function (womanTextAnimation, targets) {
        targets[0].x = -500;
        targets[0].y = -500;
        womanTextAnimation.remove();
      },
    });

    let bcgAnimation = this.tweens.add({
      targets: this.bcg,
      delay: 3000,
      alpha: 1,
    })

  }

}