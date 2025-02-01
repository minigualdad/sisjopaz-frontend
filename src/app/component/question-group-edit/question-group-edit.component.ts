import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionGroupService } from '../../service/question-group.service';

@Component({
  selector: 'app-question-group-edit',
  standalone: false,
  templateUrl: './question-group-edit.component.html',
  styleUrl: './question-group-edit.component.scss'
})
export class QuestionGroupEditComponent {
  questionGroup: any;
  form: FormGroup;

  constructor(private questionGroupService: QuestionGroupService,  
    private router: Router,  
    private activatedRoute: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required)
    });
    this.questionGroup = {};
    this.questionGroup.id = this.activatedRoute.snapshot.paramMap.get('id');
    ;
  }

  async ngOnInit() {
    this.questionGroupService.show(this.questionGroup.id )
      .subscribe({
        next: (response: any) => {
          this.questionGroup = response.questionGroup;
            this.form.patchValue(response.questionGroup);
        }
      });
  }
  async edit() {
    this.questionGroupService.edit(this.questionGroup.id , this.form.value)
      .subscribe({
        next: (response: any) => {
          Swal.fire('Operación correcta', 'Categoría de preguntas editada correctamente', 'success');
          this.router.navigateByUrl(`/app/question-group`)
        },
        error: (error: any) => {
          console.error(error);
          Swal.fire('Operación incorrecta', 'No se ha podido editar la categoría de preguntas', 'error');
        }
        
    });
  }
}
