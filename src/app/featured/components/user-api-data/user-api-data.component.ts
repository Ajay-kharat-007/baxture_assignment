import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-api-data',
  templateUrl: './user-api-data.component.html',
  styleUrls: ['./user-api-data.component.scss'],
})
export class UserApiDataComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'username',
    'email',
    'street',
    'suite',
    'city',
    'zipcode',
    'lat',
    'lng',
    'phone',
    'website',
    'companyName',
    'companyPhrase',
    'companyBS',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: DataService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.service.getJsonUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
