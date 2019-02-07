import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';
import { ModalController } from '@ionic/angular';
import { EditFormComponent } from './edit-form/edit-form.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  student: any;
  studentDetailssegment = 'student';
  studentForm: FormGroup;
  selectedStudent: string;
  studentId: number;
  parent: any = [];
  studentchange = false;
  slideOpts = {
    effect: 'flip'
  };

  constructor(
    private parentService: ParentService,
    private alertService: AlertService,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.getStudents();
  }
  getStudents() {
    this.alertService.presentLoading();
    this.parentService.getStudentDetails()
      .subscribe((res: any) => {
        this.parent = res;
        this.studentId = this.parent[0].id;
        this.getStudentsDetails(this.studentId);
      }, (err) => {
        this.alertService.hideLoader();
      }
      );
  }

  getStudentsDetails(std_id) {
    this.parentService.getDetailsByStudentId(std_id)
      .subscribe((res: any) => {
        this.student = res;
        this.alertService.hideLoader();

      }, (err) => {
        this.alertService.hideLoader();

      });
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditFormComponent,
      componentProps: { student: this.student }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    console.log(data);
    if (data) {

      this.student = data.student;
    }
  }

  editStudent() {
    this.presentModal();
  }

  notify(parent, sms_email) {
    console.log(parent);

    if (sms_email === 'sms') {
      this.parentService.smsNotification(parent)
        .subscribe((res: any) => {
          this.alertService.successAlert('SMS Notification Change Successfuly ');
        });
    } else {
      this.parentService.emailNotification(parent)
        .subscribe((res: any) => {
          this.alertService.successAlert('Email Notification Change Successfuly ');
        });
    }
  }

  // uploadProfilePic(student: any, file: any) {
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   if (file) {
  //     this.adminService.uploadStudentProfilePic(student.id, formData).subscribe(
  //       (response: any) => {
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);
  //         reader.onload = function (e: any) {
  //           $('#student-profile').attr('src', e.target.result);
  //         };
  //       },
  //       (error: any) => {
  //         this.alertService.errorAlert(error);
  //       }
  //     );
  //   }
  // }

  getSelectedStudent(event) {
    this.studentchange = true;
    this.alertService.presentLoading();
    this.getStudentsDetails(event);

  }

}
