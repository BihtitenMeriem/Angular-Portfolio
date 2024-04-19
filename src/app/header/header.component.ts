import { Component, AfterViewInit , Renderer2, ElementRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Typed from 'typed.js';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit{
  constructor(private http: HttpClient, private renderer: Renderer2, private el: ElementRef) { }

  downloadFile(): void {
    const url = '../../assets/CV_Meriem_BIHTITEN.pdf';
    this.http.get(url, { responseType: 'blob' }).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const downloadLink = document.createElement('a');
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.setAttribute('download', 'CV-Meriem-BIHTITEN.pdf');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  }

  ngAfterViewInit() {
    const typedTextOutput = this.el.nativeElement.querySelector('.typed-text-output');
    if (typedTextOutput !== null) {
      const typedStringsElement = this.el.nativeElement.querySelector('.typed-text');
      if (typedStringsElement !== null) {
        const typed_strings = typedStringsElement.textContent;
        const typed = new Typed(typedTextOutput, {
          strings: typed_strings ? typed_strings.split(', ') : [],
          typeSpeed: 100,
          backSpeed: 20,
          smartBackspace: false,
          loop: true
        });
      }
    }
  }

}
