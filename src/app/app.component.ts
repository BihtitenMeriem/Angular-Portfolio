import { Component ,ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { AboutComponent } from './about/about.component';
import { QualificationComponent } from './qualification/qualification.component';
import { HttpClientModule } from '@angular/common/http';
import { SkillComponent } from './skill/skill.component';
import { FooterComponent } from './footer/footer.component';
import { ProjectComponent } from './project/project.component';
declare var $: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,HttpClientModule,
    HeaderComponent, AboutComponent, QualificationComponent,
    SkillComponent, FooterComponent, ProjectComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  
})


export class AppComponent {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }


  isNavbarOpen = false;
  toggleNavbar() {
      this.isNavbarOpen = !this.isNavbarOpen;
  }

    ngOnInit() {
      // Add code for scroll event handling
      this.renderer.listen(window, 'scroll', () => {
        if (window.pageYOffset > 200) {
                // Navbar fadeIn logic
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.navbar'), 'display', 'flex');
                this.renderer.addClass(this.elementRef.nativeElement.querySelector('.navbar'), 'fadeIn');
              } else {
                // Navbar fadeOut logic
                this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.navbar'), 'display', 'none');
                this.renderer.removeClass(this.elementRef.nativeElement.querySelector('.navbar'), 'fadeIn');
              }
      });
  
      // Add code for click event handling
      const navbarLinks = this.elementRef.nativeElement.querySelectorAll('.navbar-nav a');

      navbarLinks.forEach((navbarLink: any) => {
      this.renderer.listen(navbarLink, 'click', (event) => {
          event.preventDefault();
    
          const targetHash = event.target.hash;
          if (targetHash !== "") {
            const targetElement = document.querySelector(targetHash);
            if (targetElement) {
              const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
              window.scrollTo({
                top: offsetTop - 45,
                behavior: 'smooth'
              });
    
              // Handle active link
              navbarLinks.forEach((link: any) => link.classList.remove('active'));
              event.target.classList.add('active');
            }
          }
        });
      });


      this.renderer.listen('window', 'scroll', () => {
        if (window.scrollY > 100) {
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.scroll-to-bottom'), 'display', 'none');
        } else {
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.scroll-to-bottom'), 'display', 'block');
        }
      });



      this.renderer.listen('window', 'scroll', () => {
        if (window.scrollY > 300) {
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.back-to-top'), 'display', 'block');
        } else {
          this.renderer.setStyle(this.elementRef.nativeElement.querySelector('.back-to-top'), 'display', 'none');
        }
      });
     
    }


    
    ngAfterViewInit() {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
    
    onScroll() {
      const scrollPosition = window.scrollY;
    
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).clientHeight;
    
        if (scrollPosition >= sectionTop-60 && scrollPosition < sectionTop + sectionHeight) {
          const id:any  = section.getAttribute('id');
          this.activateNavbarLink(id);
        }
      });
    }
    activateNavbarLink(id: string) {
      const navbarLinks = this.elementRef.nativeElement.querySelectorAll('.navbar-nav a');
      navbarLinks.forEach((navbarLink: any) => {
        navbarLink.classList.remove('active');
        if (navbarLink.getAttribute('href') === `#${id}`) {
          navbarLink.classList.add('active');
        }
      });
    }
    
    
 
  
  
}
