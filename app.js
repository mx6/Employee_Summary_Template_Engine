const Manager = require("./Manager.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const {render, renderManager} = require("./htmlRenderer");
const Employee = require("./htmlRenderer.js");
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const teamMembers = [];
const idArray = [];

function appMenu() {

    function createManager() {
        inquirer.prompt(
            [
                // MANAGER
                {
                    type: "input",
                    message: "please give manager name:",
                    name: "managerName",
                    validate: function(answer) {
                        if (answer !== "") { //managerName
                            return true;
                        }
                        return "Please enter at least character"
                    }
                },
                {
                    type: "input",
                    message: "please give manager id:",
                    name: "managerId"
                },
                {
                    type: "input",
                    message: "please give manager email:",
                    name: "managerEmail"
                },
                {
                    type: "input",
                    message: "please give manager office number:",
                    name: "managerOfficeNumber"
                },
            ]).then(answers => {

                createTeam();
            });
    }

    function createTeam() {

        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice", 
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members."
                ]
            }
        ]).then(userChoice => {
            switch(userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                    case "Intern":
                    break;
                    default:
                    buildTeam();
            }
        });
    }
    
    function addEngineer() {
        inquirer.prompt([
            // ENGINEER
        {
            type: "input",
            message: "please give engineer name:",
            name: "engineerName",
            validate: function(answer) {
                if (answer !== "") { //engineerName
                    return true;
                }
                return "Please enter at least character"
            }
        },
        {
            type: "input",
            message: "please give engineer id:",
            name: "engineerId"
        },
        {
            type: "input",
            message: "please give engineer email:",
            name: "engineerEmail"
        },
        {
            type: "input",
            message: "please give engineer's GitHub ID:",
            name: "githubId"
        },
        ]).then(answers => {

            createTeam();

        });
    }

    function addIntern() {
        inquirer.prompt([
            {
                type: "input",
                message: "please give intern name:",
                name: "internName",
                validate: function(answer) {
                    if (answer !== "") { //internName
                        return true;
                    }
                    return "Please enter at least character"
                }
            },
            {
                type: "input",
                message: "please give intern id:",
                name: "internId"
            },
            {
                type: "input",
                message: "please give intern email:",
                name: "internEmail"
            },
            {
                type: "input",
                message: "please give intern's school name:",
                name: "internSchool"
            },
        ]).then(answers => {

            createTeam();

        });
    }

    function buildTeam() {
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
    }

    createManager();

}

appMenu();

        
        
    // then(function(answers) {
    // const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
    // const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.githubId)
    // const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
    
    
    console.log(manager);
    console.log(engineer);
    console.log(intern);


    // const managerHtml = renderManager(manager);
    // console.log(managerHtml);

    // const employeeHtml = renderEmployee(employee);
    // console.log(employeeHtml);
    
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```