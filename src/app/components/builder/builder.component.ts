import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {filter, shareReplay, tap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MatAccordion } from '@angular/material/expansion';
import { BoardComponent } from '../board/board.component';
import { Lesson, Move } from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';

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
  public isMoveFormDisplayed = new BehaviorSubject<boolean>(false);
  public isMoveFormDisplayed$ = this.isMoveFormDisplayed.asObservable().pipe(
    tap((isOpened: boolean) => {
      if (isOpened || !!this.moves.length) {
        this.initialState.disable();
      } else {
        this.initialState.enable();
      }

    }), shareReplay());

  @ViewChild(BoardComponent) public board: BoardComponent;
  @ViewChild(MatAccordion) public accordion: MatAccordion;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private lessonsStoreService: LessonsStoreService
  ) { }

  public ngOnInit(): void {
    this.initForms();
  }

  public ngAfterViewInit(): void {
    this.subscribeData();

    this.initialState.valueChanges.subscribe((fen: string) => {
      this.board.fen = fen;
    });

    this.movesForm.valueChanges.subscribe(() => {
      if (this.movesForm.valid) {
        const { from, to } = this.movesForm.value;
        this.board.movePiece(`${from}-${to}`);
        const piece = this.board.getPieceByPosition(to);
        if (piece) {
          this.movesForm.get('piece')!.setValue(piece, { emitEvent: false });
        }
      }
    });
  }

  public onPieceDrop({ from, to, piece }: Move): void {
    if (this.initialState.disabled) {
      this.movesForm.get('from')!.setValue(from, { emitEvent: false });
      this.movesForm.get('to')!.setValue(to, { emitEvent: false });
      this.movesForm.get('piece')!.setValue(piece, { emitEvent: false });
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

    this.lessonsStoreService.addLesson(lesson);

    this.goToList();
  }

  private goToList(): void {
    this.router.navigate(['/lessons']);
  }

  private initForms(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      initialState: [this.INITIAL_FEN, Validators.required]
    });

    this.initialState = this.form.get('initialState') as FormControl;

    this.movesForm = this.formBuilder.group({
      from: ['', Validators.required],
      to: ['', Validators.required],
      piece: ['']
    });
  }

  private subscribeData(): void {
    if (this.lessonId) {
      this.lessonsStoreService.getLessonInfo$(this.lessonId)
        .pipe(filter(Boolean), tap((lesson: Lesson) => this.updateData(lesson)))
        .subscribe();
    }
  }

  private updateData(lesson: Lesson) {
    const { title, description, initialState, moves, orientation } = lesson;
    this.board.orientation = orientation;
    this.board.fen = initialState;
    this.moves = moves;
    setTimeout(() => {
      this.form.get('title')!.setValue(title, { emitEvent: false });
      this.form.get('description')!.setValue(description, { emitEvent: false });
      this.form.get('initialState')!.setValue(initialState, { emitEvent: false });
    });

    if (moves.length) {
      this.isMoveFormDisplayed.next(true);
    }

  }
}