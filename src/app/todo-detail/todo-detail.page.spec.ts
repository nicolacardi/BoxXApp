import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TodoDetailPage } from './todo-detail.page';

describe('TodoDetailPage', () => {
  let component: TodoDetailPage;
  let fixture: ComponentFixture<TodoDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
