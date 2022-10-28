import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BajaLoteComponent } from './baja-lote.component';

describe('BajaLoteComponent', () => {
  let component: BajaLoteComponent;
  let fixture: ComponentFixture<BajaLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BajaLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BajaLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
