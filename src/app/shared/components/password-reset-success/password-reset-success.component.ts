import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationAlignmentService } from 'src/app/app-services/translation-alignment.service';

@Component({
  selector: 'app-password-reset-success',
  templateUrl: './password-reset-success.component.html',
  styleUrls: ['./password-reset-success.component.scss']
})
export class PasswordResetSuccessComponent {

  constructor(private router:Router,
    public translationService: TranslationAlignmentService,){}

  BackToLogin(){
    this.router.navigate(['/login'])
  }
}
