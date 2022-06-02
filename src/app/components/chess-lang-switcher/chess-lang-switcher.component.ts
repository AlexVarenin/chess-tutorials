import { Component, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'chess-chess-lang-switcher',
  templateUrl: './chess-lang-switcher.component.html',
  styleUrls: ['./chess-lang-switcher.component.scss']
})
export class ChessLangSwitcherComponent implements OnInit, OnDestroy {

  public lang = new FormControl(this.translate.currentLang);
  private destroy$ = new Subject<boolean>();

  constructor(private translate: TranslateService) { }

  public ngOnInit() {
    this.lang.valueChanges.pipe(takeUntil(this.destroy$)).subscribe(
      ((lang: string) => {
        this.translate.use(lang);
      })
    )
  }

  public ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
