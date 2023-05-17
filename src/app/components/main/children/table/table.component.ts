import { AfterViewInit, Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { IUser } from 'src/app/interfaces/user.inteface';
import { LoadUsersList } from 'src/app/store/users/users.actions';
import { selectUsersList } from 'src/app/store/users/users.selectors';

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  imports: [
    CommonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
})
export class TableComponent implements OnInit, AfterViewInit, OnDestroy{
  
  public readonly displayedColumns: string[] = ['id', 'login', 'html_url', 'avatar_url'];
  public users: IUser[] = [];
  public isLoading: boolean = true;
  public isError: boolean = false;
  public dataSource: MatTableDataSource<IUser> = new MatTableDataSource();

  public page: number = 0; // For updates with API filtration

  public filterForm: FormGroup<{ filter: AbstractControl }>;

  public destroy$: Subject<void> = new Subject<void>();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private store: Store
  ){}

  ngOnInit(): void {
    this.initForm();
    this.loadUserList();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initForm(): void {
    this.filterForm = new FormGroup<{ filter: AbstractControl }>({
      filter: new FormControl(''),
    });
    this.subscribeFilterValueChanges();
  }

  subscribeFilterValueChanges(): void {
    this.filterForm.get('filter')?.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(1500),
        distinctUntilChanged(),
      )
      .subscribe({
        next: (filterValue) => {
          this.applyFilter(filterValue);
        }
      });
  }

  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  loadUserList(): void {
    this.store.dispatch(LoadUsersList({ page: this.page }));
    this.store.select(selectUsersList)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log(data);
          this.dataSource.data = data;
        }
      });
  }
}
