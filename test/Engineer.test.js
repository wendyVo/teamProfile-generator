const Engineer = require("../lib/Engineer");

describe("Engineer", () => {
    describe("Initialization", () => {
        it("Should be able to set gitHub account from constructor", () => {
            const testGitHub = "testUser";
            const emp = new Engineer("Justin", 1, "justin@testemail.com", testGitHub);
            expect(emp.gitHub).toBe(testGitHub);
        });

        it("Should be able to get GitHub via getGitHub()", () => {
            const testGitHub = "testUser";
            const emp = new Engineer("Justin", 1, "justin@testemail.com", testGitHub);
            expect(emp.getGitHub()).toBe(testGitHub);
        });

        it("Should be able to return Engineer role via getRole()", () => {
            const testRole = "Engineer";
            const emp = new Engineer("Justin", 1, "justin@testemail.com", "testGitHub");
            expect(emp.getRole()).toBe(testRole);
        });
    });
});