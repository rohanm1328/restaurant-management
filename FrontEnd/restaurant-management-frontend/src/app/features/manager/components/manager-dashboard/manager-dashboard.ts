import { Component } from '@angular/core';

interface Staff {
  name: string;
  email: string;
  role: string;
  status: 'Pending' | 'Approved' | 'Rejected';
}

@Component({
  selector: 'app-manager-dashboard',
  imports: [],
  templateUrl: './manager-dashboard.html',
  styleUrl: './manager-dashboard.scss',
})
export class ManagerDashboard {
  activeSection: 'menu' | 'staff' = 'menu';

  staffList: Staff[] = [
    {
      name: 'Rahul Patil',
      email: 'rahul@gmail.com',
      role: 'Waiter',
      status: 'Pending'
    },
    {
      name: 'Amit Sharma',
      email: 'amit@gmail.com',
      role: 'Chef',
      status: 'Pending'
    },
    {
      name: 'Sneha More',
      email: 'sneha@gmail.com',
      role: 'Counter',
      status: 'Pending'
    },
    {
      name: 'Priya Desai',
      email: 'priya@gmail.com',
      role: 'Waiter',
      status: 'Approved'
    },
    {
      name: 'Vikas Jadhav',
      email: 'vikas@gmail.com',
      role: 'Chef',
      status: 'Pending'
    }
  ];

  updateStaffStatus(
    staff: Staff,
    status: 'Approved' | 'Rejected'
  ) {
    staff.status = status;

    console.log(`${staff.name} has been ${status}`);
  }


}
