import { Route } from '@angular/router';
import { ApplicantComponent } from './applicant.component';
import { RoutesEnum } from 'src/app/shared/enums/routes.enum';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';


export const applicatRoutes: Route[] = [
    { path: '', pathMatch : 'full', redirectTo: RoutesEnum.ApplicantDashboard },
    {
        path     : '',
        component: ApplicantComponent,
        children: [
            {
                path: RoutesEnum.ApplicantDashboard,
                component: ApplicantDashboardComponent,
            },
        ]
    }

];