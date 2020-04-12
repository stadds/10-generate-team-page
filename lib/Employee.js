// TODO: Write code to define and export the Employee class

const regex = /[A-z A-z]/;
const emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;

class Employee {

    constructor(name, id, email) {
        this.role = "Employee";
        this.name = name;
        this.id = id;
        this.email = email;

        // if (name.match(regex)) { this.name = name.trim() }
        // else { throw new Error("name cannot contain numbers") };

        // if (typeof id === "number") { this.id = id }
        // else { throw new Error("id must be a number") };

        // if (email.match(emailReg)) { this.email = email }
        // else { throw new Error("Email must be a vaild email address") };

    }

    getName() {
        return this.name;
    }

    getId() {
        return this.id;
    }

    getEmail() {
        return this.email;
    }

    getRole() {
        return this.role;
    }
}

module.exports = Employee;