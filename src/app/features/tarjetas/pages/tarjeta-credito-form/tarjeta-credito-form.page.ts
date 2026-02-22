import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController, AlertController } from '@ionic/angular';
import { TarjetasCreditoService } from '../../services/tarjetas-credito.service';
import { Banco, TarjetaCredito, TarjetaCreditoRequest } from '../../models/tarjeta.model';
import { TarjetaDashboard } from '../../../../shared/models/dashboard.model';

@Component({
  selector: 'app-tarjeta-credito-form',
  templateUrl: './tarjeta-credito-form.page.html',
  styleUrls: ['./tarjeta-credito-form.page.scss'],
  standalone: false,
})
export class TarjetaCreditoFormPage implements OnInit {
  isEditMode = false;
  tarjetaId: number | null = null;
  cardForm: FormGroup;
  bancos: Banco[] = [];
  loading = false;
  saving = false;
  isCustomColor = false;
  private presetColors = ['#1e1b4b', '#064e3b', '#4c1d95', '#7f1d1d', '#0f172a'];

  // Mock banks for initial development / as fallback
  private readonly MOCK_BANCOS: Banco[] = [
    { id: 1, nombre: 'Banco Nación', logo_url: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png' },
    { id: 2, nombre: 'Banco Galicia', logo_url: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png' },
    { id: 3, nombre: 'BBVA' },
    { id: 4, nombre: 'Santander' }
  ];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private tcService: TarjetasCreditoService,
    private router: Router,
    private toastCtrl: ToastController
  ) {
    this.cardForm = this.fb.group({
      bancoId: [null, Validators.required],
      numeroTarjeta: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      nombreTarjeta: ['', Validators.required],
      limiteCredito: ['', [Validators.required, Validators.maxLength(11)]], // Aumento para los puntos del separador
      diaCierreDefault: [4, [Validators.required, Validators.min(1), Validators.max(31)]],
      diaVencimientoDefault: [24, [Validators.required, Validators.min(1), Validators.max(31)]],
      color: ['#1e1b4b']
    });
  }

  ngOnInit() {
    this.setupColorListener();
    this.loadBancos();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.tarjetaId = +id;
      this.loadTarjetaData();
    }
  }

  loadBancos() {
    this.tcService.getBancos().subscribe({
      next: (data: Banco[]) => this.bancos = data.length > 0 ? data : this.MOCK_BANCOS,
      error: () => this.bancos = this.MOCK_BANCOS
    });
  }

  loadTarjetaData() {
    if (!this.tarjetaId) return;
    this.loading = true;
    this.tcService.getById(this.tarjetaId).subscribe({
      next: (t: TarjetaCredito) => {
        this.cardForm.patchValue({
          bancoId: 1, // Mock mapping since real ID might vary
          numeroTarjeta: t.ultimosDigitos,
          nombreTarjeta: t.nombre,
          limiteCredito: t.cupoTotal,
          diaCierreDefault: t.diaCierre,
          diaVencimientoDefault: t.diaVencimiento,
          color: t.color
        });
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  get cardPreviewModel(): TarjetaDashboard {
    const val = this.cardForm.value;
    const selectedBanco = this.bancos.find(b => b.id === val.bancoId);
    
    // Obtener valor numérico real del string con separadores
    const limitStr = val.limiteCredito ? String(val.limiteCredito).replace(/\D/g, '') : '';
    const rawLimit = limitStr ? parseInt(limitStr, 10) : 0;
    const displayLimit = Math.min(rawLimit, 99999999);

    return {
      tarjetaId: 0,
      id: 0,
      nombreTarjeta: val.nombreTarjeta || 'NOMBRE TARJETA',
      banco: selectedBanco?.nombre || 'Banco emisor',
      ultimos4: val.numeroTarjeta || '••••',
      limiteTotal: displayLimit,
      limiteDisponible: displayLimit,
      gastosEsteMes: 0,
      gastosFuturos: 0,
      porcentajeUso: 0,
      fechaCierre: `${val.diaCierreDefault || '04'}/04`,
      color: val.color || '#1e1b4b'
    };
  }

  async save() {
    if (this.cardForm.invalid) return;

    this.saving = true;
    const formVals = this.cardForm.value;
    const limitStr = formVals.limiteCredito ? String(formVals.limiteCredito).replace(/\D/g, '') : '';
    
    const dto: TarjetaCreditoRequest = {
      ...formVals,
      limiteCredito: limitStr ? parseInt(limitStr, 10) : 0
    };

    const obs = this.isEditMode && this.tarjetaId
      ? this.tcService.update(this.tarjetaId, dto)
      : this.tcService.create(dto);

    obs.subscribe({
      next: async () => {
        const toast = await this.toastCtrl.create({
          message: `Tarjeta ${this.isEditMode ? 'actualizada' : 'creada'} con éxito`,
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.router.navigate(['/app/tarjetas']);
      },
      error: () => this.saving = false
    });
  }

  onCustomColorChange(ev: any) {
    const color = ev.target.value;
    this.isCustomColor = true;
    this.cardForm.patchValue({ color });
  }

  private setupColorListener() {
    this.cardForm.get('color')?.valueChanges.subscribe(val => {
      this.isCustomColor = !this.presetColors.includes(val);
    });
  }
}
