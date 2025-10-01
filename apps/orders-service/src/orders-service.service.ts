import { Injectable } from '@nestjs/common';
import { SumResponse } from 'libs/proto/orders';
import { Observable, of } from 'rxjs';


@Injectable()
export class OrdersServiceService {
  
  multiply(a: number, b: number): Observable<SumResponse> {
    const result = a * b;
    return of({ result }); 
  }

  add(a: number, b: number): number {
    const result = a + b;
    return result ; 
  }
}
