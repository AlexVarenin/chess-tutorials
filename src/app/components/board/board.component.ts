import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import * as Chess from 'chess.js';
import * as ChessBoard from 'chessboardjs';
import { createRandomString } from "../../services/helper.helper";
import { Move } from "../../store/lessons/models";

@Component({
  selector: 'chess-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, AfterViewInit {
  public boardId = `board-${ createRandomString(5) }`;
  public engine = new Chess();
  public board: ChessBoardInstance;
  public isSpareHidden = false;
  @Input() public initialFen = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';
  @Input() public spare = true;
  @Input() public draggable = true;
  @Input() public isMinimised = false;
  @Input() public showNotation = true;
  @Input() public initialOrientation: 'black' | 'white' = 'white';
  @ViewChild('chessboard', { static: false }) public chessboard: ElementRef;
  @Output() public onDrop: EventEmitter<Move> = new EventEmitter();
  @Output() public onChange: EventEmitter<{ oldPos: string, newPos: string }> = new EventEmitter();

  public onPieceDrop = (from: string, to: string, piece: string) => {
    if (from !== to) {
      const notation = this.handleCastlingAndCreateNotation(from, to, piece);

      setTimeout(() => {
        this.onDrop.emit({ piece, notation, fen: this.fen });
      }, 100)
    }
  };

  public onPieceChange = (oldPos: string, newPos: string) => {
    this.onChange.emit({
      oldPos: ChessBoard.objToFen(oldPos),
      newPos: ChessBoard.objToFen(newPos)
    });
  };

  public get position(): {[key: string]: string} {
    return this.board.position() as { [key: string]: string };
  }

  public get fen(): string {
    return this.board.fen();
  }

  public set fen(fen: string) {
    this.board.position(fen);
  }

  public get orientation(): string {
    return this.board.orientation();
  }

  public set orientation(orientation: string) {
    this.board.orientation(orientation as 'black' | 'white');
  }

  public ngOnInit(): void {
    this.engine.load(this.initialFen);
  }

  public ngAfterViewInit(): void {
    this.board = ChessBoard(this.boardId, {
      orientation: this.initialOrientation,
      position: this.initialFen,
      draggable: this.draggable,
      pieceTheme: 'assets/chesspieces/{piece}.png',
      dropOffBoard: 'trash',
      sparePieces: this.spare,
      showNotation: this.showNotation,
      onDrop: this.onPieceDrop,
      onChange: this.onPieceChange
    });
  }

  public movePiece(move: string): void {
    let moves = this.fixMoveIfCastling(move);
    this.board.move(...moves);
  }

  public getPieceByPosition(position: string): string {
    const board = this.position;
    return board[position];
  }

  public clear(): void {
    this.board.clear(false);
  }

  public changeOrientation(): void {
    this.orientation = this.orientation === 'white' ? 'black' : 'white';
  }

  public toggleSparePieces(isHidden: boolean): void {
    this.isSpareHidden = isHidden;
  }

  private fixMoveIfCastling(move: string): string[] {
    let fixedMove = [move.replace('x', '-')];

    if (move === 'O-O') {
      fixedMove = this.orientation === 'white' ? ['e1-g1', 'h1-f1'] : ['e8-g8', 'h8-f8'];
    }
    if (move === 'O-O-O') {
      fixedMove = this.orientation === 'white' ? ['e1-c1', 'a1-d1'] : ['e8-c8', 'a8-d8'];
    }
    return fixedMove;
  }

  private handleCastlingAndCreateNotation(from: string, to: string, piece: string): string {
    let notation = `${from}-${to}`;
    if (piece === 'wK' && from === 'e1' && to === 'c1') {
      if (this.getPieceByPosition('a1') === 'wR') {
        notation = 'O-O-O';
        setTimeout(() => this.board.move(`a1-d1`), 50);
      }
    }
    if (piece === 'wK' && from === 'e1' && to === 'g1') {
      if (this.getPieceByPosition('h1') === 'wR') {
        notation = 'O-O';
        setTimeout(() => this.board.move(`h1-f1`), 50);
      }
    }
    if (piece === 'bK' && from === 'e8' && to === 'c8') {
      if (this.getPieceByPosition('a8') === 'bR') {
        notation = 'O-O-O';
        setTimeout(() => this.board.move(`a8-d8`), 50);
      }
    }
    if (piece === 'bK' && from === 'e8' && to === 'g8') {
      if (this.getPieceByPosition('h8') === 'bR') {
        notation = 'O-O';
        setTimeout(() => this.board.move(`h8-f8`), 50);
      }
    }
    return notation;
  }
}
