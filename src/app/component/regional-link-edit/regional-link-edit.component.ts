import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionalLinkService } from '../../service/regional-link.service';

@Component({
    selector: 'app-regional-link-edit',
    templateUrl: './regional-link-edit.component.html',
    styleUrl: './regional-link-edit.component.scss',
    standalone: false
})
export class RegionalLinkEditComponent {
  regionalLink: any;
  form: FormGroup;

  constructor(private regionalLinkService: RegionalLinkService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      userId: new FormControl('', Validators.required),
      regionId: new FormControl('', Validators.required),
    });
    this.regionalLink = {};
    this.regionalLink.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async ngOnInit() {
    this.regionalLinkService.show(this.regionalLink.id )
      .subscribe({
        next: (response: any) => {
          this.regionalLink = response.regionalLink;
            this.form.patchValue(response.regionalLink);
        }
      });
  }
  async edit() {
    this.regionalLinkService.edit(this.regionalLink.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Enlace regional editado correctamente', 'success');
          this.router.navigateByUrl(`/app/regional-link/${this.regionalLink.regionId}`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar el enlace regional', 'error');
        }
        
    });
  }
  onUserSelect(event: any) {
    this.form.patchValue({ userId: event });
  }
}
