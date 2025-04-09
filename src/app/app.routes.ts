import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { LayoutComponent } from './component/layout/layout.component';
import { RegionalLinkComponent } from './component/regional-link/regional-link.component';
import { DivipolComponent } from './component/divipol/divipol.component';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { UsersAdminComponent } from './component/users-admin/users-admin.component';
import { SharedModule } from './shared/shared.module';
import { UsersEditComponent } from './component/users-edit/users-edit.component';
import { UsersAdminCreateComponent } from './component/users-admin-create/users-admin-create.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button'; // Si usas botones
import { MatIconModule } from '@angular/material/icon';
import { RegionalLinkAddComponent } from './component/regional-link-add/regional-link-add.component';
import { UserSelectorComponent } from './component/user-selector/user-selector.component';
import { DivipolAddComponent } from './component/divipol-add/divipol-add.component';
import { CoordinatorComponent } from './component/coordinator/coordinator.component';
import { CoordinatorAddComponent } from './component/coordinator-add/coordinator-add.component';
import { DivipolSelectorComponent } from './component/divipol-selector/divipol-selector.component';
import { ProfessionalTeamComponent } from './component/professional-team/professional-team.component';
import { ProfessionalTeamAddComponent } from './component/professional-team-add/professional-team-add.component';
import { BeneficiaryComponent } from './component/beneficiary/beneficiary.component';
import { BeneficiaryAddComponent } from './component/beneficiary-add/beneficiary-add.component';
import { DivipolEditComponent } from './component/divipol-edit/divipol-edit.component';
import { RegionalLinkEditComponent } from './component/regional-link-edit/regional-link-edit.component';
import { ProfessionalTeamEditComponent } from './component/professional-team-edit/professional-team-edit.component';
import { CoordinatorEditComponent } from './component/coordinator-edit/coordinator-edit.component';
import { GroupComponent } from './component/group/group.component';
import { GroupAddComponent } from './component/group-add/group-add.component';
import { DateTimeSelectorComponent } from './component/date-time-selector/date-time-selector.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { ComponentComponent } from './component/component/component.component';
import { ComponentAddComponent } from './component/component-add/component-add.component';
import { GroupProfessionalTeamComponent } from './component/group-professional-team/group-professional-team.component';
import { GroupProfessionalTeamAddComponent } from './component/group-professional-team-add/group-professional-team-add.component';
import { ProfessionalTeamSelectComponent } from './component/professional-team-select/professional-team-select.component';
import { GroupBeneficiaryComponent } from './component/group-beneficiary/group-beneficiary.component';
import { GroupBeneficiaryAddComponent } from './component/group-beneficiary-add/group-beneficiary-add.component';
import { ComponentSelectorComponent } from './component/component-selector/component-selector.component';
import { GroupShceduleComponent } from './component/group-shcedule/group-shcedule.component';
import { GroupScheduleAddComponent } from './component/group-schedule-add/group-schedule-add.component';
import { GroupScheduleBeneficiaryComponent } from './component/group-schedule-beneficiary/group-schedule-beneficiary.component';
import { GroupScheduleBeneficiaryAddComponent } from './component/group-schedule-beneficiary-add/group-schedule-beneficiary-add.component';
import { GroupEditComponent } from './component/group-edit/group-edit.component';
import { ComponentEditComponent } from './component/component-edit/component-edit.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_MENU_DEFAULT_OPTIONS, MatMenu } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UserPasswordChangeComponent } from './component/user-password-change/user-password-change.component';
import { SurveyFinderComponent } from './component/survey-finder/survey-finder.component';
import { TimeSelectorComponent } from './component/time-selector/time-selector.component';
import { GroupSelectorComponent } from './component/group-selector/group-selector.component';
import { SurveyComponent } from './component/survey/survey.component';
import { SurveyMassiveDnpComponent } from './component/survey-massive-dnp/survey-massive-dnp.component';
import { SurveyMassiveArnComponent } from './component/survey-massive-arn/survey-massive-arn.component';
import { SurveyMassiveDpsComponent } from './component/survey-massive-dps/survey-massive-dps.component';
import { ProfessionalTeamBeneficiaryComponent } from './component/professional-team-beneficiary/professional-team-beneficiary.component';
import { PreRegisterComponent } from './component/pre-register/pre-register.component';
import { UniqueOptionComponent } from './shared/unique-option/unique-option.component';
import { AgreementComponent } from './component/agreement/agreement.component';
import { CharacterizationComponent } from './component/characterization/characterization.component';
import { MonitoringComponent } from './component/monitoring/monitoring.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { AuthGuard } from './guards/auth.guard';
import { UnAuthenticatedGuard } from './guards/un-auth.guard';
import { PasswordComponent } from './component/password/password.component';
import { QuestionGroupComponent } from './component/question-group/question-group.component';
import { QuestionGroupAddComponent } from './component/question-group-add/question-group-add.component';
import { QuestionGroupEditComponent } from './component/question-group-edit/question-group-edit.component';
import { QuestionComponent } from './component/question/question.component';
import { QuestionAddComponent } from './component/question-add/question-add.component';
import { QuestionEditComponent } from './component/question-edit/question-edit.component';
import { QuestionAnswerAddComponent } from './component/question-answer-add/question-answer-add.component';
import { QuestionAnswerEditComponent } from './component/question-answer-edit/question-answer-edit.component';
import { QuestionAnswerComponent } from './component/question-answer/question-answer.component';
import { SurveyQuestionGroupComponent } from './component/survey-question-group/survey-question-group.component';
import { QuestionSelectorComponent } from './component/question-selector/question-selector.component';
import { QuestionGroupSelectorComponent } from './component/question-group-selector/question-group-selector.component';
import { QuestionAnswerSelectorComponent } from './component/question-answer-selector/question-answer-selector.component';
import { RoleGuard } from './guards/role.guard';
import { ProfessionalTeamBeneficiaryDnpRejectedComponent } from './component/professional-team-beneficiary-dnp-rejected/professional-team-beneficiary-dnp-rejected.component';
import { BeneficiaryNoValidateComponent } from './component/beneficiary-no-validate/beneficiary-no-validate.component';
import { BeneficiaryMassiveValidateComponent } from './component/beneficiary-massive-validate/beneficiary-massive-validate.component';
import { ProfessionalTeamBeneficiaryArnRejectedComponent } from './component/professional-team-beneficiary-arn-rejected/professional-team-beneficiary-arn-rejected.component';
import { ProfessionalTeamBeneficiaryArnPendingComponent } from './component/professional-team-beneficiary-arn-pending/professional-team-beneficiary-arn-pending.component';
import { ProfessionalTeamBeneficiaryDpsPendingComponent } from './component/professional-team-beneficiary-dps-pending/professional-team-beneficiary-dps-pending.component';
import { ProfessionalTeamBeneficiaryAcceptedComponent } from './component/professional-team-beneficiary-accepted/professional-team-beneficiary-accepted.component';
import { ProfessionalTeamBeneficiaryDnpPendingComponent } from './component/professional-team-beneficiary-dnp-pending/professional-team-beneficiary-dnp-pending.component';
import { BaseChartDirective } from 'ng2-charts';
import { BeneficiaryNoValidateProfessionalComponent } from './component/beneficiary-no-validate-professional/beneficiary-no-validate-professional.component';
import { RejectedDPSComponent } from './component/rejected-dps/rejected-dps.component';
import { HomeComponent } from './component/home/home.component';
import { DnpComponent } from './component/dnp/dnp.component';
import { ArnComponent } from './component/arn/arn.component';
import { DpsComponent } from './component/dps/dps.component';
import { CoresponsabilityAgreementComponent } from './component/coresponsability-agreement/coresponsability-agreement.component';
import { MonitoringPendingComponent } from './component/monitoring-pending/monitoring-pending.component';
import { PendingCharacterizationComponent } from './component/pending-characterization/pending-characterization.component';
import { TMCComponent } from './component/tmc/tmc.component';
import { AccountCertificationComponent } from './component/account-certification/account-certification.component';
import { AttendanceLessPercentComponent } from './component/attendance-less-percent/attendance-less-percent.component';
import { AttendanceLessPercentCorresponsabilityComponent } from './component/attendance-less-percent-corresponsability/attendance-less-percent-corresponsability.component';
import { DocsIdentificationComponent } from './component/docs-identification/docs-identification.component';
import { BankComponent } from './component/bank/bank.component';
import { BankAddComponent } from './component/bank-add/bank-add.component';
import { BankEditComponent } from './component/bank-edit/bank-edit.component';
import { BankingCertificationRejectedComponent } from './component/banking-certification-rejected/banking-certification-rejected.component';
import { DocumentValidateComponent } from './component/document-validate/document-validate.component';
import { DocumentValidateVerifyComponent } from './component/document-validate-verify/document-validate-verify.component';
import { DocumentValidateUpdateComponent } from './component/document-validate-update/document-validate-update.component';
import { DateGroupComponent } from './component/date-group/date-group.component';
import { DateGroupEditComponent } from './component/date-group-edit/date-group-edit.component';
import { DateGroupAddComponent } from './component/date-group-add/date-group-add.component';
import { DateGroupSelectorComponent } from './component/date-group-selector/date-group-selector.component';
import { ComponentGroupComponent } from './component/component-group/component-group.component';
import { ComponentGroupAddComponent } from './component/component-group-add/component-group-add.component';
import { ComponentGroupEditComponent } from './component/component-group-edit/component-group-edit.component';
import { CommonModule } from '@angular/common';
import { CalendarWorkingDaysAddComponent } from './component/calendar-working-days-add/calendar-working-days-add.component';
import { CalendarWorkingDaysComponent } from './component/calendar-working-days/calendar-working-days.component';
import { Roles } from './shared/constants/constants';
import { GroupComponentDateActivityAddMassiveComponent } from './component/group-component-date-activity-add-massive/group-component-date-activity-add-massive.component';
import { RegionalLinkSelectorComponent } from './component/regional-link-selector/regional-link-selector.component';
import { PointSelectorComponent } from './component/point-selector/point-selector.component';
import { BeneficiaryAddGroupComponent } from './component/beneficiary-add-group/beneficiary-add-group.component';
import { BeneficiaryGroupComponent } from './component/beneficiary-group/beneficiary-group.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { BankCertificationNoValidateComponent } from './component/bank-certification-no-validate/bank-certification-no-validate.component';
import { BankCertificationValidateVerifyComponent } from './component/bank-certification-validate-verify/bank-certification-validate-verify.component';
import { BankCertificationValidateUpdateComponent } from './component/bank-certification-validate-update/bank-certification-validate-update.component';
import { GroupComponentDatesComponent } from './component/group-component-dates/group-component-dates.component';
import { CoresponsabilityAgreementMasiveComponent } from './component/coresponsability-agreement-masive/coresponsability-agreement-masive.component';
import { AccountCertificationMasiveComponent } from './component/account-certification-masive/account-certification-masive.component';
import { ComponentGroupTemplateComponent } from './component/component-group-template/component-group-template.component';
import { ChangeMyPasswordComponent } from './component/change-my-password/change-my-password.component';
import { PeriodsAddComponent } from './component/periods-add/periods-add.component';
import { GroupComponentDateActivityBeneficiaryComponent } from './component/group-component-date-activity-beneficiary/group-component-date-activity-beneficiary.component';
import { GroupComponentDateActivityBeneficiaryAddComponent } from './component/group-component-date-activity-beneficiary-add/group-component-date-activity-beneficiary-add.component';
import { PeriodSelectorComponent } from './component/period-selector/period-selector.component';
import { GroupComponentActivityBeneficiaryAddMassiveComponent } from './component/group-component-activity-beneficiary-add-massive/group-component-activity-beneficiary-add-massive.component';
import { DivipolAvailabilityDateAddComponent } from './component/divipol-availability-date-add/divipol-availability-date-add.component';
import { PointComponent } from './component/point/point.component';
import { PointAddComponent } from './component/point-add/point-add.component';
import { PointEditComponent } from './component/point-edit/point-edit.component';
import { AssistanceUploadComponent } from './component/assistance-upload/assistance-upload.component';
import { AccountDataMassiveComponent } from './component/account-data-massive/account-data-massive.component';
import { AssistanceScannerBeneficiaryComponent } from './component/assistance-scanner-beneficiary/assistance-scanner-beneficiary.component';
import { BeneficiaryWithoutGroupComponent } from './component/beneficiary-without-group/beneficiary-without-group.component';
import { BeneficiaryMassiveGroupComponent } from './component/beneficiary-massive-group/beneficiary-massive-group.component';
import { RegionComponent } from './component/region/region.component';
import { RegionAddComponent } from './component/region-add/region-add.component';
import { DepartmentSelectorComponent } from './component/department-selector/department-selector.component';
import { MyGroupComponent } from './component/my-group/my-group.component';
import { ShowSurveyDocumentsComponent } from './component/show-survey-documents/show-survey-documents.component';
import { CoordinatorSelectorComponent } from './component/coordinator-selector/coordinator-selector.component';
import { SurveyFinderRegionComponent } from './component/survey-finder-region/survey-finder-region.component';
import { BeneficiaryByPsicosocialComponent } from './component/beneficiary-by-psicosocial/beneficiary-by-psicosocial.component';
import { DocumentValidateByRolComponent } from './component/document-validate-by-rol/document-validate-by-rol.component';
import { BankDataAddComponent } from './component/bank-data-add/bank-data-add.component';
import { BankSelectorComponent } from './component/bank-selector/bank-selector.component';
import { AgreementSignaureComponent } from './component/agreement-signaure/agreement-signaure.component';
import { ImageViewerComponent } from './component/image-viewer/image-viewer.component';
import { GroupChangeComponent } from './component/group-change/group-change.component';
import { MassiveUserComponent } from './component/massive-user/massive-user.component';
import { ExtemporarySurveyComponent } from './component/extemporary-survey/extemporary-survey.component';
import { UpdatePreregisterComponent } from './component/update-preregister/update-preregister.component';
import { RnecValidatedComponent } from './component/rnec-validated/rnec-validated.component';
import { RnecValidatedEditComponent } from './component/rnec-validated-edit/rnec-validated-edit.component';
import { UpdateMassiveGroupComponent } from './component/update-massive-group/update-massive-group.component';
import { PointIndexComponent } from './component/point-index/point-index.component';
import { ButtonBackComponent } from './shared/button-back/button-back.component';
import { MyRegionalBeneficiaryWithoutGroupComponent } from './component/my-regional-beneficiary-without-group/my-regional-beneficiary-without-group.component';
import { MyRegionalBeneficiaryMassiveGroupComponent } from './component/my-regional-beneficiary-massive-group/my-regional-beneficiary-massive-group.component';
import { RegionalLinkUpdateMassiveGroupComponent } from './component/regional-link-update-massive-group/regional-link-update-massive-group.component';
import { AssistanceGeneratesComponent } from './component/assistance-generates/assistance-generates.component';
import { AssistanceGeneratesTableComponent } from './component/assistance-generates-table/assistance-generates-table.component';
import { AssistanceGeneratesPeriodComponent } from './component/assistance-generates-period/assistance-generates-period.component';
import { SurverMassiveUpdateComponent } from './component/surver-massive-update/surver-massive-update.component';
import { CalendarWorkingDaysEditComponent } from './component/calendar-working-days-edit/calendar-working-days-edit.component';
import { AssistanceUploadsFixComponent } from './component/assistance-uploads-fix/assistance-uploads-fix.component';
import { AssistanceEditComponent } from './component/assistance-edit/assistance-edit.component';
import { AsssitanceDetectedComponent } from './component/asssitance-detected/asssitance-detected.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { AttendancesByMonthComponent } from './component/attendances-by-month/attendances-by-month.component';
import { MonthYearSelectorComponent } from './component/month-year-selector/month-year-selector.component';
import { FormSelectDateComponent } from './component/form-select-date/form-select-date.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirige a /login en la ruta raíz
    { path: 'forgot-password', canActivate: [UnAuthenticatedGuard], component: ForgotPasswordComponent },
    { path: 'login', canActivate: [UnAuthenticatedGuard], component: LoginComponent },
    { path: 'reset-password/:token', canActivate: [UnAuthenticatedGuard], component: PasswordComponent },
    {
        path: 'app',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'home', component: HomeComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.ADMIN, Roles.DIRECCION, Roles.ENLACE_REGIONAL, Roles.COORDINACION,
                    Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD,
                    Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO,
                    Roles.PROFESIONAL_PREREGISTRO, Roles.APOYO_A_LA_COORDINACION,
                    Roles.GESTORES_SOCIALES, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES]
                }
            },
            {
                path: 'regional-link/:id', component: RegionalLinkComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'regional-link-add/:id', component: RegionalLinkAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'regional-link-edit/:id', component: RegionalLinkEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'divipol', component: DivipolComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'divipol-add', component: DivipolAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'divipol-edit/:id', component: DivipolEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'coordinator/:id', component: CoordinatorComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'coordinator-add/:id', component: CoordinatorAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'coordinator-edit/:id', component: CoordinatorEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team/:id', component: ProfessionalTeamComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team-add/:id', component: ProfessionalTeamAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team-edit/:id', component: ProfessionalTeamEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'beneficiary', component: BeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'beneficiary-add', component: BeneficiaryAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'component', component: ComponentComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'component-add', component: ComponentAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'component-edit/:id', component: ComponentEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group', component: GroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-add', component: GroupAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.COORDINACION] }
            },
            {
                path: 'group-edit/:id', component: GroupEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-professional-team/:id', component: GroupProfessionalTeamComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'group-professional-team-add/:id', component: GroupProfessionalTeamAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION,] }
            },
            {
                path: 'group-beneficiary/:id', component: GroupBeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-beneficiary-add/:id', component: GroupBeneficiaryAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-schedule/:id', component: GroupShceduleComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-schedule-add/:id', component: GroupScheduleAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-schedule-beneficiary/:id', component: GroupScheduleBeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-schedule-beneficiary-add/:id', component: GroupScheduleBeneficiaryAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'user', component: UsersAdminComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN] }
            },
            {
                path: 'user-add', component: UsersAdminCreateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'user-edit/:id', component: UsersEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'user-password-change/:id', component: UserPasswordChangeComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey', component: SurveyComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey-massive-dnp', component: SurveyMassiveDnpComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey-massive-arn', component: SurveyMassiveArnComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey-massive-update', component: SurverMassiveUpdateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN] }
            },
            {
                path: 'coresponsability-agreement-masive', component: CoresponsabilityAgreementMasiveComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'account-certification-masive', component: AccountCertificationMasiveComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey-massive-dps', component: SurveyMassiveDpsComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team-beneficiary', component: ProfessionalTeamBeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'dashboard', component: DashboardComponent,
                canActivate: [RoleGuard], data: { 
                    role: [Roles.ENLACE_REGIONAL, Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_SOCIOJURIDICO, 
                        Roles.PROFESIONAL_PSICOSOCIAL, Roles.DIRECCION, Roles.ADMIN, 
                        Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.COORDINACION, 
                        Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_PREREGISTRO,
                        Roles.GESTORES_SOCIALES] }
            },
            {
                path: 'preregister', component: PreRegisterComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.COORDINACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PREREGISTRO, Roles.ENLACE_REGIONAL, Roles.GESTORES_SOCIALES] }
            },
            {
                path: 'agreement/:id', component: AgreementComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION, Roles.COORDINACION, Roles.ENLACE_REGIONAL,
                    Roles.APOYO_A_LA_COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, 
                    Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.GESTORES_SOCIALES
                ] }
            },
            {
                path: 'characterization/:id', component: CharacterizationComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_PSICOSOCIAL] }
            },
            {
                path: 'monitoring/:id', component: MonitoringComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_PSICOSOCIAL] }
            },
            {
                path: 'question-group', component: QuestionGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-group-add', component: QuestionGroupAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-group-edit/:id', component: QuestionGroupEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question/:id', component: QuestionComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-add/:id', component: QuestionAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-edit/:id', component: QuestionEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-answer/:id', component: QuestionAnswerComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-answer-add/:id', component: QuestionAnswerAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'question-answer-edit/:id', component: QuestionAnswerEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'survey-question-group', component: SurveyQuestionGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team-beneficiary-dnp-rejected', component: ProfessionalTeamBeneficiaryDnpRejectedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'professional-team-beneficiary-arn-rejected', component: ProfessionalTeamBeneficiaryArnRejectedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'beneficiary-no-validate', component: BeneficiaryNoValidateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'beneficiary-no-validate-professional', component: BeneficiaryNoValidateProfessionalComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO]
                }
            },
            {
                path: 'beneficiary-massive-validate', component: BeneficiaryMassiveValidateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'professional-team-beneficiary-arn-pending', component: ProfessionalTeamBeneficiaryArnPendingComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'professional-team-beneficiary-dps-pending', component: ProfessionalTeamBeneficiaryDpsPendingComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'professional-team-beneficiary-accepted', component: ProfessionalTeamBeneficiaryAcceptedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'professional-team-beneficiary-dnp-pending', component: ProfessionalTeamBeneficiaryDnpPendingComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'beneficiary-rejected-DPS', component: RejectedDPSComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'dnp', component: DnpComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'arn', component: ArnComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'dps', component: DpsComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'coresponsability-agreement', component: CoresponsabilityAgreementComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'pendingCharacterization', component: PendingCharacterizationComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'tmc', component: TMCComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'monitoringPending', component: MonitoringPendingComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'account-certification', component: AccountCertificationComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'attendance-less-percent-corresponsability', component: AttendanceLessPercentCorresponsabilityComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'attendance-less-percent', component: AttendanceLessPercentComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'docs-identification', component: DocsIdentificationComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'bank', component: BankComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'bank-add', component: BankAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'bank-edit/:id', component: BankEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'banking-certification-rejected', component: BankingCertificationRejectedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'document-validate', component: DocumentValidateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'date-group', component: DateGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'date-group-add', component: DateGroupAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'date-group-edit/:id', component: DateGroupEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'component-group/:id', component: ComponentGroupComponent,
                canActivate: [RoleGuard], 
                data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, 
                        Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION, 
                        Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL, 
                        Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PREREGISTRO, 
                        Roles.GESTORES_SOCIALES] }
            },
            {
                path: 'component-group-add/:id', component: ComponentGroupAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'component-group-edit/:id', component: ComponentGroupEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'calendar-working-days', component: CalendarWorkingDaysComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'calendar-working-days-add', component: CalendarWorkingDaysAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'group-component-dates/:id', component: GroupComponentDatesComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'group-component-activity-add-massive/:id', component: GroupComponentDateActivityAddMassiveComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'group-component-activity-beneficiary-add-massive/:id', component: GroupComponentActivityBeneficiaryAddMassiveComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION,] }
            },
            {
                path: 'regional-link-selector', component: RegionalLinkSelectorComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'point-selector', component: PointSelectorComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'beneficiary-add-group/:id', component: BeneficiaryAddGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'beneficiary-group/:id', component: BeneficiaryGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'bank-certification-no-validate', component: BankCertificationNoValidateComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'change-my-password', component: ChangeMyPasswordComponent,
                canActivate: [RoleGuard], data: {
                    role: [
                        Roles.ADMIN, Roles.DIRECCION, Roles.ENLACE_REGIONAL, Roles.COORDINACION,
                        Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD,
                        Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_SOCIOJURIDICO,
                        Roles.PROFESIONAL_PREREGISTRO, Roles.APOYO_A_LA_COORDINACION,
                        Roles.GESTORES_SOCIALES, Roles.APOYO_A_LA_COORDINACION, Roles.GESTORES_SOCIALES]
                }
            },
            {
                path: 'group-component-date-activity-beneficiary/:id', component: GroupComponentDateActivityBeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'group-component-date-activity-beneficiary-add/:id', component: GroupComponentDateActivityBeneficiaryAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'divipol-availability-date-add/:id', component: DivipolAvailabilityDateAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'point/:id', component: PointComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'point-add/:id', component: PointAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'point-edit/:id', component: PointEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'assistance-upload', component: AssistanceUploadComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.DIRECCION, Roles.ADMIN,
                    Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION,
                    Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO,
                    Roles.PROFESIONAL_PSICOSOCIAL, Roles.GESTORES_SOCIALES]
                }
            },
            {
                path: 'assistance-error', component: AssistanceUploadsFixComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.DIRECCION, Roles.ADMIN,
                    Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION,
                    Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO,
                    Roles.PROFESIONAL_PSICOSOCIAL, Roles.GESTORES_SOCIALES]
                }
            },
            {
                path: 'assistance-edit/:id', component: AssistanceEditComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.DIRECCION, Roles.ADMIN,
                    Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION,
                    Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO,
                    Roles.PROFESIONAL_PSICOSOCIAL, Roles.GESTORES_SOCIALES]
                }
            },
            {
                path: 'account-data-masive', component: AccountDataMassiveComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'assistance-scanner-beneficiary', component: AssistanceScannerBeneficiaryComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN, Roles.PROFESIONAL_EDUCACION, Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PSICOSOCIAL] }
            },
            {
                path: 'beneficiary-without-group', component: BeneficiaryWithoutGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'my-regional-beneficiary-without-group', component: MyRegionalBeneficiaryWithoutGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'my-regional-beneficiary-massive-group', component: MyRegionalBeneficiaryMassiveGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'beneficiary-massive-group', component: BeneficiaryMassiveGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'region', component: RegionComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'region-add', component: RegionAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },
            {
                path: 'my-group', component: MyGroupComponent,
                canActivate: [RoleGuard], data: {
                    role: [Roles.DIRECCION, Roles.ADMIN, Roles.GESTORES_SOCIALES,
                    Roles.ENLACE_REGIONAL, Roles.COORDINACION, Roles.PROFESIONAL_EDUCACION,
                    Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_PSICOSOCIAL,
                    Roles.PROFESIONAL_SOCIOJURIDICO, Roles.PROFESIONAL_PREREGISTRO]
                }
            },
            {
                path: 'survey-documents', component: ShowSurveyDocumentsComponent,
                canActivate: [RoleGuard], data: { role: [Roles.DIRECCION, Roles.ADMIN] }
            },

            {
                path: 'beneficiary-by-psicosocial', component: BeneficiaryByPsicosocialComponent,
                canActivate: [RoleGuard], data: { role: [Roles.PROFESIONAL_PSICOSOCIAL] }
            },
            {
                path: 'document-validate-coordinator', component: DocumentValidateByRolComponent,
                canActivate: [RoleGuard], data: { role: [Roles.APOYO_A_LA_COORDINACION] }
            },
            {
                path: 'bank-data-add/:id', component: BankDataAddComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'agreement-signature', component: AgreementSignaureComponent,
                canActivate: [RoleGuard], data: { role: [Roles.PROFESIONAL_PSICOSOCIAL, Roles.PROFESIONAL_EDUCACION, 
                    Roles.PROFESIONAL_CORRESPONSABILIDAD, Roles.PROFESIONAL_SOCIOJURIDICO, Roles.APOYO_A_LA_COORDINACION, 
                    Roles.GESTORES_SOCIALES] }
            },
            {
                path: 'group-change/:id', component: GroupChangeComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'user-massive', component: MassiveUserComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'extemporary-survey', component: ExtemporarySurveyComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'update-preregister/:id', component: UpdatePreregisterComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'rnec-validated', component: RnecValidatedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'rnec-validated-edit/:id', component: RnecValidatedEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },

            {
                path: 'update-massive-group', component: UpdateMassiveGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'point-index', component: PointIndexComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.DIRECCION] }
            },
            {
                path: 'regional-link-update-massive-group', component: RegionalLinkUpdateMassiveGroupComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ENLACE_REGIONAL, Roles.COORDINACION] }
            },
            {
                path: 'assistance-generates', component: AssistanceGeneratesComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN] }
            },
            {
                path: 'calendar-working-days-edit/:id', component: CalendarWorkingDaysEditComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.COORDINACION] }
            },
            {
                path: 'attendance-by-month/:id', component: AttendancesByMonthComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.COORDINACION] }
            },
            {
                path: 'prueba/:id', component: AsssitanceDetectedComponent,
                canActivate: [RoleGuard], data: { role: [Roles.ADMIN, Roles.COORDINACION] }
            },
            

        ]
    },
    { path: '**', component: NotFoundComponent },
];

@NgModule({
    declarations: [
        UsersEditComponent,
        UsersAdminComponent,
        UsersAdminCreateComponent,
        UserPasswordChangeComponent,
        RegionalLinkComponent,
        RegionalLinkAddComponent,
        UserSelectorComponent,
        DivipolComponent,
        DivipolAddComponent,
        DivipolEditComponent,
        CoordinatorComponent,
        CoordinatorAddComponent,
        CoordinatorEditComponent,
        DivipolSelectorComponent,
        ProfessionalTeamComponent,
        ProfessionalTeamAddComponent,
        ProfessionalTeamEditComponent,
        BeneficiaryComponent,
        BeneficiaryAddComponent,
        RegionalLinkEditComponent,
        GroupComponent,
        GroupAddComponent,
        GroupEditComponent,
        DateTimeSelectorComponent,
        ComponentComponent,
        ComponentAddComponent,
        ComponentEditComponent,
        GroupProfessionalTeamComponent,
        GroupProfessionalTeamAddComponent,
        ProfessionalTeamSelectComponent,
        GroupBeneficiaryComponent,
        GroupBeneficiaryAddComponent,
        ComponentSelectorComponent,
        GroupShceduleComponent,
        GroupScheduleAddComponent,
        GroupScheduleBeneficiaryComponent,
        GroupScheduleBeneficiaryAddComponent,
        SurveyFinderComponent,
        TimeSelectorComponent,
        GroupSelectorComponent,
        SurveyComponent,
        SurveyMassiveDnpComponent,
        SurveyMassiveArnComponent,
        SurveyMassiveDpsComponent,
        ProfessionalTeamBeneficiaryComponent,
        PreRegisterComponent,
        CharacterizationComponent,
        MonitoringComponent,
        QuestionGroupComponent,
        QuestionGroupAddComponent,
        QuestionGroupEditComponent,
        QuestionComponent,
        QuestionAddComponent,
        QuestionEditComponent,
        QuestionAnswerComponent,
        QuestionAnswerAddComponent,
        QuestionAnswerEditComponent,
        SurveyQuestionGroupComponent,
        QuestionSelectorComponent,
        QuestionGroupSelectorComponent,
        QuestionAnswerSelectorComponent,
        ProfessionalTeamBeneficiaryDnpRejectedComponent,
        BeneficiaryNoValidateComponent,
        BeneficiaryMassiveValidateComponent,
        ProfessionalTeamBeneficiaryArnRejectedComponent,
        ProfessionalTeamBeneficiaryArnPendingComponent,
        ProfessionalTeamBeneficiaryDpsPendingComponent,
        ProfessionalTeamBeneficiaryAcceptedComponent,
        ProfessionalTeamBeneficiaryDnpPendingComponent,
        BeneficiaryNoValidateProfessionalComponent,
        RejectedDPSComponent,
        DnpComponent,
        ArnComponent,
        DpsComponent,
        CoresponsabilityAgreementComponent,
        MonitoringPendingComponent,
        PendingCharacterizationComponent,
        TMCComponent,
        AccountCertificationComponent,
        AttendanceLessPercentCorresponsabilityComponent,
        AttendanceLessPercentComponent,
        DocsIdentificationComponent,
        BankComponent,
        BankAddComponent,
        BankEditComponent,
        BankingCertificationRejectedComponent,
        DocumentValidateComponent,
        DocumentValidateVerifyComponent,
        DocumentValidateUpdateComponent,
        DateGroupComponent,
        DateGroupEditComponent,
        DateGroupAddComponent,
        DateGroupSelectorComponent,
        ComponentGroupComponent,
        ComponentGroupAddComponent,
        ComponentGroupEditComponent,
        DashboardComponent,
        CalendarWorkingDaysComponent,
        CalendarWorkingDaysAddComponent,
        GroupComponentDateActivityAddMassiveComponent,
        RegionalLinkSelectorComponent,
        PointSelectorComponent,
        BeneficiaryAddGroupComponent,
        BeneficiaryGroupComponent,
        BankCertificationNoValidateComponent,
        BankCertificationValidateVerifyComponent,
        BankCertificationValidateUpdateComponent,
        CoresponsabilityAgreementMasiveComponent,
        AccountCertificationMasiveComponent,
        GroupComponentDatesComponent,
        ComponentGroupTemplateComponent,
        ChangeMyPasswordComponent,
        PeriodsAddComponent,
        GroupComponentDateActivityBeneficiaryComponent,
        GroupComponentDateActivityBeneficiaryAddComponent,
        PeriodSelectorComponent,
        GroupComponentActivityBeneficiaryAddMassiveComponent,
        DivipolAvailabilityDateAddComponent,
        PointComponent,
        PointAddComponent,
        PointEditComponent,
        AssistanceUploadComponent,
        AccountDataMassiveComponent,
        AssistanceScannerBeneficiaryComponent,
        BeneficiaryWithoutGroupComponent,
        BeneficiaryMassiveGroupComponent,
        RegionComponent,
        RegionAddComponent,
        DepartmentSelectorComponent,
        MyGroupComponent,
        ShowSurveyDocumentsComponent,
        CoordinatorSelectorComponent,
        SurveyFinderRegionComponent,
        BeneficiaryByPsicosocialComponent,
        DocumentValidateByRolComponent,
        BankDataAddComponent,
        BankSelectorComponent,
        AgreementSignaureComponent,
        ImageViewerComponent,
        GroupChangeComponent,
        MassiveUserComponent,
        ExtemporarySurveyComponent,
        UpdatePreregisterComponent,
        RnecValidatedComponent,
        RnecValidatedEditComponent,
        UpdateMassiveGroupComponent,
        PointIndexComponent,
        MyRegionalBeneficiaryWithoutGroupComponent,
        MyRegionalBeneficiaryMassiveGroupComponent,
        RegionalLinkUpdateMassiveGroupComponent,
        AssistanceGeneratesComponent,
        AssistanceGeneratesTableComponent,
        AssistanceGeneratesPeriodComponent,
        SurverMassiveUpdateComponent,
        CalendarWorkingDaysEditComponent,
        AssistanceUploadsFixComponent,
        AssistanceEditComponent,
        AsssitanceDetectedComponent,
        FormSelectDateComponent,
        AssistanceEditComponent,
        AttendancesByMonthComponent,
        MonthYearSelectorComponent,
    ],
    imports: [
        RouterModule.forRoot(routes),
    SharedModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatMenu,
    BaseChartDirective,
    CommonModule,
    LoadingComponent,
    ButtonBackComponent,
    MatCheckboxModule
    
],
    exports: [RouterModule, SharedModule, MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatButtonModule,
        MatIconModule,
        MatMenu,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        {
            provide: MAT_MENU_DEFAULT_OPTIONS,
            useValue: { overlayPanelClass: 'custom-overlay-panel' },
        },
        // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    ]
})
export class AppRoutingModule { }
