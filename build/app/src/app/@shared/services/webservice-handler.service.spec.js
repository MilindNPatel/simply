"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const webservice_handler_service_1 = require("./webservice-handler.service");
describe("WebserviceHandlerService", () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({}));
    it("should be created", () => {
        const service = testing_1.TestBed.get(webservice_handler_service_1.WebserviceHandlerService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=webservice-handler.service.spec.js.map