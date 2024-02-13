import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../services/user.service';
import { UserFormComponent } from '../user-form/user-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {


  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'email',
    'address',
    'action'
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private service: UserService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getHotelList();
  }

  hotelRegister() {
    const dialogRef = this.dialog.open(UserFormComponent)
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getHotelList();
        }
      }
    })
  }

  getHotelList() {
    this.service.getUsers().subscribe({
      next: (res: any) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res)
      },
      error: console.log,
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteHotel(id: number) {
    this.service.deleteUser(id).subscribe({
      next: (res: any) => {
        this.toastr.success("Hotel Deleted !!");
        this.getHotelList();
      },
      error: console.log,
    })
  }

  openHotelForm(data: any) {
    const dialogRef = this.dialog.open(UserFormComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getHotelList();
        }
      }
    })
  }

}
