import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoLoteComponent } from './listado-lote.component';

describe('ListadoLoteComponent', () => {
  let component: ListadoLoteComponent;
  let fixture: ComponentFixture<ListadoLoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoLoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
