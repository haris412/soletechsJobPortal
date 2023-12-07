import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { ChangePassword } from 'src/app/models/ChangePassword';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  private _formBuilder = inject(UntypedFormBuilder);
  userForm: UntypedFormGroup;
  get f() { return this.userForm.controls; }
  strongPassword = false;
  code: string = "";
  confirmError: boolean = false;
  constructor(private router:Router,
              public lookupService: AppLookUpService,
              private toastrService: ToastrService,
              private activatedRoute: ActivatedRoute,
              private shareService: SharedService) {
              this.userForm = this._formBuilder.group({
                password:['', Validators.required],
                confirmPassword:['', Validators.required]
              });
            }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.code = params['code'];
    });
  }

  ChangeValue() {
    if (this.userForm.controls.password.value != "" && this.userForm.controls.confirmPassword.value != "" && this.userForm.controls.password.value != this.userForm.controls.confirmPassword.value) {
      this.confirmError = true;
    } else {
      this.confirmError = false;
    }
  }

  async SetNewPassword(){
    if (this.userForm.valid && !this.confirmError) {
      let cPassword = new ChangePassword();
      cPassword.code = this.code;
      cPassword.password = this.userForm.controls.password.value;
      cPassword.confirmPassword = this.userForm.controls.confirmPassword.value;
      cPassword.email = localStorage.getItem('email')?.toString();
      var data = await this.lookupService.ChangePassword(cPassword);
      if (data != null) {
        this.router.navigate(['/reset-password-success']);
      } else {
        this.toastrService.error(data.Message);
      }
    }
  }

  BackToLogin(){
    this.router.navigate(['/login']);
  }
  
  onPasswordStrengthChanged(event: boolean) {
		this.strongPassword = event;
	}
}
