import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'chess-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public lang = new FormControl(this.translate.currentLang);

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.lang.valueChanges.subscribe(
      ((lang: string) => {
        this.translate.use(lang);
      })
    )
  }

}
