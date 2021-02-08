const Manager = require("../lib/Manager");

describe("Manager", () => {
    describe("Initialization", () => {
        it("Should be able to set officeNumber from constructor", () => {
            const officeNum = "8358291";
            const emp = new Manager("Brian", 1, "brian@testemail.com", officeNum);
            expect(emp.officeNumber).toBe(officeNum);
        });

        it("Should be able to get officeNumber from getOfficeNumber()", () => {
            const officeNum = "8358291";
            const emp = new Manager("Brian", 1, "brian@testemail.com", officeNum);
            expect(emp.getOfficeNumber()).toBe(officeNum);
        });

        it("Should be able to return Manager via getRole()", () => {
            const testRole = "Manager";
            const emp = new Manager("Brian", 1, "brian@testemail.com", "8358291");
            expect(emp.getRole()).toBe(testRole);
        });
    });
});