import { Pipe, PipeTransform } from '@angular/core';
import { GastoListadoItem } from '../../features/gastos/models/gasto.model';

@Pipe({
  name: 'sumMonto',
  standalone: false,
})
export class SumMontoPipe implements PipeTransform {
  transform(gastos: GastoListadoItem[]): string {
    const total = gastos.reduce((sum, g) => sum + g.monto, 0);
    return total.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }
}
