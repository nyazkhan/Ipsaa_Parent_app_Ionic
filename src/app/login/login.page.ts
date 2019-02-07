import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, MenuController, Events, NavController } from '@ionic/angular';
import { User } from '../providers/user';
import { Router } from '@angular/router';
import { AlertService } from '../providers/alertService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  submitAttempt = false;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    private userService: User,
    private alertservice: AlertService,
    // private events: Events,
    private menu: MenuController,
    // private modalCtrl: ModalController,
    private router: Router
  ) {
  }


  ngOnInit() {
    this.menu.enable(false);
    if (this.userService.isLoggedIn()) {
      this.router.navigate(['/profile']);
    }
    this.loginForm = this.formBuilder.group({
      email: ['khannyaz1705@gmail.com', Validators
        .compose([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
      password: ['ajay0211', Validators.required]
    });
    // this.authService.isLoggedIn();
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }



  login() {
    // this.alertservice.presentLoading(' please wait..');
    this.submitAttempt = true;
    this.userService.login(this.loginForm.value).subscribe(
      (response: any) => {
        // this.alertservice.hideLoader().then(() => {

          this.onSuccess();
        // });
        this.submitAttempt = false;
      },
      (error: any) => {
        // this.alertservice.hideLoader();
        this.submitAttempt = false;

      }
    );
  }
  onSuccess() {
    const user: any = this.userService.getUser();
    if (user.domain === '/pp/') {
      console.log(user);

      this.router.navigate(['/profile']);
    } else {

      this.userService.logout();
      // this.router.navigate(['/login']);

      this.alertservice.presentToastWithOptions(' User Name or Password is incorrect..');

      // this.router.navigate(['mis']);
    }
  }
  ionViewWillLeave() {
    this.menu.enable(true);
  }
}
