import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AllItemsComponent } from './all-items/all-items.component';
import { ItemComponent } from './item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    AllItemsComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path:'',
        component: AllItemsComponent
      },
      {
        path:'item/:id',
        component: ItemComponent
      }])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
