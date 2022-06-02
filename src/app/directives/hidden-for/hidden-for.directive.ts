import { Directive, ElementRef, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsersStoreService } from '../../store/users/services/users-store.service';

@Directive({
  selector: '[hiddenFor]'
})
export class HiddenForDirective implements OnDestroy {

  private meSubscription!: Subscription;

  constructor(
    private elementRef: ElementRef,
    private usersStoreService: UsersStoreService,
    private el: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input() set hiddenFor(roles: string[] | undefined) {
    this.meSubscription = this.usersStoreService.userMe$.subscribe(
      ({ role }) => roles && roles.includes(role)
        ? this.viewContainer.clear()
        : this.viewContainer.createEmbeddedView(this.el)
    );
  }

  ngOnDestroy(): void {
    this.meSubscription.unsubscribe();
  }

}
