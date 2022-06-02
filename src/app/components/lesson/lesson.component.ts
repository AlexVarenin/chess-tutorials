import {Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Move, MoveStatus } from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';
import { FormControl, Validators } from '@angular/forms';
import { normaliseNotation } from '../../services/notation-normaliser.helper';

type HistoryMove = Move & { isFalsy?: boolean };

@Component({
  selector: 'chess-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit, OnDestroy {
  public historyMoves: HistoryMove[] = [];
  public controlMoves: Move[] = [];
  public notationType: 'cyr' | 'lat';
  public state: string;
  public moveIndex = 0;
  public lessonId = this.activatedRoute.snapshot.paramMap.get('id');
  public notation = new FormControl('', Validators.required);
  public lesson$ = this.lessonsStoreService.lessonInfo$.pipe(
    tap(lesson => {
      this.state = lesson.initialState;
      this.controlMoves = lesson.moves;
      this.notationType = lesson.notationType;
    }));

  private destroy$ = new Subject<boolean>();

  @ViewChild(BoardComponent) public board: BoardComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonsStoreService: LessonsStoreService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.lessonsStoreService.requestLessonInfo(this.lessonId as string);

    this.lessonsStoreService.getCheckMoveSuccessAction().pipe(
      tap(({ status, move, nextMove }) => {
        if (status === MoveStatus.FAILED) {
          this.handleFailureMove(move);
        }
        if (status === MoveStatus.SUCCEED) {
          this.handleSuccessMove(move, nextMove);
        }
        if (status === MoveStatus.FINISHED) {
          this.handleFinishedMove(move);
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public onPieceDrop(move: Move): void {
    this.checkMove(move);
  }

  public resetInput(): void {
    this.notation.reset();
    this.notation.markAsPristine();
  }

  public addMove() {
    const { piece, notation } = normaliseNotation(
      this.notation.value,
      this.board.orientation as 'white' | 'black',
      this.notationType
    );
    this.board.movePiece(notation);
    this.resetInput();
    const move = { piece, notation, fen: this.board.fen };
    this.checkMove(move as Move);
  }

  public edit(): void {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  private checkMove(move: Move) {
    this.lessonsStoreService.checkStudentMove(this.lessonId as string, this.moveIndex, move);
  }

  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(ChessConfirmationDialogComponent, {
      width: '300px',
      autoFocus: false,
      disableClose: true,
      data: {
        title:  'LESSON.MODAL_SUCCESS_TITLE',
        description: 'LESSON.MODAL_SUCCESS_DESCRIPTION',
        hideCancel: true
      }
    });
    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.router.navigate(['lessons']);
      }
    });
  }

  private moveBotPiece(move: Move): void {
    this.moveIndex++;
    this.historyMoves.push(move);
    this.state = this.board.fen = move.fen;
  }

  private handleSuccessMove(move: Move, nextMove: Move): void {
    this.moveIndex++;
    this.historyMoves.push(move);
    this.moveBotPiece(nextMove);
  }

  private handleFinishedMove(move: Move): void {
    this.moveIndex++;
    this.historyMoves.push(move);
    this.showSuccessDialog();
  }

  private handleFailureMove(move: Move): void {
    this.historyMoves.push({ ...move, isFalsy: true });
    this.board.fen = this.state;
  }
}
