import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'NA'];
  // student = {center:{},program:{},parents:[],group:{}};
  student: any;
  studentForm: FormGroup;
  selectedStudent: string;
  studentId: number;
  parent: any = [];
  constructor(
    // private adminService: AdminService,
    private parentService: ParentService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.getStudents();
  }
  getStudents() {
    this.parentService.getStudentDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.parent = res;
        this.studentId = this.parent[0].id;
        this.getStudentsDetails(this.studentId);
      });
  }

  getStudentsDetails(std_id) {
    this.parentService.getDetailsByStudentId(std_id)
      .subscribe((res: any) => {
        this.student = res;
      });
  }


  editStudent() {

  }

  notify(parent, sms_email) {

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

}
