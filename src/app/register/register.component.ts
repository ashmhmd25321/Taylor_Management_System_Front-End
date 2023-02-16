import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = {
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    mobileNumber: ""
  }

  constructor(private userService: UserService, private snack: MatSnackBar,private router: Router) { }


  ngOnInit(): void {
  }

  addUser() {
    console.log(this.user);
    if (this.user.userName == '' || this.user.userName == null) {
      // alert('User is required!!');
      this.snack.open("Username is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.password == '' || this.user.password == null) {
      // alert('Password is required!!');
      this.snack.open("Password is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.firstName == '' || this.user.firstName == null) {
      // alert('First Name is required!!');
      this.snack.open("First Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.lastName == '' || this.user.lastName == null) {
      // alert('Last Name is required!!');
      this.snack.open("Last Name is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.email == '' || this.user.email == null) {
      // alert('Email is required!!');
      this.snack.open("Email is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.mobileNumber == '' || this.user.mobileNumber == null) {
      // alert('Phone Number is required!!');
      this.snack.open("Phone Number is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    } else if (this.user.address == '' || this.user.address == null) {
      // alert('Email is required!!');
      this.snack.open("Address is required", 'ok', {
        verticalPosition: 'bottom',
      })
      return;
    }
    //validation

    //addUser: userservice
    this.userService.registerUser(this.user).subscribe(
      (data: any) => {
        //success
        console.log(data);
        // alert('User Registered Successfully');
        Swal.fire('Registered Successfully', 'User name is ' + data.userName, 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        //error
        console.log(error);
        // alert('Something went wrong');
        this.snack.open("Something Went Wrong", 'ok', {
          verticalPosition: 'bottom',
        })
      }
    )
  }
}
