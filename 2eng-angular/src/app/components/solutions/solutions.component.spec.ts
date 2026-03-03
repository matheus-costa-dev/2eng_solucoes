import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolutionsComponent } from './solutions.component';
import { ModalService } from '../../services/modal.service';

describe('SolutionsComponent', () => {
  let component: SolutionsComponent;
  let fixture: ComponentFixture<SolutionsComponent>;
  let modalServiceSpy: jasmine.SpyObj<ModalService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('ModalService', ['openModal']);

    await TestBed.configureTestingModule({
      imports: [SolutionsComponent],
      providers: [
        { provide: ModalService, useValue: spy }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(SolutionsComponent);
    component = fixture.componentInstance;
    modalServiceSpy = TestBed.inject(ModalService) as jasmine.SpyObj<ModalService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should pass injected images from serviceHomes to the modal when available', () => {
    const testImage = { url: 'https://media.hygraph.com/test-img.jpg' };

    component.serviceHomes = [
      {
        serviceId: 'obras',
        images: [testImage]
      }
    ];

    component.openServiceModal('obras');

    expect(modalServiceSpy.openModal).toHaveBeenCalledTimes(1);

    // Check if the payload passed to the modal uses our mocked hygraph image
    const payloadPassed = modalServiceSpy.openModal.calls.mostRecent().args[0];
    expect(payloadPassed.title).toBe('Obras e Reformas');
    expect(payloadPassed.images).toBeDefined();
    expect(payloadPassed.images!.length).toBe(1);
    expect(payloadPassed.images![0].url).toEqual(testImage.url);
  });
});

