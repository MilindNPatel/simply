import { TestBed } from "@angular/core/testing";

import { WebserviceHandlerService } from "./webservice-handler.service";

describe("WebserviceHandlerService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: WebserviceHandlerService = TestBed.get(
      WebserviceHandlerService
    );
    expect(service).toBeTruthy();
  });
});
