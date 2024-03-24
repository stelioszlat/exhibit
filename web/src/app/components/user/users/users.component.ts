import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(response => {
      this.users.next(response.users);
    });
  }

  deleteUser(user: User) {
    if (!user._id) {
      return;
    }
    this.userService.deleteUser(user._id).subscribe({
      next: (response) => {
        let users: User[] = this.users.getValue();
        let userIndex = users.findIndex(user => {
          user._id === user._id;
        });
        users.splice(userIndex, 1);
        this.userService.users.next(users);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {}
    });
  }

}
