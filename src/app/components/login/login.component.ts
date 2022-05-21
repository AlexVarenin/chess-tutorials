import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthorizationService } from "../../services/authorization.service";

@Component({
  selector: 'chess-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  error!: string | null;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthorizationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.error = null;
    this.isLoading = true;
    this.authService.login(this.normalizeInput(this.form)).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      () => this.router.navigate(['/']),
      (error: HttpErrorResponse) => this.error = error.message
    );
  }

  private normalizeInput(form: FormGroup): { login: string; password: string } {
    return { login: form.value.login.trim(), password: form.value.password };
  }

}
