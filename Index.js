const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Intern = require('./lib/Intern');
const Engineer = require('./lib/Engineer');
const template = require('./src/template');
const fs = require('fs');
const path = require('path');
const OUTPUT_DIR = path.resolve(__dirname, "dist")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const teamMembers = [];

getManager = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the managers name?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a name.');
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the managers ID?',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('Please enter an ID.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the managers email?',
        },
        {
            type: 'input',
            name: 'officenumber',
            message: 'What is the managers office number?',
        }
    ])
        .then((answers) => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
            teamMembers.push(manager)
            pickTeam();
        })
}
getEngineer = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the engineers name?',
            validate: engineerName => {
                if (engineerName) {
                    return true;
                } else {
                    console.log('Please enter a name.')
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the engineers ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the engineers email?',
        },
        {
            type: 'input',
            name: 'github',
            message: 'What is engineers GitHub username?',
        }
    ])
        .then((answers) => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
            teamMembers.push(engineer)
            pickTeam();
        })
}
getIntern = function () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message: 'What is the interns name?',
            validate: internName => {
                if (internName) {
                    return true;
                } else {
                    console.log('Please enter a name')
                    return false;
                }
            }

        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the interns ID?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the interns email?',
        },
        {
            type: 'input',
            name: 'school',
            message: 'What is the interns school?',
        }
    ])
        .then((answers) => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school)
            teamMembers.push(intern)
            pickTeam();
        })
}

pickTeam = function () {
    inquirer.prompt([
        {
            type: 'list',
            name: 'team',
            message: 'Would you like to add another team member?',
            choices: ['Engineer', 'Intern', 'I dont want to add any team members']
        }
        // if(choice.team === Engineer){
        //     getEngineer();
        // }

    ])
        .then((choice) => {
            switch (choice.team) {
                case "Engineer":
                    getEngineer();
                    break;
                case "Intern":
                    getIntern();
                    break;
                default:
                    buildHtml();
            }
        })
}

buildHtml = function () {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, template(teamMembers), 'utf-8')
}
getManager();