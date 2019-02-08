import { Component, OnInit, Input } from '@angular/core';
import { ParentService } from 'src/app/providers/parent.service';
import { AlertService } from 'src/app/providers/alertService';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  query: any;
  replyText: string;
  @Input() id: any;
  constructor(
    private parentService: ParentService,
    private alertService: AlertService,
    public modalController: ModalController,
  ) {

  }
  ngOnInit() {
    this.getQueryDetails();
  }


  getQueryDetails() {
    this.parentService.getQuery(this.id)
      .subscribe((res: any) => {
        this.query = res;
        console.log(res);

      });
  }
  replyToQuery() {
    this.parentService.replyToQuery({
      description: this.replyText,
      id: this.query.id
    })
      .subscribe((res: any) => {
        this.query = res;
        this.replyText = '';
        this.alertService.successAlert('Reply Successfuly');
      });
  }
  goBack() {
    this.modalController.dismiss();

  }
}
