import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumericFormat]',
  standalone: false
})
export class NumericFormatDirective {
  @Input() maxDigits: number = 8;
  @Input() useThousandSeparator: boolean = true;

  constructor(private el: ElementRef, private control: NgControl) {}

  @HostListener('input', ['$event'])
  onInput(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    
    // Limit digits
    if (value.length > this.maxDigits) {
      value = value.substring(0, this.maxDigits);
    }

    if (this.useThousandSeparator && value) {
      const formatted = new Intl.NumberFormat('es-AR').format(parseInt(value, 10));
      this.updateValue(formatted);
    } else {
      this.updateValue(value);
    }
  }

  private updateValue(value: string) {
    // Actualizar el control de formulario (Reactive Forms)
    this.control.control?.setValue(value, { emitEvent: false });
    // Actualizar el valor visual del input
    this.el.nativeElement.value = value;
  }
}
