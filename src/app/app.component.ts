import { Component } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { environment } from '../environments/environment';

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
    this.translate.addLangs(environment.langs);
    this.translate.use(this.translate.langs[0]);
  }
}
