import { Component, OnInit } from '@angular/core';
import { QuestionGroupService } from '../../service/question-group.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterizationService } from '../../service/characterization.service';
import Swal from 'sweetalert2';
import { SurveyService } from '../../service/survey.service';
import { IndexedDbService } from '../../service/indexed-db.service';

@Component({
    selector: 'app-characterization',
    standalone: false,
    templateUrl: './characterization.component.html',
    styleUrl: './characterization.component.scss'
})
export class CharacterizationComponent implements OnInit {

    questions: any[] = [];
    subgroups: any[] = [];
    completedAllQuestions = false;
    survey: any;
    questionData: any = [];
    qty = 0;
    syncStatus = '';

    constructor(private questionGroupService: QuestionGroupService,
        private characterizationService: CharacterizationService,
        private router: Router,
        private indexedDbService: IndexedDbService,
        private activatedRoute: ActivatedRoute
    ) {
        this.survey = {};
        this.survey.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        this.questionGroupService.getAllCharacterization()
            .subscribe((response: any) => {
                this.subgroups = response.questionGroup.questions.map((question: any) => {
                    return question.QuestionSubgroup;
                })
                    .filter((value: any, index: number, self: any[]) =>
                        index === self.findIndex((obj) => obj.id === value.id)
                    );
                this.questions = response.questionGroup.questions.map((question: any) => {
                    question.userResponse = undefined;
                    question.answerObj = question.answers.map((answer: any) => {
                        return { key: answer.id, value: answer.answer };
                    });
                    return question;
                })
                    .sort((a: any, b: any) => {
                        if (a.orderQuestion > b.orderQuestion) {
                            return 1;
                        }
                        if (a.orderQuestion < b.orderQuestion) {
                            return -1;
                        }
                        return 0;
                    });
            });
    }

    addUserResponse(userResponse: any, questionId: number) {
        let checkingCompleted = true;
        for (const question of this.questions) {
            if (question.id == questionId) {
                question.userResponse = userResponse;
            }
            if (question.isMandatory == 'si') {
                if (!question.userResponse) {
                    checkingCompleted = false;
                }
            }
        }
        this.completedAllQuestions = checkingCompleted;
        if (this.completedAllQuestions) {
            this.transformData();
        }
    }
    async syncWithServer(): Promise<void> {
        const unsyncedRecords = await this.indexedDbService.getAllCharacterization();
        const recordsToSync = unsyncedRecords.filter((record) => !record.synced);

        let success = false;
        let error = false;
        for (const record of recordsToSync) {
            try {
                const response = await this.uploadToServer(record);

                if (response.ok) {
                    await this.indexedDbService.deleteCharacterization(record.id);
                    success = true;
                }
            } catch (error) {
                console.error(`Error al sincronizar el registro ${record.id}:`, error);
                error = true;
            }
        }
        this.qty = await this.indexedDbService.getQuantityCharacterization();
        if (success) {
            await Swal.fire('Datos sincronizados', 'Se han sincronizado los datos correctamente en la base de datos');
        }
        if (error) {
            await Swal.fire('Sincronización pendiente', 'Cuando se detecte el internet los datos serán soncronizados', 'success');
        }
    }

    private async uploadToServer(record: any): Promise<any> {
        const formData = record;
        if (this.completedAllQuestions) {
            return new Promise((resolve, reject) => {
                const questionJson = JSON.stringify(this.questionData);
                this.characterizationService.create(questionJson)
                    .subscribe({
                        next: (response: any) => {
                            Swal.fire('Operación correcta', 'Caracterización creada correctamente', 'success');
                            this.router.navigateByUrl(`/app/professional-team-beneficiary`)
                        },
                        error: (error: any) => {
                            console.error(error);
                            Swal.fire('Operación incorrecta', 'No se ha podido crear la carcterización', 'error');
                        }
                    });
            });
        }

    }

    transformData() {
        let questionInfo: any;
        let questionAnswerId: any;
        let answer: any;
        for (const question of this.questions) {
            if (typeof (question.userResponse) === 'number') {
                questionAnswerId = question.userResponse;
                for (const answerData of question.answers) {
                    if (answerData.id === questionAnswerId) {
                        answer = answerData.answer
                    }
                }
            } if (typeof (question.userResponse) === 'object') {
                for (const userResponse of question.userResponse) {
                    for (const answerData of question.answers) {
                        if (userResponse == answerData.id) {
                            answer = answerData.answer
                        }
                    }
                }
            }
            else {
                answer = question.userResponse
            }
            questionInfo = {
                'surveyId': this.survey.id,
                'questionId': question.id,
                'question': question.question,
                'questionAnswerId': questionAnswerId,
                'answer': answer,
            },
                this.questionData.push(questionInfo);
        }
    }
    async sendForm() {
        if (this.completedAllQuestions) {
            const questionJson = JSON.stringify(this.questionData);
            this.characterizationService.create(questionJson)
                .subscribe({
                    next: (response: any) => {
                        Swal.fire('Operación correcta', 'Caracterización creada correctamente', 'success');
                        this.router.navigateByUrl(`/app/professional-team-beneficiary`)
                    },
                    error: (error: any) => {
                        console.error(error);
                        Swal.fire('Operación incorrecta', 'No se ha podido crear la carcterización', 'error');
                    }
                });
        }
    }

}
