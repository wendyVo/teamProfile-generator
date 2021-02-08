const Employee = require("../lib/Employee");

describe("Employee class", () => {
    describe("Initialization", () => {
        it("Should create an object of the employee", () => {
            const emp = new Employee();
            expect(typeof(emp)).toEqual("object");
        });

        it("Should set name via costructor", () => {
            const name = "Jenny";
            const emp = new Employee(name);
            expect(emp.name).toBe(name);
        });

        it("Should set id via costructor", () => {
            const testId = "10";
            const emp = new Employee("Test", testId);
            expect(emp.id).toBe(testId);
        });

        it("Should set email via costructor", () => {
            const testEmail = "test@test.com";
            const emp = new Employee("Test", 1, testEmail);
            expect(emp.email).toBe(testEmail);
        });

        it("Should return name via getName()", () => {
            const name = "John";
            const emp = new Employee(name);
            expect(emp.getName()).toBe(name);
        });

        it("Should return id via getId()", () => {
            const testId = "200";
            const emp = new Employee("Test", testId);
            expect(emp.getId()).toBe(testId);
        });

        it("Should return email via getEmail", () => {
            const testEmail = "test@test.com";
            const emp = new Employee("Test", 1, testEmail);
            expect(emp.getEmail()).toBe(testEmail);
        });

        it("Should return Employee via getRole", () => {
            const testRole = "Employee";
            const emp = new Employee("Test", 1, "test@test.com");
            expect(emp.getRole()).toBe(testRole);
        });

    });

});