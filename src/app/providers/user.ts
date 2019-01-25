import { Injectable } from '@angular/core';
import { CustomHttpService } from './http/custom-http.service';
import { StorageService } from './localStorage';
import { map } from 'rxjs/operators';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like 'id', 'name', 'email', etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: CustomHttpService, public storage: StorageService) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */

  getUser() {
    if (this.storage.getData('ngStorage-token')) {
      const token = this.storage.getData('ngStorage-token');
      let user = {};
      if (typeof token !== 'undefined') {
        user = JSON.parse(this.urlBase64Decode(token.split('.')[1]));
      }
      return user;
    }
  }

  urlBase64Decode(str) {
    let output = str.replace('-', '+').replace('_', '/');
    switch (output.length % 4) {
      case 0:
        break;
      case 2:
        output += '==';
        break;
      case 3:
        output += '=';
        break;
      default:
        throw new Error('Illegal base64url string!');
    }
    return window.atob(output);
  }

  login(accountInfo: any) {
    return this.api.post('login', accountInfo).pipe(map(response => {
      this._loggedIn(response);
      return response;
    }));
  }




  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    const seq = this.api.post('signup', accountInfo);

    seq.subscribe(
      (res: any) => {
        // If the API returned a successful response, mark the user as logged in
        if (res.status === 'success') {
          this._loggedIn(res);
        }
      },
      err => {
        console.error('ERROR', err);
      }
    );

    return seq;
  }





  getTokenForForgetPassword(email) {
    return this.api.post('mis/resetpassword/email', email);
  }


  getCreateNewPassword(pwd_token) {
    return this.api.post('mis/resetpassword/', pwd_token);
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    // this.storage.storeData('ngStorage-token', null);
    // this.storage.storeData('ngStorage-privileges', null);
    // this._user = null;
    this.storage.clearData();
    location.reload();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this.storage.storeData('ngStorage-token', resp.token);
    this.storage.storeData('ngStorage-privileges', resp.privileges);
    this._user = resp.user;
  }
}
