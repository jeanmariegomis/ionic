import { AlertController } from '@ionic/angular';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { TransService } from '../trans.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.page.html',
  styleUrls: ['./transaction.page.scss'],
})
export class TransactionPage implements OnInit {
  public envoi = {
    nomexp: '',
    prenomexp: '',
    telexp: '',
    montant: '',
    nomben: '',
    prenomben: '',
    telben: '',
    code: '',
    cni: ''
  };
  public fGroup: FormBuilder;
  loginUserData = {}

  constructor(private fBuilder: FormBuilder, private trans: TransService, private _auth: AuthService, private alertCtrl: AlertController) { 
  
  }

  async showAlert(){
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Envoyez avec succes!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  async showAlert1(){
    const alert = await this.alertCtrl.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'Retrait Reussi!.',
      buttons: ['OK']
    });

    await alert.present();
  }

  loginUser(){
    this.trans.envoiArgent(this.loginUserData ).subscribe(
      res => {console.log(res);
      
     }
      ,err =>{console.log(err);})
    }

    loginUser1(){
      this.trans.retraitArgent(this.loginUserData ).subscribe(
        res => {console.log(res);
        }
        ,err =>{console.log(err);})
      }

  form= new FormGroup({
    nomexp: new FormControl ('',Validators.required),
    prenomexp: new FormControl (''),
    telexp: new FormControl (''),
    montant: new FormControl (''),
    nomben: new FormControl (''),
    prenomben: new FormControl (''),
    telben: new FormControl (''),
    cni: new FormControl (''),
    code: new FormControl('')
  })

  logOut(){
    this._auth.logOut();
  }

  ngOnInit() {
  }
  submitForm(){
    console.log('submit!');
  }

}
