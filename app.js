const Manager = require("./Manager.js");
const Engineer = require("./Engineer.js");
const Intern = require("./Intern.js");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// const {render, renderManager} = require("./htmlRenderer");
const render = require("./htmlRenderer.js");
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
                const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
                teamMembers.push(manager)
                createTeam();
                // console.log(managerName);
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
                    addIntern();
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
            const engineer = new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.githubId)
            teamMembers.push(engineer)
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
            const intern = new Intern(answers.internName, answers.internId, answers.internEmail, answers.internSchool)
            teamMembers.push(intern)
            createTeam();

        });
    }

     function buildTeam() {
        //  console.log(teamMembers);
        if(!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR);
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
        
    }

    createManager();

}

appMenu();