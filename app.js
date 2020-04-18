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

function validateName(name){
    let regex = /^[A-Za-z\s]+$/;
    return regex.test(name) || "Enter a valid name.";
}

const startPrompt = {
    type: "list",
    name: "nextStep",
    message: "Add an Employee:",
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
        message: "What is your employee's name?",
        validate: validateName
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

            //console.log(employee);

            switch (answer.nextStep) {
                case "Engineer":
                    // console.log("ENGINEER QS");
                    await inquirer.prompt([...employeePrompt, ...engineerPrompt]).then(answers => {
                        //console.log(answers);
                        let newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
                        employeesArr.push(newEngineer);
                    })
                    break;
                case "Manager":
                    // console.log("MANAGER Qs");
                    await inquirer.prompt([...employeePrompt, ...managerPrompt]).then(answers => {
                        // console.log(answers);
                        let newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
                        employeesArr.push(newManager);
                    })
                    break;

                case "Intern":
                    // console.log("INTERN Qs");
                    await inquirer.prompt([...employeePrompt, ...internPrompt]).then(answers => {
                        // console.log(answers);
                        let newIntern = new Intern(answers.name, answers.id, answers.email, answers.school);
                        employeesArr.push(newIntern);

                    })
                    break;

                case "Render":
                    keepGoing = false;
                    break;
            }
        }

        console.log("CREATE THE THING");
        console.log(employeesArr);

        const data = render(employeesArr);
        console.log(data);

        fs.writeFileSync(outputPath,data);

    } catch (err) {
        console.log(err);
    }

}

function init() {
    console.log("TESTING");
    getPrompts();
}

init();
