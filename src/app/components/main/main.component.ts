import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './children/table/table.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';

@Component({
    selector: 'app-main',
    standalone: true,
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.scss'],
    imports: [
        CommonModule,
        TableComponent,
        FooterComponent,
        HeaderComponent
    ]
})
export class MainComponent {

}
