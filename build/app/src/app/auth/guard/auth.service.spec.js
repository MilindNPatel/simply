"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const auth_service_1 = require("./auth.service");
describe("AuthService", () => {
    beforeEach(() => testing_1.TestBed.configureTestingModule({}));
    it("should be created", () => {
        const service = testing_1.TestBed.get(auth_service_1.AuthService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=auth.service.spec.js.map