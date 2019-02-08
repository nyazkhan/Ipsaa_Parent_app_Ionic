import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';

@Component({
  selector: 'app-fee',
  templateUrl: './fee.page.html',
  styleUrls: ['./fee.page.scss'],
})
export class FeePage implements OnInit {
  studentfeeledger: any;
  studentfeeledgerId: number;
  fee: any;
  checkoutDetails: any;
  studentFeeDetailSsegment = 'details';
  studentId: number;
  parent: any = [];
  myDetailId: any;
  linkPage: string;
  studentchange: boolean;
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private parentService: ParentService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getStudents();
    this.getMyParentDeatil();
  }
  getStudents() {
    this.parentService.getStudentDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.parent = res;
        this.studentId = this.parent[0].id;
        this.getStudentsDetails(this.studentId);
        this.getStudentFeeledgerDetails(this.studentId);
      });
  }

  getStudentsDetails(std_id) {
    this.parentService.getStudentFee(std_id)
      .subscribe((res: any) => {
        this.fee = res;
        if (this.fee.program.id !== 72932732558618) {
          this.linkPage = 'https://portal.ipsaa.in/#/pp/checkout.html!/app/checkoutdetails/' +
            this.studentfeeledger.id + '/' + this.myDetailId;
        } else {
          this.linkPage = 'https://portal.ipsaa.in/#/pp/checkout.html!/app/ipsaaclubcheckoutdetails/'
            + this.studentfeeledger.id + '/' + this.myDetailId;
        }
        if (this.studentchange) {

          this.alertService.hideLoader();
        }
      });
  }

  onStudentChange(event) {
    this.studentchange = true;
    this.alertService.presentLoading();
    this.getStudentsDetails(event);
    this.getStudentFeeledgerDetails(event);
  }

  getStudentFeeledgerDetails(std_id) {
    this.parentService.getStudentFeeledger(std_id)
      .subscribe((res: any) => {
        this.studentfeeledger = res;
        this.studentfeeledgerId = res.id;
        this.getFullBillingDetails();
      });
  }

  getMyParentDeatil() {
    this.parentService.getMyDetails()
      .subscribe((res: any) => {
        this.myDetailId = res.id;
      });
  }

  getFullBillingDetails() {
    this.parentService.hdfcCheckout(this.studentfeeledgerId, this.myDetailId)
      .subscribe((res: any) => {
        this.checkoutDetails = res;
      });
  }


  slipDownload(id) {
    this.parentService.downloadFeeSlip(id)
      .subscribe((res: any) => {
        const blob = new Blob([res.bytes], {
        });
        // FileSaver.saveAs(blob, res.fileName);
      });
  }


  receiptDownload(id) {
    this.parentService.downloadFeeReceipt(id)
      .subscribe((res: any) => {
        const blob = new Blob([res.bytes], {
        });
        // FileSaver.saveAs(blob, res.fileName);
      });
  }



}
