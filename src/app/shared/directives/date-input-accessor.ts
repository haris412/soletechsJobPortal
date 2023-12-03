import {
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Renderer2
  } from "@angular/core";
  import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
  
  export const DATE_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DateValueAccessor),
    multi: true
  };
  
  @Directive({
    selector: "[dateInput]", // <input type="date" dateInput />
    // selector: "input[type=date][formControlName],input[type=date][formControl],input[type=date][ngModel]", // <input type="date" /> - wont work with getter/setters
    providers: [DATE_VALUE_ACCESSOR]
  })
  export class DateValueAccessor implements ControlValueAccessor {
    @HostListener("input", ["$event.target.valueAsDate"])
    onChange = (_: any) => {};
    @HostListener("blur", [])
    onTouched = () => {};
  
    constructor(private renderer: Renderer2, private elementRef: ElementRef) {}
  
    writeValue(value: Date): void {
      if (!value || !(value instanceof Date)) {
        this.renderer.setProperty(this.elementRef.nativeElement, "value", null);
        return;
      }
  
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        "valueAsDate",
        value
      );
    }
  
    registerOnChange(fn: (_: any) => void): void {
      this.onChange = fn;
    }
  
    registerOnTouched(fn: () => void): void {
      this.onTouched = fn;
    }
  
    setDisabledState(isDisabled: boolean): void {
      this.renderer.setProperty(
        this.elementRef.nativeElement,
        "disabled",
        isDisabled
      );
    }
  }