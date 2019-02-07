import { Component } from '@angular/core';

import { Platform, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { User } from './providers/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Profile',
      url: '/profile',
      icon: 'contact'
    },
    {
      title: 'Gallery',
      url: '/gallery',
      icon: 'photos'
    },
    {
      title: 'Sharing Sheet',
      url: '/sharingsheet',
      icon: 'document'
    },
    {
      title: 'Activities',
      url: '/activities',
      icon: 'walk'
    },
    {
      title: 'Fees',
      url: '/fee',
      icon: 'wallet'
    },
    {
      title: 'Attendance',
      url: '/attendance',
      icon: 'man'
    },
    {
      title: 'Food Menu',
      url: '/foodmenu',
      icon: 'grid'
    },
    {
      title: 'Support',
      url: '/support',
      icon: 'chatboxes'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private user: User,
    private router: Router,
    private menu: MenuController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logout() {
    this.menu.enable(false);

    this.router.navigate(['/login']);
    this.user.logout();

  }
}
