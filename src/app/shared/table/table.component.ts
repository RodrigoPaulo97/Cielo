import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TableColumn } from 'src/app/interface/table.interface';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input('data') data: Array<any> = []
  @Input('columns') columns: TableColumn[] = []
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = []
  dataSource!: MatTableDataSource<any>
  keyFilterDate!: string

  constructor() { }

  ngOnChanges(): void {
    this.dataSource = new MatTableDataSource(this.data)
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.displayedColumns = this.columns.map(c => c.field)
    this.keyFilterDate = this.columns.find(c => c.filterDate)?.field ?? ''

  }


  ngOnInit(): void {
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  applyFilterDate(event: Event) {
    const dateValue = (event.target as HTMLInputElement).value;
    const data = this.data

    if (!dateValue) {
      this.dataSource.data = data
      return
    }
    if (!this.keyFilterDate) return

    this.dataSource.data = data.filter((item) => item[this.keyFilterDate]?.split('T')[0] == dateValue)
  }
}
