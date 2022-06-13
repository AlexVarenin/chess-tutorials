import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthorizationService } from '../../services/authorization.service';

@Component({
  selector: 'chess-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form!: FormGroup;
  public error!: string | null;
  public isLoading = false;
  public hidePassword = true;

  private destroy$ = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onSubmit() {
    this.error = null;
    this.isLoading = true;
    this.authService.login(this.normalizeInput(this.form)).pipe(
      finalize(() => this.isLoading = false),
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.router.navigate(['/']),
      (error: HttpErrorResponse) => this.error = error.message
    );
  }

  private normalizeInput(form: FormGroup): { login: string; password: string } {
    return { login: form.value.login.trim(), password: form.value.password };
  }

}
