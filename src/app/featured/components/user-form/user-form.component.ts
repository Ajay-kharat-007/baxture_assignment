import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private dialog: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.builder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  userRegistr() {
    if (this.userForm.valid) {
      if (this.data) {
        this.service.updateUser(this.data._id, this.userForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success('User Details Updated Successfully !!');
            this.dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error('some error occurred');
          },
        });
      } else {
        console.log(this.userForm.value);
        this.service.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this.toastr.success(
              'User Registration Successfull',
              'Congratulations!!'
            );
            this.dialog.close(true);
          },
          error: (err: any) => {
            this.toastr.error('some error occurred');
          },
        });
      }
    }
  }

  closeDialog() {
    this.dialog.close();
  }
}
