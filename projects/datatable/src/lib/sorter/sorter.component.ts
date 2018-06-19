import { Component, HostListener, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { SortData } from './../datatable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ngu-sort-header]',
  templateUrl: './sorter.component.html',
  styleUrls: ['./sorter.component.scss']
})
// tslint:disable-next-line:component-class-suffix
export class NguSortHeader {
  sortDirection = ['asc', 'desc'];
  arrowPosition = '';
  // tslint:disable-next-line:no-input-rename
  @Input('ngu-sort-header') NguSortHeader: string | number;
  // tslint:disable-next-line:no-output-rename
  @Output('nguSort') nguSort$ = new Subject<SortData>();
  @HostListener('click')
  onSortClick() {
    this.sortDirection.reverse();
    this.arrowPosition = this.sortDirection[0];
    this.nguSort$.next({
      sortBy: this.NguSortHeader,
      direction: this.arrowPosition
    });
  }

  onSorting(data: SortData) {
    if (this.NguSortHeader !== data.sortBy) {
      this.arrowPosition = '';
      this.sortDirection = ['asc', 'desc'];
    } else {
      this.arrowPosition = data.direction;
      this.sortDirection =
        data.direction === 'asc' ? ['asc', 'desc'] : ['desc', 'asc'];
    }
  }
}
