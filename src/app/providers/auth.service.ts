import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
// import { File } from '@ionic-native/file';
import { BASEURL } from './app.constant';
import { CustomHttpService } from './http/custom-http.service';
import { map } from 'rxjs/operators';


@Injectable()
export class AuthService {

    constructor(
        private http: CustomHttpService,
        private fileTransfer: FileTransfer
    ) { }

    login(loginCredentials: any) {
        const xAccountHeader = new HttpHeaders()
            .set('x-account', 'customer');
        return this.http.post(`/oauth/token?grant_type=password&username=${loginCredentials.contactNo}&password=
        ${loginCredentials.password}`, {}, xAccountHeader);
    }

    logout() {
        return this.http.get('/c/logout');
    }



    isLoggedIn() {
        return localStorage.getItem('access_token') ? true : false;
    }

    saveToken(token: string) {
        localStorage.setItem('access_token', token);
    }

    fetchUserDetails() {
        return this.http.get('/customer-info').pipe(
            map((res) => {
                this.saveUserDetails(res);
                return res;
            }));
    }

    saveUserDetails(userInfo: any) {

        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }

    editUserDetails(data: any) {
        return this.http.put('/c', data);
    }

    /**edit address if present, otherwise add that address */
    editUserAddress(data: any, addId?: number) {
        if (addId) {
            return this.http.put(`/c/address/${addId}`, data);
        }
        return this.http.post(`/c/address`, data);
    }

    // PROFILE PIC ADDITION
    uploadPic(image: any) {
        const myFileName: string = this.generateImageName();

        const options: FileUploadOptions = {
            fileKey: 'picture',
            fileName: myFileName,
            mimeType: 'multipart/form-data',
            chunkedMode: false,
            httpMethod: 'POST',
            headers: {
                'Authorization': 'Bearer' + localStorage.getItem('access_token')
            }
        };
        const transfer: FileTransferObject = this.fileTransfer.create();
        return transfer.upload(image, BASEURL + `/c/picture`, options, false);
    }

    generateImageName() {
        // generate unique imagename based on current date-time(upto seconds)
        const date = new Date().toISOString();
        return 'IMG_' + date.substring(0, date.indexOf('.')) + '.jpg';
    }



}
