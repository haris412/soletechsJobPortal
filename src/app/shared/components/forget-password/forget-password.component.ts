import { Component, OnInit, inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppLookUpService } from 'src/app/app-services/app-look-up.service';
import { SharedService } from '../../services/shared.service';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  private _formBuilder = inject(UntypedFormBuilder);
  userForm: UntypedFormGroup;
  get f() { return this.userForm.controls; }
  constructor(private router:Router,
              public lookupService: AppLookUpService,
              private toastrService: ToastrService,
              private shareService: SharedService,
              public translationService: TranslationAlignmentService,
              ) { 
                this.userForm = this._formBuilder.group({
                  email:['',[Validators.required , Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
                });
              }

  ngOnInit(): void {
  }

  async PasswordReset(){
    var data = await this.lookupService.GetResetPassword(this.userForm.controls.email.value);
    if (data != null && data.Message == "Email sent") {
      localStorage.setItem('email', this.userForm.controls.email.value);
      this.toastrService.success("Reset password link has been sent to your email account.");
    } else {
      this.toastrService.error(data.Message);
    }
  }
  Back(){
    this.router.navigate(['/login']);
  }
}
