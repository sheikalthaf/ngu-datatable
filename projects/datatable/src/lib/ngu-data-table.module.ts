import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NguSorter } from './sorter/sorter.directive';
import { NguDataTable } from './datatable/datatable.component';
import { NguSortHeader } from './sorter/sorter.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NguDataTable, NguSortHeader, NguSorter],
  exports: [NguDataTable, NguSortHeader, NguSorter]
})
export class NguDataTableModule {}
