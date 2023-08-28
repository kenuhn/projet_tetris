export default () => {
  const canvasPrincipal = document.querySelector(".canvas1");
  const ctx = canvasPrincipal.getContext("2d");
  const canvasSecondaire = document.querySelector(".canvas2");
  const ctx2 = canvasSecondaire.getContext("2d");
  const plateauLongueur = canvasPrincipal.width;
  const plateauHauteur = canvasPrincipal.height;
  const carreauWidth = 40;
  const carreauHeight = 40;
  let positionX = 120;
  let positionY = -40;
  let point = null;
  let tabCoordonnee = [];
  let TetriminoO = [
    [1, 1],
    [1, 1],
  ];
  let TetriminoI = [
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
    [0, 1, 0, 0],
  ];
  let TetriminoS = [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ];
  let TetriminoZ = [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ];
  let TetriminoT = [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ];
  let TetriminoL = [
    [1, 0, 0],
    [1, 0, 0],
    [1, 1, 0],
  ];
  let TetriminoJ = [
    [0, 0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ];

  class Tetriminos {
    constructor(piece, couleur) {
      this.forme = piece;
      this.positionX = positionX;
      this.positionY = positionY;
      this.couleur = couleur;
      this.premierDessein = this.dessineTetriminos(
        this.forme,
        this.positionX,
        this.positionY,
        this.couleur
      );
    }
    deplacement(e) {
      if (
        this.checkBottom(this.forme, this.positionX, this.positionY) !== false
      ) {
        switch (e.key) {
          case "ArrowDown":
            this.vaBas();
            break;
          case "ArrowLeft":
            this.vaGauche();
            break;
          case "ArrowRight":
            this.vaDroite();
            break;
          case "ArrowUp":
            this.tourner();
            break;
          default:
            console.log("petit problème");
        }
      }
    }
    destroy() {
      return (
        (this.forme = null),
        (this.positionX = null),
        (this.positionY = null),
        (this.couleur = null),
        (this.premierDessein = null)
      );
    }
    vaBas() {
      if (
        this.checkBottom(this.forme, this.positionX, this.positionY) !== false
      ) {
        this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
        this.positionY += 40;
        this.dessineTetriminos(
          this.forme,
          this.positionX,
          this.positionY,
          this.couleur
        );
      } else {
        clearInterval(this.interval);
        tabCoordonnee.push(
          this.poussePositionActuelle(
            this.forme,
            this.positionX,
            this.positionY
          )
        );
        return false;
      }
    }

    vaGauche() {
      if (
        this.checkLeft(this.forme, this.positionX, this.positionY) !== false
      ) {
        this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
        this.positionX -= 40;
        this.dessineTetriminos(
          this.forme,
          this.positionX,
          this.positionY,
          this.couleur
        );
      }
    }

    vaDroite() {
      if (
        this.checkRight(this.forme, this.positionX, this.positionY) !== false
      ) {
        this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
        this.positionX += 40;
        this.dessineTetriminos(
          this.forme,
          this.positionX,
          this.positionY,
          this.couleur
        );
      }
    }
    dessineTetriminos(forme, positionX, positionY, couleur) {
      let matrice = forme;
      let formePositionY = positionY;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            ctx.beginPath();
            ctx.rect(
              formePositionX,
              formePositionY,
              carreauWidth,
              carreauHeight
            );
            ctx.fillStyle = couleur;
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }

    suprimeTetriminos(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            ctx.clearRect(
              formePositionX,
              formePositionY,
              carreauWidth,
              carreauHeight
            );
          }
        }
      }
    }

    checkBottom(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      let estPresent = false;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
          for (let j = 0; j < matrice[i].length; j++) {
            formePositionX += 40;
            if (matrice[i][j] === 1) {
              tabCoordonnee.forEach((tab) => {
                tab.forEach((obj) => {
                  if (
                    obj.x === formePositionX &&
                    obj.y === formePositionY + 40
                  ) {
                    estPresent = true;
                  }
                });
              });

              if (formePositionY + 40 >= 800 || estPresent === true) {
                return false;
              }
            }
          }
        }
      }
    }

    checkRight(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      let estPresent = false;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            tabCoordonnee.forEach((tab) => {
              tab.forEach((obj) => {
                if (obj.x === formePositionX + 40 && obj.y === formePositionY) {
                  estPresent = true;
                }
              });
            });
            if (formePositionX + 40 >= 400 || estPresent === true) {
              return false;
            }
          }
        }
      }
    }

    checkLeft(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      let estPresent = false;
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          formePositionX += 40;
          if (matrice[i][j] === 1) {
            tabCoordonnee.forEach((tab) => {
              tab.forEach((obj) => {
                if (obj.x === formePositionX - 40 && obj.y === formePositionY) {
                  estPresent = true;
                }
              });
            });
            if (formePositionX <= 0 || estPresent === true) {
              return false;
            }
          }
        }
      }
    }

    pivoter(forme) {
      let top = [];
      for (let i = 0; i < forme.length; i++) {
        top.push([]);
        for (let j = 0; j < forme[i].length; j++) {
          let n = forme[i].length - j;
          top[i][j] = forme[n - 1][i];
        }
      }
      if (
         this.checkLeft(top, this.positionX, this.positionY) === false ||
        this.checkRight(top, this.positionX, this.positionY) === false || 
        this.checkBottom(top, this.positionX, this.positionY) === false
      ) {
        return false;
      } else {
        return top;
      }
    }

    tourner() {
      if (this.pivoter(this.forme) !== false) {
        this.suprimeTetriminos(this.forme, this.positionX, this.positionY);
        this.forme = this.pivoter(this.forme);
        this.dessineTetriminos(
          this.forme,
          this.positionX,
          this.positionY,
          this.couleur
        );
      }
    }

    poussePositionActuelle(forme, positionX, positionY) {
      let matrice = forme;
      let formePositionY = positionY;
      let newTabCoordonnee = [];
      for (let i = 0; i < matrice.length; i++) {
        let formePositionX = positionX;
        if (matrice[i].includes(1)) {
          formePositionY += 40;
          for (let j = 0; j < matrice[i].length; j++) {
            formePositionX += 40;
            if (matrice[i][j] === 1) {
              let coordonnee = {
                x: formePositionX,
                y: formePositionY,
                couleur: this.couleur,
              };
              newTabCoordonnee.push(coordonnee);
            }
          }
        }
      }
      return newTabCoordonnee;
    }
  }

  class Interface {
    constructor() {
      this.forme = this.newPiece();
      this.newCouleur = this.creeCouleur(this.forme);
      this.tetriminos = new Tetriminos(this.forme, this.newCouleur);
      this.futureForme = this.newPiece();
      console.log(this.futureForme);
      this.dessineFutureTetriminos(
        this.futureForme,
        this.creeCouleur(this.futureForme)
      );

      this.supprimeRange = setInterval(this.suprimeRange.bind(this), 800);
      this.TetriminosInterval = setInterval(this.gameLoop.bind(this), 800);
      this.checkTop = setInterval(this.checkTop.bind(this), 800);
      document.addEventListener("keydown", (e) => {
        this.tetriminos.deplacement(e);
      });
    }

    gameLoop() {
      if (this.tetriminos.vaBas() === false) {
        this.ajoutePoint(20);
        this.tetriminos.destroy();
        this.tetriminos = new Tetriminos(
          this.futureForme,
          this.creeCouleur(this.futureForme)
        );
        this.futureForme = this.newPiece();

        this.dessineFutureTetriminos(
          this.futureForme,
          this.creeCouleur(this.futureForme)
        );
      }
    }
    creeCouleur(forme) {
      let couleur = null;
      switch (forme) {
        case TetriminoS:
          couleur = "red";
          break;
        case TetriminoZ:
          couleur = "blue";
          break;
        case TetriminoL:
          couleur = "yellow";
          break;
        case TetriminoJ:
          couleur = "green";
          break;
        case TetriminoT:
          couleur = "grey";
          break;
        case TetriminoO:
          couleur = "pink";
          break;
        case TetriminoI:
          couleur = "orange";
          break;

        default:
          console.log("Erreur couleur ");
      }
      return couleur;
    }

    gameOver() {
      let finPartie = document.querySelector(".gameOver");
      clearInterval(this.supprimeRange);
      clearInterval(this.TetriminosInterval);
      clearInterval(this.checkTop);
      return (finPartie.style.display = "block");
    }

    newPartie () {

    }

    checkTop() {
      tabCoordonnee.forEach((tab) => {
        tab.forEach((obj) => {
          if (obj.y === 0) {
            this.gameOver();
          }
        });
      });
    }

    choisitHasard(tabFormes) {
      let randomIndex = Math.floor(Math.random() * tabFormes.length);
      return tabFormes[randomIndex];
    }

    ajoutePoint(nombre) {
      point += nombre;
      let elPoint = document.querySelector(".point");
      elPoint.innerHTML = point;
    }

    newPiece() {
      let tabFormes = [
        TetriminoO,
        TetriminoI,
        TetriminoS,
        TetriminoT,
        TetriminoL,
        TetriminoJ,
        TetriminoZ,
      ];
      const piece = this.choisitHasard(tabFormes);

      return piece;
    }

    suprimeRange() {
      let newTab = [];
      //tabCoordonnée est le tableau qui contient pour chaque pixel toutes les positions x et position y
      tabCoordonnee.forEach((tab) => {
        tab.forEach((obj) => {
          newTab.push(obj);
        });
      });
      //Pour chaque coordonné de newtab
      let tableauRempli = [];
      newTab.forEach((el) => {
        let finTab = []; //chaque tableau de propriété ayant les mêmes coordoonés y
        newTab.forEach((obj) => {
          if (el.y === obj.y) {
            finTab.push(obj);
          }
        });
        if (finTab.length === 10) {
          console.log("rangé complété");
          this.ajoutePoint(40);
          let rangerASupprime;
          finTab.forEach((el) => {
            tableauRempli.push(el);
            rangerASupprime = el.y;
          });

          tabCoordonnee = tabCoordonnee.map((el) => {
            el = el.filter((tab) => {
              return !finTab.some((j) => tab.y === j.y);
            });

            return el;
          });

          ctx.clearRect(0, 0, canvasPrincipal.width, canvasPrincipal.height);
          for (let i = 0; i < tabCoordonnee.length; i++) {
            for (let j = 0; j < tabCoordonnee[i].length; j++) {
              let obj = tabCoordonnee[i][j];
              if (rangerASupprime > obj.y) {
                obj.y = obj.y + 40;
                ctx.beginPath();
                ctx.rect(obj.x, obj.y, carreauWidth, carreauHeight);
                ctx.fillStyle = obj.couleur;
                ctx.fill();
                ctx.closePath();
              } else {
                ctx.beginPath();
                ctx.rect(obj.x, obj.y, carreauWidth, carreauHeight);
                ctx.fillStyle = obj.couleur;
                ctx.fill();
                ctx.closePath();
              }
            }
          }
          finTab = [];
        }
      });
    }
    dessineFutureTetriminos(forme, couleur) {
      ctx2.clearRect(0, 0, canvasSecondaire.width, canvasSecondaire.height);
      let matrice = forme;
      console.log(matrice);
      let formePositionY = -20;

      // calculer la position de départ de la forme en fonction de la largeur de la forme et la largeur du canvas
      let formePositionX =
        canvasSecondaire.width / 2 - (matrice[0].length / 2) * 30;

      for (let i = 0; i < matrice.length; i++) {
        if (matrice[i].includes(1)) {
          formePositionY += 30;
        }
        for (let j = 0; j < matrice[i].length; j++) {
          if (matrice[i][j] === 1) {
            ctx2.beginPath();
            ctx2.rect(formePositionX + j * 30, formePositionY, 30, 30);
            ctx2.fillStyle = couleur;
            ctx2.fill();
            ctx2.closePath();
          }
        }
      }
    }
  }
  document.querySelector('.reload').addEventListener("click", (e) => {
    e.preventDefault()
    location.reload();

  })
  return new Interface();
};
