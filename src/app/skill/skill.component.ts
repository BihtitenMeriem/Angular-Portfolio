import { Component , HostListener  } from '@angular/core';
import { NgFor , NgStyle} from '@angular/common';
@Component({
  selector: 'app-skill',
  standalone: true,
  imports: [NgFor,NgStyle],
  templateUrl: './skill.component.html',
  styleUrl: './skill.component.css'
})
export class SkillComponent {

  constructor() { }
  skills:any[]= [
    {name:"HTML",value:99,bg:"bg-primary"},
    {name:"CSS",value:99,bg:"bg-success"},
    {name:"PHP",value:60,bg:"bg-danger"},
    {name:"Javascript",value:90,bg:"bg-dark"},
    {name:"React JS",value:90,bg:"bg-success"},
    {name:"Angular JS",value:40,bg:"bg-danger"},
    {name:"Laravel",value:55,bg:"bg-info"},
    {name:"Python",value:35,bg:"bg-warning"},
  ]

  @HostListener('window:scroll', ['$event'])
  onScroll(event: any) {
    const progressBars = document.querySelectorAll('.progress .progress-bar');
    const viewportHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;

    progressBars.forEach((progressBar: Element) => { 
      const progressBarTop = progressBar.getBoundingClientRect().top;
      const progressBarHeight = progressBar.clientHeight;
      if (progressBarTop < viewportHeight * 0.8) {
        const width = progressBar.getAttribute('aria-valuenow') + '%';
        progressBar.setAttribute('style', `width: ${width}`); 
      }
    });
  }

  
}
