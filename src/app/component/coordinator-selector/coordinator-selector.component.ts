import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CoordinatorService } from '../../service/coordinator.service';
import { debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-coordinator-selector',
  standalone: false,
  templateUrl: './coordinator-selector.component.html',
  styleUrl: './coordinator-selector.component.scss'
})
export class CoordinatorSelectorComponent {
  form: FormGroup;
  coordinators: any[] = [];
  filteredCoordinators: any[] = [];
  coordinatorFilter: FormControl = new FormControl('');

  @Output() coordinatorIdListen: EventEmitter<number> = new EventEmitter();
  @Input() coordinator?: number;

  constructor(private coordinatorService: CoordinatorService) {
    this.form = new FormGroup({
      coordinatorId: new FormControl('', [Validators.required]),
    });

    this.coordinatorService.getAll().subscribe({
      next: (response: any) => {
        this.coordinators = response.coordinators;
        this.filteredCoordinators = this.coordinators;

        if (this.coordinator) {
          this.form.patchValue({ coordinatorId: this.coordinator });
          this.setCoordinatorName(this.coordinator);
        }
      }
    });

    this.coordinatorFilter.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => (typeof value === 'string' ? this.filterCoordinators(value) : this.filteredCoordinators))
      )
      .subscribe(filtered => (this.filteredCoordinators = filtered));
  }

  private filterCoordinators(value: string): any[] {
    const filterValue = this.normalizeString(value);
    return this.coordinators.filter(coordinator =>
      this.normalizeString(coordinator.name).includes(filterValue)
    );
  }

  private normalizeString(str: string): string {
    return str.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
  }

  selectCoordinatorId(event: any) {
    const selectedCoordinator = this.coordinators.find(coordinator => coordinator.id === event.option.value);
    if (selectedCoordinator) {
      this.form.patchValue({ coordinatorId: selectedCoordinator.id });
      this.coordinatorFilter.setValue(selectedCoordinator.name);
      this.coordinatorIdListen.emit(selectedCoordinator.id);
    }
  }

  displayFn(coordinatorId: number): string {
    const coordinator = this.coordinators.find(c => c.id === coordinatorId);
    return coordinator ? coordinator.name : '';
  }

  private setCoordinatorName(coordinatorId: number) {
    const coordinator = this.coordinators.find(c => c.id === coordinatorId);
    if (coordinator) {
      this.coordinatorFilter.setValue(coordinator.name);
    }
  }
}
