const Intern = require("../lib/Intern");

describe("Intern", () => {
    describe("Initialization", () => {
        it("Should be able to set school from constructor", () => {
            const testSchool = "Monash";
            const emp = new Intern("Jay", 1, "jay@testemail.com", testSchool);
            expect(emp.school).toBe(testSchool);
        });

        it("Should be able to get School from getSchool()", () => {
            const testSchool = "Monash";
            const emp = new Intern("Jay", 1, "jay@testemail.com", testSchool);
            expect(emp.getSchool()).toBe(testSchool);
        });

        it("Should be able to return Intern via getRole()", () => {
            const testRole = "Intern";
            const emp = new Intern("Jay", 1, "jay@testemail.com", "Monash");
            expect(emp.getRole()).toBe(testRole);
        });
    });
});