import { Component, OnInit } from '@angular/core';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';
import { ModalController } from '@ionic/angular';
import { QueryComponent } from './query/query.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  query: any;
  queries: any = [];
  parent: any;
  studentId: any;
  soQuiry: boolean;
  replyText: any;
  QueryTittle: string;
  newQueryMsg: string;
  selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  constructor(
    private modalController: ModalController,
    private parentService: ParentService,
    private alertService: AlertService,
  ) {
  }

  ngOnInit() {
    this.getStudents();

  }

  getStudents() {
    this.parentService.getStudentDetails()
      .subscribe((res: any) => {
        console.log(res);
        this.parent = res;
        this.studentId = this.parent[0].id;
        this.getQuerie();
      });
  }


  getQuerie() {
    this.parentService.getQueries()
      .subscribe((res: any) => {
        this.queries = res;
        // this.studentId = this.parent[0].id;
      });
  }

  async presentModal(QueryId) {
    const modal = await this.modalController.create({
      component: QueryComponent,
      componentProps: { id: QueryId }
    });
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {

    }
  }



  getQueryDetails(id) {
    this.parentService.getQuery(id)
      .subscribe((res: any) => {
        this.soQuiry = true;
        this.query = res;
      });
  }
  replyTo_Query() {
    // console.log(this.query.id + ' ' +  this.replyText);

    this.parentService.replyToQuery({
      description: this.replyText,
      id: this.query.id
    })
      .subscribe((res: any) => {
        this.query = res;
        this.alertService.successAlert('Reply Successfuly');
      });
  }

  newQuery() {
    console.log(this.QueryTittle + '    ' + this.newQueryMsg + '    ' + this.studentId);

    this.parentService.newInQuery({
      title: this.QueryTittle,
      description: this.newQueryMsg,
      studentId: this.studentId,
    })
      .subscribe((res: any) => {
        this.QueryTittle = '';
        this.newQueryMsg = '';
        this.studentId = '';
        this.queries.push(res);
        this.alertService.successAlert('Query Send Successfuly');

      });
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}



