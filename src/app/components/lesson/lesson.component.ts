import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Move } from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';
import { MatDialog } from '@angular/material/dialog';
import { ChessConfirmationDialogComponent } from '../chess-confirmation-dialog/chess-confirmation-dialog.component';

type HistoryMove = Move & { isFalsy?: boolean };

@Component({
  selector: 'chess-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  public historyMoves: HistoryMove[] = [];
  public controlMoves: Move[] = [];
  public state: string;
  public moveIndex = 0;
  public lessonId = this.activatedRoute.snapshot.paramMap.get('id');
  public lesson$ = this.lessonsStoreService.getLessonInfo$(this.lessonId as string).pipe(filter(Boolean),
    tap(lesson => {
      this.state = lesson.initialState;
      this.controlMoves = lesson.moves
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
    this.historyMoves.push(move);
    if (this.controlMoves[this.moveIndex].fen === move.fen) {
      const botMove = this.controlMoves[++this.moveIndex];
      if (botMove) {
        this.moveIndex++;
        setTimeout(() => {
          this.historyMoves.push(botMove);
          this.state = this.board.fen = botMove.fen;
        }, 500);
      } else {
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
    } else {
      this.historyMoves[this.historyMoves.length - 1].isFalsy = true;
      this.board.fen = this.state;
    }
  }

}
