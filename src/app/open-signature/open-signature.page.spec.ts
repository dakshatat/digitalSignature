import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OpenSignaturePage } from './open-signature.page';

describe('OpenSignaturePage', () => {
  let component: OpenSignaturePage;
  let fixture: ComponentFixture<OpenSignaturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OpenSignaturePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OpenSignaturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
