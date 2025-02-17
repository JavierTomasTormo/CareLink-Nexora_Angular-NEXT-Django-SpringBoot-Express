import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './error.component.html',
  styleUrl: './error.component.css'
})
export class ErrorComponent implements AfterViewInit {
  @ViewChildren('codeElement') codeElements!: QueryList<ElementRef>;
  private readonly typingSpeed = 30;

  ngAfterViewInit() {
    this.animateSequentially();
  }

  private async animateSequentially() {
    const delays = [0, 600, 1300];
    const elements = this.codeElements.toArray();

    for (let i = 0; i < elements.length; i++) {
      await this.wait(delays[i]);
      await this.typeEffect(elements[i].nativeElement);
    }
  }

  private async typeEffect(element: HTMLElement): Promise<void> {
    const text = element.innerHTML;
    element.innerHTML = '';
    
    for (let i = 0; i <= text.length; i++) {
      await this.wait(this.typingSpeed);
      element.innerHTML = text.slice(0, i) + (i < text.length ? '|' : '');
    }
  }

  private wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}