"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const stat_module_1 = require("./stat.module");
describe("StatModule", () => {
    let statModule;
    beforeEach(() => {
        statModule = new stat_module_1.StatModule();
    });
    it("should create an instance", () => {
        expect(statModule).toBeTruthy();
    });
});
//# sourceMappingURL=stat.module.spec.js.map