import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CoreService } from '../../../../core/core.service';
import { SubscribersService } from '../../../../services/subscribers.service';
import { DxDataGridComponent } from "devextreme-angular";
import _ from 'lodash';

@Component({
  selector: 'app-subscribers',
  templateUrl: './subscribers.component.html',
  styleUrls: ['./subscribers.component.css']
})
export class SubscribersComponent implements OnInit {

  @ViewChild('subscriberModal', { static: false }) subscriberModal: any;
  @ViewChild("subscribersContainer", { static: false }) subscribersDataGrid: DxDataGridComponent | undefined;

  public loadingData = false;
  public loading = false;
  public animationType = 'wanderingCubes';
  public subscribers: any = [];
  public subscriberCount = 0;
  public subscriberFile: any;
  public subscriberImagePreview: any;
  public subscriberImageDefault = 'assets/img/contact-thumb.jpg';

  public theSubscriber: any;
  public origin = 'subscribers';
  public subscriberModalAction = '';


  public categories: any = [];
  public categoryCount = 0;

  constructor(public _core: CoreService,
    private datePipe: DatePipe,
    private subscribersService: SubscribersService,) { }

  ngOnInit(): void {
    this.getSubscribers();
  }

  async getSubscribers() {
    this.loadingData = true;

    this.subscribersService
      .getSubscribers()
      .then(async (subscriber) => {
        this.subscriberCount = subscriber.count;
        let subscribers = this._core.normalizeKeys(subscriber.subscribers);

        this.subscribers = _.orderBy(subscribers, ['createdat'], ['desc']);;

        this.loadingData = false;
      })
      .catch(e => {
        this.loadingData = false;
        this._core.handleError(e);
      });
  }

  openSubscriberModal(action: string, subscriber: any) {
    this.subscriberModalAction = action;
    this.theSubscriber = subscriber;
    this.subscriberModal.openModal();
  }

  onSubscriberModalClosed() {
    this.subscriberModalAction = '';
    this.theSubscriber = null;
    this.getSubscribers();
  }

  onSubscriberUpdated(id: any) {
    //this.getsubscriber(id, 'update');
  }

  getDate(date: string) {
    if (!this._core.isEmptyOrNull(date)) {
      return this._core.formatDate(date);
    } else {
      return "";
    }
  }


  customizeExcelCell = (options: any) => {
    var gridCell = options.gridCell;
    if (!gridCell) {
      return;
    }

    if (gridCell.rowType === "data") {

      if (gridCell.column.dataField === 'createdat') {
        options.value = this.datePipe.transform(gridCell.value, "medium");
      }

    }
  };

}
