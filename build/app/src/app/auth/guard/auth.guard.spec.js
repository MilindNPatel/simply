"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const testing_2 = require("@angular/router/testing");
const auth_guard_1 = require("./auth.guard");
describe("AuthGuard", () => {
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({
            imports: [testing_2.RouterTestingModule],
            providers: [auth_guard_1.AuthGuard],
        });
    });
    it("should ...", testing_1.inject([auth_guard_1.AuthGuard], (guard) => {
        expect(guard).toBeTruthy();
    }));
});
//# sourceMappingURL=auth.guard.spec.js.map