import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators
} from '@angular/forms';
import {finalize, takeUntil} from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../services/authorization.service';
import { CustomValidators } from '../../services/custorm-validators';
import { ErrorStateMatcher } from '@angular/material/core';
import { User } from '../../store/users/models';
import { ActivatedRoute } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control?.dirty && form?.form?.errors && form.form.errors['passwordsNoMatch']
  }
}

@Component({
  selector: 'chess-registration-student',
  templateUrl: './registration-student.component.html',
  styleUrls: ['./registration-student.component.scss']
})
export class RegistrationStudentComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public error!: string | null;
  public isLoading = false;
  public matcher = new MyErrorStateMatcher();
  public hidePassword = true;
  public hideConfirmPassword = true;
  public invitationCode = this.activatedRoute.snapshot.queryParamMap.get('code');

  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private activatedRoute: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      confirmPassword: ['', Validators.required],
      invitationCode: [this.invitationCode, Validators.required]
    }, {
      validator: CustomValidators.checkPasswords
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit() {
    this.error = null;
    this.isLoading = true;
    this.authService.register(this.normalizeInput(this.form)).pipe(
      finalize(() => this.isLoading = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => {},
      (error: HttpErrorResponse) => this.error = error.message
    );
  }

  private normalizeInput(form: FormGroup): Omit<User, 'id'> & { password: string } {
    const { email, firstName, lastName, password, invitationCode } = form.value;
    return { email, firstName, lastName, password, tutorId: invitationCode, role: 'student' };
  }

}
