import { Component, OnInit, Input } from '@angular/core';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {


  studentDetailssegment: any;
  studentDetails: any = {};
  @Input() student: any;
  constructor(
    private parentservice: ParentService,
    private alertservice: AlertService,
    public modalController: ModalController,
  ) { }

  ngOnInit() {
    console.log(this.student);

    this.studentDetails = JSON.parse(JSON.stringify(this.student));
    this.studentDetailssegment = this.studentDetails.parents[0];
  }

  goBack() {
    this.modalController.dismiss();

  }
  saveDtailse() {
    this.parentservice.updateStudentDetails(this.studentDetails)
      .subscribe((res) => {
        this.student = Object.assign({}, );
        this.alertservice.successAlert('Details Update');
        this.modalController.dismiss({student: res});
      });
  }

}
