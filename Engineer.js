// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");
class Engineer extends Employee { // engineer has employee properties & methods
    constructor(name, id , email, gitHub) {       
        super(name, id, email, gitHub); // this creates new Employee(name, id, eamil)
        this.gitHub = gitHub;
    }
    getRole() {
        return "Engineer";
    }
    getGithub() {
        return this.gitHub;
    }
}
module.exports = Engineer;



/* In addition to `Employee`'s properties and methods, `Engineer` will also have:

* github  // GitHub username

* getGithub()

* getRole() // Overridden to return 'Engineer' */