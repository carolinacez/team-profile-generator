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

getManager = function(){
inquirer.prompt ([
{
    type: 'input',
    name: 'name',
    message: 'What is your name?',  

},
{
    type: 'input',
    name: 'id',
    message: 'What is your id?',
},
{
    type: 'input',
    name: 'email',
    message: 'What is your email?', 
}, 
{
    type: 'input',
    name: 'officenumber',
    message: 'What is your office number?',
}   
])
    .then((answers) =>{
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officenumber)
        teamMembers.push(manager)
        pickTeam();
    })
}

pickTeam = function() {
    inquirer.prompt ([
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
    .then((choice) =>{
        switch(choice.team){
            case "Engineer": 
            getEngineer();
            case "Intern":
            getIntern();
            default:
            buildHtml();
        }
    })
}

buildHtml = function(){
if(!fs.existsSync(OUTPUT_DIR)){
    fs.mkdirSync(OUTPUT_DIR)
}
fs.writeFileSync(outputPath, template(teamMembers), 'utf-8')
}
getManager();