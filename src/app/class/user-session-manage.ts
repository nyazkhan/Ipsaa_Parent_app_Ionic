// import { Events, AlertController, MenuController } from '@ionic/angular';
// import { AuthService } from '../providers/auth.service';
// import { NetworkService } from '../providers/network.service';

// export class UserSessionManage {
//     rootPage: any;
//     sideMenuOptions: Array<any>;
//     userImage: string;
//     userName: string;
//     userEmail: string;
//     activePage: any;


//     constructor(
//         public events: Events,
//         // public appCtrl: App,
//         public authService: AuthService,
//         public alertCtrl: AlertController,
//         public networkService: NetworkService,
//         public menu: MenuController,
//     ) {

//         this.handleEvents();
//         this.networkService.checkNetworkStatus();
//         this.hasLoggedIn();
//     }

//     public handleEvents() {
//         this.events.subscribe('user:login', () => {
//             this.login();
//         });

//         this.events.subscribe('user:logout', () => {
//             this.logout();
//         });
//         this.events.subscribe('offline', () => {
//             this.offline();
//         });
//         this.events.subscribe('online', () => {
//             this.online();
//         });
//         this.events.subscribe('rootPageChange', (newRootPage: string) => {
//             this.activePage = newRootPage;
//         });
//     }


//     public hasLoggedIn() {
//         if (this.authService.isLoggedIn()) {
//             this.authService.fetchUserDetails()
//                 .subscribe((res) => {
//                     this.rootPage = 'profile';
//                     this.activePage = 'profile';
//                     this.menu.enable(true);
//                 }, (err: any) => {
//                     localStorage.clear();
//                     this.appCtrl.getRootNavs()[0].setRoot('Login', {}, { animate: true, direction: 'forward' });
//                 });

//         } else {
//             this.rootPage = 'Login';
//         }
//     }

//     public login() {
//         this.appCtrl.getRootNavs()[0].setRoot('HomePage', {}, { animate: true, direction: 'forward' });
//         this.activePage = 'HomePage';
//         this.menu.enable(true);
//     }


//     public logout() {

//         localStorage.clear();
//         this.appCtrl.getRootNavs()[0].setRoot('LoginPage', {}, { animate: true, direction: 'forward' });
//     }

//     public offline() {

//     }

//     public online() {

//     }


// }



