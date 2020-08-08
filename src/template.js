// const Employee = require('./Employee')

generate = function (teamMembers) {
    generateManager = function (manager) {
        return `
        <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
        <div class="card-header">${manager.getRole()}</div>
        <div class="card-body">
            <h5 class="card-title">${manager.getName()}</h5>
            <ul class="card-text">
                <li>
                    ${manager.getId()}
                </li>
                <li>
                    ${manager.getEmail()}
                </li>
                <li>
                    ${manager.getOfficeNumber()}
                </li>
            </ul>
        </div>
    </div> 
    `
    }


    //     generateEngineer = function()
    //     <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
    //     <div class="card-header">${manager.getRole()}</div>
    //     <div class="card-body">
    //         <h5 class="card-title">${manager.getName()}</h5>
    //         <ul class="card-text">
    //             <li>
    //                 ${manager.getId()}
    //             </li>
    //             <li>
    //                 ${manager.getEmail()}
    //             </li>
    //             <li>
    //                 ${manager.getOfficeNumber()}
    //             </li>
    //         </ul>
    //     </div>
    // </div>
    // <div class="card text-white bg-danger mb-3" style="max-width: 18rem;">
    // <div class="card-header">${manager.getRole()}</div>
    // <div class="card-body">
    //     <h5 class="card-title">${manager.getName()}</h5>
    //     <ul class="card-text">
    //         <li>
    //             ${manager.getId()}
    //         </li>
    //         <li>
    //             ${manager.getEmail()}
    //         </li>
    //         <li>
    //             ${manager.getOfficeNumber()}
    //         </li>
    //     </ul>
    // </div>
    // </div>
    const newHtmlArray = [];
    newHtmlArray.push(teamMembers
        .filter(employee => employee.getRole() === "Manager")
        .map(manager => generateManager(manager))
    );
    newHtmlArray.push(teamMembers
        .filter(employee => employee.getRole() === "Engineer")
        .map(engineer => generateEngineer(engineer))
        .join('')
    );
    newHtmlArray.push(teamMembers
        .filter(employee => employee.getRole() === "Intern")
        .map(intern => generateIntern(intern))
        .join('')
    );
    return newHtmlArray.join('');
}


module.exports = teamMembers => {
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" 
        integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="./style.css">
        <title>Team Profile Generator</title>
    </head>
    <body>
    <header>Team Profile Generator</header>
    <div>${generate(teamMembers)}</div>
    </body>
    </html>`
}