import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EfetuarVendaComponent } from './efetuar-venda.component';

describe('EfetuarVendaComponent', () => {
  let component: EfetuarVendaComponent;
  let fixture: ComponentFixture<EfetuarVendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EfetuarVendaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EfetuarVendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
