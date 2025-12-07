import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdUnit } from './ad-unit';

describe('AdUnit', () => {
  let component: AdUnit;
  let fixture: ComponentFixture<AdUnit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdUnit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdUnit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
