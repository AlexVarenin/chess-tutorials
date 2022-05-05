import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.translate.addLangs(['ua', 'en']);

    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang?.match(/|ua|en/) ? browserLang : 'ua');
  }
}
