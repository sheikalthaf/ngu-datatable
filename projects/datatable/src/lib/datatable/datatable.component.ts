import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as _ from 'lodash';
import { Subject } from 'rxjs';
import { NguPagination, NguStateData, SortData } from './../datatable';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[nguDataTable], ngu-table',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  exportAs: 'NguData'
})
// tslint:disable-next-line:component-class-suffix
export class NguDataTable implements OnInit {
  token: string;
  private _clonedData: any[] = [];
  tableData: any = [];
  innerData: any = [];
  @Input('noOfRows') noOfRows: number;
  @Input('noOfPages') noOfPages: number;
  @Output('pageChanged') pageChanged = new EventEmitter<any[]>();
  NguPaginator = new NguPagination(
    true,
    false,
    5,
    1,
    1,
    this.noOfRows,
    0,
    null,
    0,
    this.noOfPages,
    new SortData(),
    []
  );
  calledFromFilter: boolean;
  // tslint:disable-next-line:no-input-rename
  // @Input('nguDataTable') dataSource: Object;
  // tslint:disable-next-line:no-output-rename
  @Output('dataAdded') dataAdded$ = new Subject<SortData>();
  @Input()
  set state(token: string) {
    this.token = token;
    this._getState();
    // console.log('state', this.NguPaginator.totalPages);
  }

  @Input('dataSource')
  /** Assign data to the datatable */
  set data(data: any[]) {
    // console.log('befodata', data);
    this._clonedData = data || [];
    this.innerData = this.data;
    this.calledFromFilter = true;
    this.filter = this.NguPaginator.filter;
    if (this.NguPaginator.sort && this.NguPaginator.sort.direction) {
      this.dataAdded$.next(this.NguPaginator.sort);
    }
    // console.log('aftdata', this.NguPaginator.totalPages);
  }

  constructor() {}

  ngOnInit() {
    // console.log('befoinit', this.NguPaginator.totalPages);
    // this.innerData = this.dataSource || [];
    // this.NguPaginator.isFirst = true;
    // this.NguPaginator.isLast = false;
    // this.NguPaginator.filter = null;
    // this.NguPaginator.totalPages = 0;
    // this.NguPaginator.showLength = 5;
    // this.NguPaginator.activePage = 1;
    // this.NguPaginator.rowStart = 1;
    // this.NguPaginator.rowEnd = this.noOfRows;
    // this.NguPaginator.noOfPages = this.noOfPages;
    // this.NguPaginator.totalRows = this.innerData.length;
    // this.NguPaginator.sort = new SortData();
    this._getState();
    // console.log('aftinit', this.NguPaginator.totalPages);
  }

  /** Get The table data without any reference */
  get data(): any[] {
    return _.clone(this._clonedData);
  }

  /** Reasign the data of the Ngupaginator after assigning the new data to the datatable */
  private _setPaginatorData() {
    // console.log('befsetPagina', this.NguPaginator.totalPages);
    this.noOfRows = this.noOfRows || this.innerData.length;
    this.noOfPages = this.noOfPages || 10;
    this.NguPaginator.totalPages = Math.ceil(
      this.innerData.length / this.noOfRows
    );
    this.NguPaginator.totalRows = this.innerData.length;
    this.NguPaginator.noOfPages =
      this.NguPaginator.totalPages >= this.noOfPages
        ? this.noOfPages
        : this.NguPaginator.totalPages;
    this.goToPage(this.calledFromFilter ? 0.2 : 0.1);
    // console.log('aftsetPagina', this.NguPaginator.totalPages);
  }

  /** Go to specfic page based on the Page  */
  goToPage(page?: number) {
    // console.log('befgotopage', this.NguPaginator.totalPages);
    // debugger;
    if (page === 0.1) {
      page = 1;
    } else if (page === 0.2) {
      page = this.NguPaginator.activePage;
    } else if (page === this.NguPaginator.activePage) {
      return;
    } else if (page === 0) {
      if (page === 0 && this.NguPaginator.isFirst) {
        return;
      }
      page = 1;
    } else if (page === -1) {
      if (page === -1 && this.NguPaginator.isLast) {
        return;
      }
      page = this.NguPaginator.totalPages;
    }
    this.calledFromFilter = false;
    page = page || this.NguPaginator.rowEnd || this.NguPaginator.totalPages;

    let end = page;
    end = end * this.noOfRows;
    let start = end - this.noOfRows + 1;
    start = start > 0 ? start : 1;
    end =
      end <= this.NguPaginator.totalRows ? end : this.NguPaginator.totalRows;
    let forinit = page === 1 ? page : page - 1;
    forinit =
      forinit + this.NguPaginator.noOfPages <= this.NguPaginator.totalPages
        ? forinit
        : this.NguPaginator.totalPages - this.NguPaginator.noOfPages + 1;
    let forCond = forinit + this.NguPaginator.noOfPages - 1;
    forCond =
      forCond <= this.NguPaginator.totalPages
        ? forCond
        : this.NguPaginator.totalPages;
    // console.log(forinit, forCond, page);
    const coll = [];
    for (let i = forinit; i <= forCond; i++) {
      coll.push(i);
    }
    this.NguPaginator.pageArray = coll || this.NguPaginator.pageArray;
    // console.log('aftgotopage', this.NguPaginator.totalPages);
    this._paginationDesign(page, start, end);
  }

  /** Save the required NguPaginator values */
  private _paginationDesign(page: number, start: number, end: number) {
    // console.log('befpagidesign', this.NguPaginator.totalPages);
    this.NguPaginator.activePage = page || 1;
    this.NguPaginator.showLength = 5;
    this.NguPaginator.rowStart = start || this.NguPaginator.rowStart;
    this.NguPaginator.rowEnd = end || this.NguPaginator.rowEnd;
    this.NguPaginator.isFirst =
      this.NguPaginator.activePage === 1 ? true : false;
    this.NguPaginator.isLast =
      this.NguPaginator.activePage === this.NguPaginator.totalPages ||
      !this.NguPaginator.pageArray.length
        ? true
        : false;
    // console.log(this.NguPaginator);
    // console.log('pagidesign', this.NguPaginator.totalPages);
    this._setRowLimit();
  }

  /** This is used to slice the rows for viewing based on the ngupaginator */
  private _setRowLimit() {
    // console.log('befsetrowlimit', this.NguPaginator.totalPages);
    if (this.innerData) {
      this.tableData = this.innerData.slice(
        this.NguPaginator.rowStart - 1,
        this.NguPaginator.rowEnd
      );
      this.pageChanged.emit(this.tableData);
      this._saveTheState();
      // console.log(this.tableData);
    }
    // console.log('aftsetrowlimit', this.NguPaginator.totalPages);
  }

  /** Search the data with any string */
  set filter(searchStr: string) {
    // console.log('beffilter', this.NguPaginator.totalPages);
    if (searchStr || searchStr === '') {
      searchStr = searchStr.toString().toLowerCase();
      const data = _.filter(this.data, obj =>
        _.some(obj, val => {
          if (val) {
            return val
              .toString()
              .toLowerCase()
              .includes(searchStr);
          } else {
            return false;
          }
        })
      );
      this.innerData = data;
      // console.log('aftfilter', this.NguPaginator.totalPages);
      this.NguPaginator.filter = searchStr;
    }
    this._setPaginatorData();
  }

  get filter() {
    return this.NguPaginator.filter || '';
  }

  /** Save the state of the dataTable */
  private _saveTheState(rm?: boolean, refresh?: boolean) {
    // console.log('befsavestate', this.NguPaginator.totalPages);
    if (!this.token) {
      return;
    }
    const datas = this.stateData;
    const data = _.clone(this.NguPaginator);
    if (rm) {
      delete datas[this.token];
    } else {
      datas[this.token] = data;
    }
    sessionStorage.setItem('NguDataTable', JSON.stringify(datas));
    // console.log('aftsavestate', this.NguPaginator.totalPages);
    if (refresh) {
      this.filter = this.NguPaginator.filter;
    }
  }

  /** Get the state of the application on Initial */
  private _getState() {
    // console.log('state');
    // console.log('initgetstate', this.NguPaginator.totalPages);
    if (this.token) {
      const data = this.stateData[this.token] || {};
      // tslint:disable-next-line:forin
      for (const i in this.NguPaginator) {
        this.NguPaginator[i] = data[i] || this.NguPaginator[i];
      }
      // this.filter = this.NguPaginator.filter;
    }
    // this.filter = this.NguPaginator.filter;
    // console.log('getstate', this.NguPaginator.totalPages);
    // this.NguPaginator.filter
    //   ? (this.filter = this.NguPaginator.filter)
    //   : this.setPaginatorData();
  }

  /** Reset The state of the dataTable */
  resetState(refresh?: boolean) {
    this._saveTheState(true, refresh);
  }

  /** Get the locally store NguPagintaion of whole data */
  get stateData(): NguStateData {
    const data = sessionStorage.getItem('NguDataTable');
    return data ? JSON.parse(data) : {};
  }
}
