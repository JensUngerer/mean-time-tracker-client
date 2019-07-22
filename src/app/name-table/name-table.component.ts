import { IProjectGridLine } from './../project/project.component';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatTable, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'mtt-name-table',
  templateUrl: './name-table.component.html',
  styleUrls: ['./name-table.component.scss']
})
export class NameTableComponent implements OnInit, OnDestroy, OnChanges {

  @ViewChild(MatTable, { static: false })
  public theTable: MatTable<IProjectGridLine>;

  @Input()
  public columnName: string = null;

  @Input()
  public gridLines: IProjectGridLine[] = [];

  @Output()
  public nameCellClicked: EventEmitter<IProjectGridLine> = new EventEmitter<IProjectGridLine>();

  @Output()
  public deleteRowClicked: EventEmitter<IProjectGridLine> = new EventEmitter<IProjectGridLine>();

  public readonly displayedColumns: string[] = ['name', 'deleteRow'];

  public readonly faTrash = faTrash;

  public readonly dataSource: MatTableDataSource<IProjectGridLine> = null;

  private onRedrawTable(areRowsReset: boolean) {
    if (areRowsReset) {
      console.log('resetRows');
      this.dataSource.data = this.gridLines;
    } else {
      console.log('rowsAreNotReset');
    }
    if (this.theTable) {
      this.theTable.renderRows();
    }
  }

  public onNameCellClicked(row: IProjectGridLine) {
    this.nameCellClicked.emit(row);
  }

  public onDeleteRowClicked(row: IProjectGridLine) {
    this.deleteRowClicked.emit(row);
  }

  constructor() {
    this.dataSource = new MatTableDataSource(this.gridLines);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.gridLines) {
      this.onRedrawTable(true);
    }
  }
}