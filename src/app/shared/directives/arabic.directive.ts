import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[preventArabic]'
})
export class PreventArabicDirective {
  regex = /[^\u0621-\u064A\u0660-\u0669]+$/g;

  private elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);

  @HostListener('input', ['$event'])
  pressHandler(event: Event) {
    const value = (event?.target as HTMLInputElement)?.value;
    this.elementRef.nativeElement.value = value.replace(this.regex, '');
  }
}
