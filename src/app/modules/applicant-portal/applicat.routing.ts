import { Route } from '@angular/router';
import { ApplicantComponent } from './applicant.component';
import { RoutesEnum } from 'src/app/shared/enums/routes.enum';


export const applicationRoutes: Route[] = [
    {path: '', pathMatch : 'full', redirectTo: RoutesEnum.Applicant},
    {
        path     : '',
        component: ApplicantComponent,
        children: []
    }

];