import {
  AfterContentInit,
  ContentChild,
  ContentChildren,
  Directive,
  QueryList
} from '@angular/core';
import * as _ from 'lodash';
import { SortData } from './../datatable';
import { NguDataTable } from './../datatable/datatable.component';
import { NguSortHeader } from './sorter.component';

// tslint:disable-next-line:directive-selector
@Directive({ selector: '[nguSort]', exportAs: 'nguSort' })
// tslint:disable-next-line:directive-class-suffix
export class NguSorter implements AfterContentInit {
  @ContentChildren(NguSortHeader) NguSortHeader: QueryList<NguSortHeader>;
  // tslint:disable-next-line:no-output-rename
  @ContentChild(NguDataTable) table: NguDataTable;

  constructor() {}

  ngAfterContentInit() {
    this.table.dataAdded$.subscribe(res => {
      // console.log('sortEmit', res);
      this.table.calledFromFilter = true;
      this.sortTheData(res);
    });
    this.NguSortHeader.forEach(elem => {
      elem.nguSort$.subscribe(res => {
        this.sortTheData(res);
      });
    });
  }

  private sortTheData(res: SortData) {
    this.table.innerData = this.sortTable(this.table.data, res);
    this.table.NguPaginator.sort = res;
    this.table.goToPage(this.table.calledFromFilter ? 0.2 : 0.1);
    this.controlArrow(res);
  }

  controlArrow(res: SortData) {
    this.NguSortHeader.forEach(elem => {
      elem.onSorting(res);
    });
  }

  public sortTable(data: Array<any>, str: SortData) {
    const name = str.sortBy;
    const direction = str.direction;
    data = _.orderBy(data, this.caseInsensitiveIteratee(<string>name), [
      direction
    ]);
    // data = _.orderBy(data, sortBy, [this.sortOrder]);
    return data;
  }

  private caseInsensitiveIteratee(sortBy: string) {
    return (row: any): any => {
      let value = row;
      for (const sortByProperty of sortBy.split('.')) {
        if (value) {
          value = value[sortByProperty];
        }
      }
      if ((value && typeof value === 'string') || value instanceof String) {
        return value.toLowerCase();
      }
      return value;
    };
  }
}
