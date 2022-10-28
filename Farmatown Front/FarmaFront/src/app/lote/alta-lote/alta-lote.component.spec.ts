import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaLoteComponent } from './alta-lote.component';

describe('AltaLoteComponent', () => {
  let component: AltaLoteComponent;
  let fixture: ComponentFixture<AltaLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AltaLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AltaLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
