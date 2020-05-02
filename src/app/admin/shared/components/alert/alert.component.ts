import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Alert, AlertService, AlertType} from "../../services/alert.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styles: []
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 3000;

  public text: string;
  public type: AlertType = 'warning';
  private aSub: Subscription;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.aSub = this.alertService.alert$.subscribe((alert: Alert) => {
      this.text = alert.text;
      this.type = alert.type

      const timeout = setTimeout(() => {
        clearTimeout(timeout);
        this.text = '';
      }, this.delay)
    })
  }

  ngOnDestroy(): void {
    if(this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}
