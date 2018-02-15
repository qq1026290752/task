import { trigger, state , style, transition, animate, keyframes  } from '@angular/animations' ;
export const itemAnims = trigger('item' , [
    state('in', style({'border-left-width': '3px' })),
    state('out', style({'border-left-width': '6px' })),
    transition( 'out => hover', animate('100ms ease-in')),
    transition( 'hover => out', animate('100ms ease-out'))
]);