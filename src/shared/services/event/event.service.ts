import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarRef, MatSnackBarModule} from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(private snakbar: MatSnackBar ) { }

  public showSuccessMessage(msg: string = 'success!'){
    this.snakbar.open(msg,'',{duration: 3000, horizontalPosition: 'center',
      verticalPosition: 'top'})
  }
}
