import { trigger, transition, style, query, animateChild, group, animate } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('* <=> *', [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
      }),
    ]),
    query(':enter', [animate('0.3s ease', style({ opacity: 1 }))]),
  ]),
]);