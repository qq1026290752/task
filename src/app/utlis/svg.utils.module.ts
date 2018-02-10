import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material';

export const loadSvgResources = (micon: MatIconRegistry, sanitizer: DomSanitizer) => {
   const imageDir = 'assets/image';
   const sidebarDir = `${imageDir}/sidebar/`;
   const daysDir = `${imageDir}/days/`;
   const avatarDir = `${imageDir}/avatar/`;
   const iconsDir = `${imageDir}/icons/`;
   micon.addSvgIconSetInNamespace('avatars', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}avatars.svg`));
   micon.addSvgIcon('month', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}month.svg`));
   micon.addSvgIcon('week', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}week.svg`));
   micon.addSvgIcon('projects', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}projects.svg`));
   micon.addSvgIcon('project', sanitizer.bypassSecurityTrustResourceUrl(`${sidebarDir}project.svg`));
   micon.addSvgIcon('move', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}move.svg`));
   micon.addSvgIcon('add', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}add.svg`));
   micon.addSvgIcon('delete', sanitizer.bypassSecurityTrustResourceUrl(`${iconsDir}delete.svg`));
   micon.addSvgIcon('unassigned', sanitizer.bypassSecurityTrustResourceUrl(`${avatarDir}unassigned.svg`));
   const days = [];
   for (let i = 1; i < 31 ; i++ ) {
        days.push(i);
   }
   days.forEach(d => micon.addSvgIcon(`day_${d}`, sanitizer.bypassSecurityTrustResourceUrl(`${daysDir}day${d}.svg`)));
}