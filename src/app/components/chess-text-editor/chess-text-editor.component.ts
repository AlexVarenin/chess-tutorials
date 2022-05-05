import {
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
  Injector, Input
} from '@angular/core';
import {Editor, Toolbar } from 'ngx-editor';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl, Validators} from "@angular/forms";
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'chess-chess-text-editor',
  templateUrl: './chess-text-editor.component.html',
  styleUrls: ['./chess-text-editor.component.scss'],providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => ChessTextEditorComponent),
    multi: true,
  }],

})
export class ChessTextEditorComponent implements ControlValueAccessor, OnInit, OnDestroy {
  public editor = new Editor();
  public toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  public formControl = new FormControl('', Validators.required);
  public placeholderText = '';
  public isOnFocus = false;
  private onChange: (value: string) => void = () => { };
  private onTouched: () => void = () => { };
  private valueChangesSub!: Subscription;
  @Input() set placeholder(value: string) {
    this.placeholderText = value;
  }

  constructor(private inj: Injector){}

  ngAfterViewInit() {
    const outerControl = this.inj.get(NgControl).control;
    const prevMarkAsTouched = outerControl?.markAsTouched;
    outerControl!.markAsTouched = (...args: any) => {
      this.formControl.markAsTouched();
      prevMarkAsTouched!.bind(outerControl)(...args);
    };
  }

  ngOnInit(): void {
    this.valueChangesSub = this.formControl.valueChanges.subscribe((jsonDoc: string) => {

      if (this.isEmpty(jsonDoc)) {
        jsonDoc = '';
        this.formControl.setValue(jsonDoc, { emitEvent: false });
      }

      this.onChange(jsonDoc);
    });
  }

  onFocusOut() {
    this.isOnFocus = false;
    this.onTouched();
  }

  onFocusIn() {
    this.isOnFocus = true;
  }

  ngOnDestroy(): void {
    this.editor.destroy();
    this.valueChangesSub.unsubscribe();
  }

  writeValue(value: Record<string, any> | string | null): void {
    this.formControl?.setValue(value, { emitEvent: true })
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }


  setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.formControl.disable();
    } else {
      this.formControl.enable();
    }
  }


  private isEmpty(template: string): boolean {
    return ['<p></p>', '<h1></h1>', '<h2></h2>', '<h3></h3>', '<h4></h4>', '<h5></h5>', '<h6></h6>'].includes(template)
  }
}
