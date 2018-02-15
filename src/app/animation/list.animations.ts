import { trigger, stagger , style, transition, animate, query, group  } from '@angular/animations' ;
export const ListAnimation = trigger('listAnimation' , [
    transition('* => *', [
        query('.enter', style({opacity: '0'}) , {optional: true} ),
        query('.enter', stagger(100, [ animate('1s', style({opacity: '1'}))]), {optional: true}),
        query('.leave', style({opacity: '1'}), {optional: true}),
        query('.leave', stagger(100, [
            animate('1s', style({
                opacity: '0'
            }))
        ]), {optional: true})
    ]),
]);