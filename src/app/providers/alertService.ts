import { Injectable, Inject } from '@angular/core';
import swal from 'sweetalert';
import { Subject } from 'rxjs';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
@Injectable({ providedIn: 'root' })
export class AlertService {


  loading: any;

  constructor(public alertController: AlertController,
    public loader: LoadingController,
    public toastController: ToastController
  ) { }

  async errorAlert(msg: any) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }





  async successAlert(msg: string) {
    const confrm = await this.alertController.create({
      header: 'Success',
      message: msg,
    });

    await confrm.present();
  }



  async presentLoading(text?: string) {
    this.loading = await this.loader.create({
      message: text || '',

    });
    return await this.loading.present();
  }


  async hideLoader() {

    this.loading.dismiss();

  }



  async presentToastWithOptions(msg, pos?, showCloseBtn?: boolean) {
    const toast = await this.toastController.create({
      message: msg,
      duration: showCloseBtn ? 5000 : 3000,
      position: pos || 'top',
      showCloseButton: showCloseBtn,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  // public errorAlert(message: any) {
  //   swal({
  //     title: 'Error',
  //     text: message,
  //     icon: 'error'
  //   });
  // }
}
