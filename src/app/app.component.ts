import { Component, OnInit } from '@angular/core';
import { importExpr } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  // tslint:disable-next-line:max-line-length
  letters = ['A', 'Ą', 'B', 'C', 'Ć', 'D', 'E', 'Ę', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'Ł', 'M', 'N', 'Ń', 'O', 'Ó', 'P', 'R', 'S', 'Ś', 'T', 'U', 'W', 'Y', 'Z', 'Ź', 'Ż'];
  gamePicture = '../assets/img/s0.jpg';
  maxFailure = 9;
  password = 'WLAZŁ KOTEK NA PŁOTEK I MRUGA';
  hiddenPass = '';
  failure = 0;
  color = '';
  inGame = true;
  win = false;
  lose = false;

  ngOnInit(): void {
    this.hiddePasword();
  }

  gameReset() {
    this.gamePicture = '../assets/img/s0.jpg';
    this.inGame = true;
    this.win = false;
    this.lose = false;
    this.failure = 0;
    this.hiddenPass = '';
    this.hiddePasword();
  }

  hiddePasword() {
    let value = this.password.split('');
    let str = '';
    value.forEach(function(val) {
      if ( val !== ' ') {
          str += '_';
      } else {
        str += ' ';
      }
    } );
    this.hiddenPass = str;
  }

  searchLetter(letter): Array<number> {
    let letterPos: Array<number> = [];
    for (let i = 0; i < this.password.length ; i ++) {
      if (letter === this.password[i]) {
        letterPos.push(i);
      }
    }
    return letterPos;
  }

  showLetters(lettersTab: Array<number>, letter) {
    let pass = this.hiddenPass.split('');
    console.log(pass);
    for (let i = 0; i < lettersTab.length ; i ++) {
         pass[lettersTab[i]] = letter;
    }
    this.hiddenPass = pass.join('');
  }


  letterClick(letter: string): void {
    if (this.password.includes(letter)) {
      let tab = this.searchLetter(letter);
      this.showLetters(tab, letter);
      this.color = 'green';
    } else {
      this.color = 'red';
      this.failure ++;
      this.changePicture(this.failure);
    }
    this.changeClass(letter, this.color);
    console.log(this.failure);
    this.checkGameStatus();
    this.changePicture(this.failure);
  }

  checkGameStatus() {
    if (this.failure === this.maxFailure) {
      this.inGame = false;
      this.win = false;
      this.lose = true;
    }
    if (this.hiddenPass === this.password) {
      this.inGame = false;
      this.win = true;
      this.lose = false;
    }

  }

  changeClass(letter, color) {
    let el = document.getElementById(letter);
    el.style.borderColor = color;
    el.style.pointerEvents = 'none';

  }

  changePicture(failure) {
    this.gamePicture = '../assets/img/s' + failure + '.jpg';
 }
}
