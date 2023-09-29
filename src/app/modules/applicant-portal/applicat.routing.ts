import { Route } from '@angular/router';
import { ApplicantComponent } from './applicant.component';
import { RoutesEnum } from 'src/app/shared/enums/routes.enum';
import { ApplicantDashboardComponent } from './applicant-dashboard/applicant-dashboard.component';
import { AppliedJobActionsComponent } from './applied-job-actions/applied-job-actions.component';
import { ApplicantOnboardingComponent } from './applicant-onboarding/applicant-onboarding.component';


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
            {
                path: RoutesEnum.JobActions,
                component: AppliedJobActionsComponent
            },
            {
                path: RoutesEnum.Onboarding,
                component: ApplicantOnboardingComponent
            }
        ]
    }

];