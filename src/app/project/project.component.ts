import { Component  } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-project',
  standalone: true,
  imports: [NgFor,HttpClientModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  repositories:any =[]

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const username = 'BihtitenMeriem';
    const url = `https://api.github.com/users/${username}/repos`;
    
    this.http.get<any[]>(url).subscribe(
      (data) => {
        this.repositories = data;
        console.log(data); // You can do whatever you want with the data here
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching data from GitHub:', error);
      }
    );
  }
}
