import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { BoardComponent } from '../board/board.component';
import { LessonInfo, Move} from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { TranslateService } from '@ngx-translate/core';
import {toDoc} from "ngx-editor";

@Component({
  selector: 'chess-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.scss']
})
export class BuilderComponent implements OnInit, AfterViewInit {
  public lessonId = this.activatedRoute.snapshot.paramMap.get('id');
  public form: FormGroup;
  public movesForm: FormGroup;
  public moves: Move[] = [];
  public INITIAL_FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  public initialState: FormControl;
  public notation: FormControl;
  public orientation: FormControl;
  public isMoveFormDisplayed = new BehaviorSubject<boolean>(false);
  public isMoveFormDisplayed$ = this.isMoveFormDisplayed.asObservable().pipe(
    tap((isOpened: boolean) => {
      if (isOpened || !!this.moves.length) {
        this.initialState.disable();
        this.orientation.disable();

      } else {
        this.initialState.enable();
        this.orientation.enable();
      }

    }), shareReplay());

  @ViewChild(BoardComponent) public board: BoardComponent;
  @ViewChild(MatAccordion) public accordion: MatAccordion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private lessonsStoreService: LessonsStoreService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.initForms();
  }

  public ngAfterViewInit(): void {
    this.subscribeData();

    this.initialState.valueChanges.subscribe((fen: string) => {
      this.board.fen = fen;
    });
  }

  public onPieceDrop({ piece, notation }: Move): void {
    if (this.initialState.disabled) {
      this.movesForm.get('piece')!.setValue(piece);
      this.movesForm.get('notation')!.setValue(notation);
    }
  }

  public onPieceChange({ oldPos, newPos }: { oldPos: string, newPos: string }): void {
    if (!this.initialState.disabled) {
      this.initialState.setValue(newPos, { emitEvent: false });
    }
  }

  public addMove(): void {
    const fen = this.board.fen;
    this.moves.push({ ...this.movesForm.value, fen });
    this.resetInputs();
  }

  public resetInputs(): void {
    this.movesForm.reset();
    this.movesForm.markAsPristine();
  }

  public resetMoveInputs(): void {
    this.resetInputs();
    this.undo();
  }

  public removeLastMove(): void {
    this.moves.pop();
    this.undo();
    if (!this.moves.length) {
      this.isMoveFormDisplayed.next(true);
    }
  }

  public clearBoard(): void {
    this.board.clear();
    this.initialState.setValue(this.board.fen, { emitEvent: false });
  }

  public changeOrientation(): void {
    this.board.changeOrientation();
    this.form.get('orientation')?.setValue(this.board.orientation);
  }

  public setStartPosition(): void {
    this.board.fen = this.INITIAL_FEN;
    this.initialState.setValue(this.INITIAL_FEN, { emitEvent: false });
  }

  public toggleForm(isOpened: boolean): void {
    this.board.toggleSparePieces(isOpened);
    this.isMoveFormDisplayed.next(isOpened);
  }

  public undo(): void {
    this.board.fen = this.moves[this.moves.length - 1]?.fen || this.initialState.value;
  }

  public discard(): void {
    this.goToList();
  }

  public publish(): void {
    if (this.form.invalid) {
      this.form.get('description')?.markAllAsTouched();
      return;
    }

    const lesson = {
      ...this.form.value,
      initialState: this.initialState?.value,
      moves: this.moves,
      orientation: this.board.orientation
    };

    if (this.lessonId) {
      this.lessonsStoreService.updateLesson(this.lessonId, lesson)
    } else {
      this.lessonsStoreService.addLesson(lesson);
    }
  }

  private goToList(): void {
    this.router.navigate(['/lessons']);
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      initialState: [this.INITIAL_FEN, Validators.required],
      notationType: [this.translate.currentLang === 'ua' ? 'cyr' : 'lat'],
      orientation: ['white', Validators.required],
      disableDrag: [false]
    });

    this.initialState = this.form.get('initialState') as FormControl;
    this.orientation = this.form.get('orientation') as FormControl;

    this.movesForm = this.formBuilder.group({
      piece: ['', Validators.required],
      notation: ['', Validators.required]
    });

    this.notation = this.form.get('notation') as FormControl;
  }

  private subscribeData(): void {
    if (this.lessonId) {
      this.lessonsStoreService.requestLessonInfo(this.lessonId);
      this.lessonsStoreService.lessonInfo$
        .pipe(tap((lesson: LessonInfo) => this.updateData(lesson)))
        .subscribe();
    }
  }

  private updateData(lesson: LessonInfo) {
    const { title, description, initialState, moves, orientation, notationType, disableDrag } = lesson;



    setTimeout(() => {
      if (moves.length) {
        this.isMoveFormDisplayed.next(true);
      }
      this.form.get('title')!.setValue(title, { emitEvent: false });
      this.form.get('description')!.setValue(description, { emitEvent: false });
      this.form.get('initialState')!.setValue(initialState, { emitEvent: false });
      this.form.get('orientation')!.setValue(orientation, { emitEvent: false });
      this.form.get('notationType')!.setValue(notationType, { emitEvent: false });
      this.form.get('disableDrag')!.setValue(disableDrag, { emitEvent: false });
      this.board.orientation = orientation;
      this.board.fen = moves.length ? moves[moves.length - 1].fen : initialState;
      this.moves = [...moves];
    });

  }

}
