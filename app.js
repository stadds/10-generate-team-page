const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeesArr = [];

function validateNum(id) {
    let reg = /^\d+$/;
    return reg.test(id) || "id MUST be a number";
}

function validateEmail(email) {
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
    return emailReg.test(email) || "Be enter a valid email";
}


const startPrompt = {
    type: "list",
    name: "nextStep",
    message: "What would you like to do?\n\nAdd an Employee:",
    choices: [
        {
            name: "Add a Manager",
            value: "Manager"
        },
        {
            name: "Add an Engineer",
            value: "Engineer"
        },
        {
            name: "Add an Intern",
            value: "Intern"
        },
        new inquirer.Separator(),
        {
            name: "Done - Make Team Page",
            value: "Render"
        }
    ]
}


const employeePrompt = [

    {
        type: "input",
        name: "name",
        message: "What is your employee's name?"
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee's id?",
        validate: validateNum
    },
    {
        type: "input",
        name: "email",
        message: "What is your employee's email?",
        validate: validateEmail
    }
]

const engineerPrompt = [
    {
        type: "input",
        name: "github",
        message: "Enter Engineer's github username: "
    }
]

const managerPrompt = [
    {
        type: "input",
        name: "officeNumber",
        message: "Enter Manager's office number: ",
        validate: validateNum
    }
]

const internPrompt = [
    {
        type: "input",
        name: "school",
        message: "Enter your intern's school: "
    }
]



async function getPrompts() {
    try {

        let keepGoing = true;

        while (keepGoing === true) {

            const answer = await inquirer.prompt(startPrompt);
            console.log(answer);
            // console.log(answer.nextStep);

           // const employee = await inquirer.prompt(employeePrompt);
            //console.log(answer)

            //console.log(employee);

            switch (answer.nextStep) {
                case "Engineer":
                    console.log("ENGINEER QS");
                    await inquirer.prompt([...employeePrompt,...engineerPrompt]).then(answers => {
                        console.log(answers);
                        let newEngineer = new Engineer(answers.name,answers.id,answers.email,answers.github);
                        employeesArr.push(newEngineer);
                    })
                    break;
                case "Manager":
                    console.log("MANAGER Qs");
                    await inquirer.prompt([...employeePrompt,...managerPrompt]).then(answers => {
                        console.log(answers);
                    })
                    break;

                case "Intern":
                    console.log("INTERN Qs");
                    await inquirer.prompt([...employeePrompt,...internPrompt]).then(answers => {
                        console.log(answers);
                    })
                    break;

                case "Render":
                    keepGoing = false;
                    break;
            }
        }

        console.log("CREATE THE THING");
        console.log(employeesArr);




    } catch (err) {
        console.log(err);
    }

}

function init() {
    console.log("TESTING");
    getPrompts();

}

init();


/*
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

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
// for the provided `render` function to work!```
*/