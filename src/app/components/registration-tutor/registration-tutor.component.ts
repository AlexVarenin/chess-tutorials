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
import { ErrorStateMatcher } from '@angular/material/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../services/authorization.service';
import { CustomValidators } from '../../services/custorm-validators';
import { User } from '../../store/users/models';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control?.dirty && form?.form?.errors && form.form.errors['passwordsNoMatch']
  }
}

@Component({
  selector: 'chess-registration-tutor',
  templateUrl: './registration-tutor.component.html',
  styleUrls: ['./registration-tutor.component.scss']
})
export class RegistrationTutorComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public error!: string | null;
  public isLoading = false;
  public matcher = new MyErrorStateMatcher();
  public hidePassword = true;
  public hideConfirmPassword = true;

  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      confirmPassword: ['']
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
    const { email, firstName, lastName, password } = form.value;
    return { email, firstName, lastName, password, role: 'tutor' };
  }

}
