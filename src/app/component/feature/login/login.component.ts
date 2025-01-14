import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../services/login/login.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NotificationService } from '../../../shared/notification/services/notification.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  currentUrl: string = '';
  formLogin!: FormGroup;
  formRegister!: FormGroup;


  constructor(private route: ActivatedRoute, private loginService: LoginService,
    private router: Router,
    private notificationService: NotificationService,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.route.url.subscribe(segments => {
      this.currentUrl = segments[segments.length - 1].path;
    });
    this.initLoginForm();
    this.initRegisterForm();
  }

  private initLoginForm() {
    this.formLogin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  private initRegisterForm() {
    this.formRegister = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      referenceCode: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]]
    }, {
      validators: this.passwordMatchValidator
    });
  }


  // Custom validator để check password match
  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    return null;
  }


  login() {
    this.loginService.login(this.formLogin.value.username, this.formLogin.value.password).subscribe({
      next: (response: any) => {
        if (response.result_code === 1) {
          this.router.navigate(['/vinclub']);
        } else {
          this.notificationService.showError('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu');
        }
      },
      error: (error) => {
        this.notificationService.showError('Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản và mật khẩu');
      }
    });
  }

  register() {
    if (this.formRegister.invalid) {
      return;
    } else {
    console.log(this.formRegister.value);
      this.loginService.register(this.formRegister.value).subscribe({
        next: (response: any) => {
          if (response.result_code === 1) {
            this.router.navigate(['/login']);
          } else {
            this.notificationService.showError(response.result_data.msg);
          }
        },
        error: (error) => {
          this.notificationService.showError('Đăng ký thất bại');
        }
      });
    }
  }
}
