export class NguPagination {
  constructor(
    public isFirst: boolean,
    public isLast: boolean,
    public showLength: number,
    public activePage: number,
    public rowStart: number,
    public rowEnd: number,
    public totalPages: number,
    public filter: string,
    public totalRows?: number,
    public noOfPages?: number,
    public sort?: SortData,
    public pageArray?: number[]
  ) {}
}

export class SortData {
  sortBy: any;
  direction: string;
}

export interface NguStateData {
  [x: string]: NguPagination;
}
