import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MainTableDataSource } from './main-table-datasource';
import { AdminManagerService } from 'src/app/services/admin-manager.service';
@Component({
  selector: 'app-main-table',
  templateUrl: './main-table.component.html',
  styleUrls: ['./main-table.component.css']
})
export class MainTableComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MainTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  constructor(private adminManagerService:AdminManagerService){

  }

  ngOnInit() {
        this.adminManagerService.getRegions().subscribe(
          data =>{
            this.dataSource = new MainTableDataSource(this.paginator, this.sort,data);
          }
        );
    }
  
}
