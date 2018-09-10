import { Component, Injector } from '@angular/core';
import { UnauthorizedGenerated } from './unauthorized-generated.component';

@Component({
  selector: 'unauthorized',
  templateUrl: './unauthorized.component.html'
})
export class UnauthorizedComponent extends UnauthorizedGenerated {
  constructor(injector: Injector) {
    super(injector);
  }
}
