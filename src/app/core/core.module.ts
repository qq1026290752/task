import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { loadSvgResources } from '../utlis/svg.utils.module';
import { AppRoutingModule } from '../app-routing.module';
import { ServicesModule } from '../services/services.module';
import 'hammerjs';
import 'rxjs/add/operator/take';

@NgModule({
  imports: [
    SharedModule,
    AppRoutingModule,
    ServicesModule.forRoot(),
    BrowserAnimationsModule,
  ],
  declarations: [
      HeaderComponent,
      FooterComponent,
      SidebarComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    AppRoutingModule,
    BrowserAnimationsModule
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() core: CoreModule,
  icon: MatIconRegistry, dom: DomSanitizer) {
    if (core) {
      throw new Error('核心包已经初始化完毕');
    }
    loadSvgResources(icon, dom);
  }
}
