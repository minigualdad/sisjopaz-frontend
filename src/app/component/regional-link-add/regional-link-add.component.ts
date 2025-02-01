import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegionalLinkService } from '../../service/regional-link.service';

@Component({
    selector: 'app-regional-link-add',
    templateUrl: './regional-link-add.component.html',
    styleUrl: './regional-link-add.component.scss',
    standalone: false
})
export class RegionalLinkAddComponent {
  regionId:number;
  form: FormGroup;

  constructor(private regionalLinkService: RegionalLinkService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup( {
      regionId: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
    });
  this.regionId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    
  }
  ngOnInit() {
    this.form.patchValue({ regionId: this.regionId });
  }
  

  async create() {
    await this.regionalLinkService.create({...this.form.value})
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Enlace Regional creado correctamente', 'success');
          this.router.navigateByUrl(`/app/regional-link/${this.regionId}`)
        },
        error: (error) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido crear el enlace regional', 'error');
        }
      });
  }

  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });

  }
}
