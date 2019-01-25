import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable()

export class CustomService {

    private loading: any;
    private toast: any;

    constructor(
        private l: LoadingController,
        private toastCtrl: ToastController
    ) { }

    public showLoader(text?: string) {

        this.loading = this.l.create({
          message: text || 'Please wait...'
        });
       return this.loading.present();
    }

    public hideLoader() {

        this.loading.dismiss();

    }

    public showToast(msg, pos?, showCloseBtn?: boolean) {


        this.toast = this.toastCtrl.create({
            message: msg,
            duration: showCloseBtn ? 5000 : 3000,
            position: pos || 'bottom',
            showCloseButton: showCloseBtn,
            closeButtonText: 'Ok'
        });
        this.toast.present();
    }
  }
