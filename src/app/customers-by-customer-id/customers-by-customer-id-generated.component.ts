/*
  This file is automatically generated. Any changes will be overwritten.
  Modify customers-by-customer-id.component.ts instead.
*/
import { ChangeDetectorRef, ViewChild, AfterViewInit, Injector, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs';

import { DialogService, DIALOG_PARAMETERS, DialogRef } from '@radzen/angular/dist/dialog';
import { NotificationService } from '@radzen/angular/dist/notification';
import { ContentComponent } from '@radzen/angular/dist/content';
import { HeadingComponent } from '@radzen/angular/dist/heading';
import { GridComponent } from '@radzen/angular/dist/grid';
import { ButtonComponent } from '@radzen/angular/dist/button';
import { AddCustomerComponent } from '../add-customer/add-customer.component';
import { EditCustomerComponent } from '../edit-customer/edit-customer.component';

import { NorthwindService } from '../northwind.service';
import { SecurityService } from '../security.service';

export class CustomersByCustomerIdGenerated implements AfterViewInit, OnInit, OnDestroy {
  // Components
  @ViewChild('content1') content1: ContentComponent;
  @ViewChild('pageTitle') pageTitle: HeadingComponent;
  @ViewChild('grid0') grid0: GridComponent;

  router: Router;

  cd: ChangeDetectorRef;

  route: ActivatedRoute;

  notificationService: NotificationService;

  dialogService: DialogService;

  dialogRef: DialogRef;

  _location: Location;

  _subscription: Subscription;

  northwind: NorthwindService;

  security: SecurityService;

  getCustomersResult: any;

  getCustomersCount: any;

  customer: any;

  parameters: any;

  constructor(private injector: Injector) {
  }

  ngOnInit() {
    this.notificationService = this.injector.get(NotificationService);

    this.dialogService = this.injector.get(DialogService);

    this.dialogRef = this.injector.get(DialogRef, null);

    this.router = this.injector.get(Router);

    this.cd = this.injector.get(ChangeDetectorRef);

    this._location = this.injector.get(Location);

    this.route = this.injector.get(ActivatedRoute);

    this.northwind = this.injector.get(NorthwindService);
    this.security = this.injector.get(SecurityService);
  }

  ngAfterViewInit() {
    this._subscription = this.route.params.subscribe(parameters => {
      if (this.dialogRef) {
        this.parameters = this.injector.get(DIALOG_PARAMETERS);
      } else {
        this.parameters = parameters;
      }
      this.load();
      this.cd.detectChanges();
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }


  load() {
    this.northwind.getCustomers(`CustomerID eq '${this.parameters.CustomerID}'`, this.grid0.allowPaging ? this.grid0.pageSize : null, this.grid0.allowPaging ? 0 : null, null, null, this.grid0.allowPaging)
    .subscribe((result: any) => {
      this.getCustomersResult = result.value;

      this.getCustomersCount = this.grid0.allowPaging ? result['@odata.count'] : result.value.length;

      this.customer = result.value[0];
    }, (result: any) => {

    });
  }

  grid0Add(event: any) {
    this.dialogService.open(AddCustomerComponent, { parameters: {}, title: 'Add Customer' });
  }

  grid0Delete(event: any) {
    this.northwind.deleteCustomer(`${event.CustomerID}`)
    .subscribe((result: any) => {
      this.notificationService.notify({ severity: "success", summary: `Success`, detail: `Customer deleted!` });
    }, (result: any) => {
      this.notificationService.notify({ severity: "error", summary: `Error`, detail: `Unable to delete Customer` });
    });
  }

  grid0LoadData(event: any) {
    this.northwind.getCustomers(`${event.filter ? event.filter + ' and ' : ''}CustomerID eq '${this.parameters.CustomerID}'`, event.top, event.skip, `${event.orderby}`, ``, event.top != null && event.skip != null)
    .subscribe((result: any) => {
      this.getCustomersResult = result.value;

      this.getCustomersCount = event.top != null && event.skip != null ? result['@odata.count'] : result.value.length;
    }, (result: any) => {

    });
  }

  grid0RowSelect(event: any) {
    this.dialogService.open(EditCustomerComponent, { parameters: {CustomerID: event.CustomerID}, title: 'Edit Customer' });
  }

  button0Click(event: any, data: any) {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.router.navigate(['orders-by-customer-id', data.CustomerID]);
  }
}
