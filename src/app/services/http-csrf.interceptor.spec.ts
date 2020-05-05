import { TestBed } from '@angular/core/testing';

import { HttpCsrfService } from './http-csrf.interceptor';

describe('HttpCsrfService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpCsrfService = TestBed.get(HttpCsrfService);
    expect(service).toBeTruthy();
  });
});
