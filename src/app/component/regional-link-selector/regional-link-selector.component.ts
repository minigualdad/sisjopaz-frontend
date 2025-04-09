import { AfterContentInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RegionalLinkService } from '../../service/regional-link.service';
import { debounceTime, map, startWith } from 'rxjs';

@Component({
  selector: 'app-regional-link-selector',
  standalone: false,
  templateUrl: './regional-link-selector.component.html',
  styleUrl: './regional-link-selector.component.scss'
})
export class RegionalLinkSelectorComponent implements AfterContentInit {
  form: FormGroup;
  regionalLinks: any[] = [];
  filteredRegionalLinks: any[] = [];
  regionalLinkFilter: FormControl = new FormControl('');

  @Output() regionalLinkIdListen: EventEmitter<number> = new EventEmitter();
  @Input() regionalLink?: number;

  constructor(private regionalLinkService: RegionalLinkService) {
    this.form = new FormGroup({
      regionalLinkId: new FormControl('', [Validators.required]),
    });

    this.regionalLinkService.getAll().subscribe({
      next: (response: any) => {
        this.regionalLinks = response.regionalLinks;
        this.filteredRegionalLinks = this.regionalLinks;
        if (this.regionalLink) {
          this.form.patchValue({ regionalLinkId: this.regionalLink });
          this.setRegionalLinkName(this.regionalLink);
        }
      }
    });

    this.regionalLinkFilter.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map(value => (typeof value === 'string' ? this.filterRegionalLinks(value) : this.filteredRegionalLinks))
      )
      .subscribe(filtered => (this.filteredRegionalLinks = filtered));
  }

  ngAfterContentInit() {
    this.checkValue();
  }

  checkValue() {
    setTimeout(() => {
      if (this.regionalLink) {
        this.form.patchValue({ regionalLinkId: this.regionalLink });
      }
    }, 500);
  }

  private filterRegionalLinks(value: string): any[] {
    const filterValue = this.normalizeString(value);
    return this.regionalLinks.filter(link =>
      this.normalizeString(link.name).includes(filterValue)
    );
  }

  private normalizeString(str: string): string {
    return str.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  }

  selectRegionalLinkId(event: any) {
    const selectedLink = this.regionalLinks.find(link => link.id === event.option.value);
    if (selectedLink) {
      this.form.patchValue({ regionalLinkId: selectedLink.id });
      this.regionalLinkFilter.setValue(selectedLink.name);
      this.regionalLinkIdListen.emit(selectedLink.id);
    }
  }

  private setRegionalLinkName(regionalLinkId: number) {
    const link = this.regionalLinks.find(l => l.id === regionalLinkId);
    if (link) {
      this.regionalLinkFilter.setValue(link.name);
    }
  }
}
