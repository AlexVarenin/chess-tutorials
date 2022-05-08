import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Move } from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';
import {FormControl, Validators} from "@angular/forms";
import {normaliseNotation} from "../../services/notation-normaliser.helper";

type HistoryMove = Move & { isFalsy?: boolean };

@Component({
  selector: 'chess-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  public historyMoves: HistoryMove[] = [];
  public controlMoves: Move[] = [];
  public notationType: 'cyr' | 'lat';
  public state: string;
  public moveIndex = 0;
  public lessonId = this.activatedRoute.snapshot.paramMap.get('id');
  public notation = new FormControl('', Validators.required);
  public lesson$ = this.lessonsStoreService.getLessonInfo$(this.lessonId as string).pipe(filter(Boolean),
    tap(lesson => {
      this.state = lesson.initialState;
      this.controlMoves = lesson.moves;
      this.notationType = lesson.notationType;
    }));

  @ViewChild(BoardComponent) public board: BoardComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private lessonsStoreService: LessonsStoreService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {

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
    setTimeout(() => {
      const move = { piece, notation, fen: this.board.fen };
      this.checkMove(move as Move, true);
    })
  }

  private checkMove(move: Move, isDirectInput?: boolean) {
    const controlMove = this.controlMoves[this.moveIndex];
    if (controlMove.fen === move.fen && (!isDirectInput || move.notation === controlMove.notation)
    ) {
      this.historyMoves.push(move);
      const botMove = this.controlMoves[++this.moveIndex];
      if (botMove) {
        this.moveBotPiece(botMove);
      } else {
        this.showSuccessDialog();
      }
    } else {
      this.historyMoves.push({ ...move, isFalsy: true});
      this.board.fen = this.state;
    }
  }

  private showSuccessDialog(): void {
    const dialogRef = this.dialog.open(ChessConfirmationDialogComponent, {
      width: '300px',
      autoFocus: false,
      disableClose: true,
      data: {
        title:  'Congratulations!',
        description: 'You have successfully finished this lesson! Go to lessons list?',
        hideCancel: true
      }
    });
    dialogRef.afterClosed().subscribe((isConfirmed: boolean) => {
      if (isConfirmed) {
        this.router.navigate(['/lessons']);
      }
    });
  }

  private moveBotPiece(move: Move): void {
    this.moveIndex++;
    setTimeout(() => {
      this.historyMoves.push(move);
      this.state = this.board.fen = move.fen;
    }, 500);
  }

}
