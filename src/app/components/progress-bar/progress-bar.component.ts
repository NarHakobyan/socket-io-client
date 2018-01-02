import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { showProgressBar } from '@selectors/progress-bar.selector';
import { AppState } from '@store';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  showProgressBar: Store<boolean>;

  constructor(private store: Store<AppState>) {
    this.showProgressBar = this.store.select(showProgressBar);
  }

  ngOnInit() {
  }

}
