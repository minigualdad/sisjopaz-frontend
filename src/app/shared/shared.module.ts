import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatPseudoCheckboxModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSort } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SurveyFinderComponent } from '../component/survey-finder/survey-finder.component';
import { UniqueOptionComponent } from './unique-option/unique-option.component';
import { InputComponent } from './input/input.component';
import { SelectedComponent } from './selected/selected.component';
import { MultipleOptionComponent } from './multiple-option/multiple-option.component';
import { MatTooltip } from '@angular/material/tooltip';
import { ButtonBackComponent } from './button-back/button-back.component';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatPseudoCheckboxModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSort,
        MatButtonToggleModule,
        MatCheckboxModule,
        UniqueOptionComponent,
        MultipleOptionComponent,
        InputComponent,
        SelectedComponent,
        MatTooltip,
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatDividerModule,
        MatMenuModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatRadioModule,
        MatPseudoCheckboxModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatPaginatorModule,
        MatSort,
        MatButtonToggleModule,
        MatCheckboxModule,
        UniqueOptionComponent,
        InputComponent,
        SelectedComponent,
        MultipleOptionComponent,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
