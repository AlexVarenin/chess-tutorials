import { Component, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { BoardComponent } from '../board/board.component';
import { Move } from '../../store/lessons/models';
import { LessonsStoreService } from '../../store/lessons/services/lessons-store.service';

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
    private activatedRoute: ActivatedRoute,
    private lessonsStoreService: LessonsStoreService
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
      }
    } else {
      this.historyMoves[this.historyMoves.length - 1].isFalsy = true;
      this.board.fen = this.state;
    }
  }

}
