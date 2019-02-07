import { Injectable } from '@angular/core';
import { Events } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  constructor(private events: Events, private network: Network) { }

//   checkNetworkStatus() {

//       this.network.onConnect().subscribe(() => {

//           this.events.publish('online');
//       });
//       this.network.onDisconnect().subscribe(() => {
//           this.events.publish('offline');
//       });
//   }
}
