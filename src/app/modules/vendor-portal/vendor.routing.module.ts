import { Route } from "@angular/router";
import { VendorComponent } from "./vendor.component";
import { RoutesEnum } from "src/app/shared/enums/routes.enum";



export const vendorRoutes: Route[] = [
    { path: '', pathMatch: 'full', redirectTo: RoutesEnum.VendorDashboard },
    {
        path: '',
        component: VendorComponent,
        children: []
    }

];