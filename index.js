const inquirer = require('inquirer');
const fs = require('fs');
const util = require('util');

const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Employee = require('./lib/Employee');

const writeFileAsync = util.promisify(fs.writeFile);

//team Array
const teamArray = [];

//Questions for user to generate ReadMe files
const addManager = () => {
    console.log("Welcome to the team, please answer these questions to generate the team profile!")
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is team manager's name?",
            validate: data => {
                if (data) {
                    return true;
                } else {
                    console.log("Please enter manager's name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter Manager's employee ID: ",
            validate: data => {
                const pass = !isNaN(data)
                if (pass) {
                    return true
                } else {
                    return "Please enter a valid number Id";
                }
            }
        }, {
            type: "input",
            name: "email",
            message: "Enter Manager's email: ",
            validate: function(email) {

                emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)

                if (emailValid) {
                    return true;
                } else {
                    console.log("Please enter a valid email!")
                    return false;
                }
            }
        }, {
            type: "input",
            name: "officeNumber",
            message: "Enter Manager's office number: ",
            validate: data => {
                const pass = data.match(
                    /^[0-9]\d+$/
                );
                if (pass) {
                    console.log("Number has been created!")
                    return true;
                }
                return "Please enter a valid number!"
            }
        },
    ]).then(function(data) {
        console.log("Manager: ", data)
        const newManager = new Manager(
            data.name,
            data.id,
            data.email,
            data.officeNumber
        );
        teamArray.push(newManager);
        //addEmployee function
        addNewEmployee();
    })
};

//inquirer prompt to add a new team member
const addNewEmployee = () => {
    return inquirer.prompt([{
            type: "list",
            name: "role",
            message: "Would you like to add another team member?",
            choices: [
                "Add a new Engineer",
                "Add a new Intern",
                "No, my team is complete"
            ]
        }])
        .then(function(data) {
            if (data.role === "Add a new Engineer") {
                addEngineer();
            } else if (data.role === "Add a new Intern") {
                addIntern();
            } else {
                generateTeam();
            }
        })
};

//Engineer role
const addEngineer = () => {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the Engineer's name? ",
            validate: data => {
                if (data) {
                    return true;
                } else {
                    console.log("Please enter engineer's name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter Engineer's employee ID: ",
            validate: data => {
                const pass = !isNaN(data)
                if (pass) {
                    return true
                } else {
                    return "Please enter a valid Id";
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter Engineer's email address: ",
            validate: function(email) {
                emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (emailValid) {
                    console.log("Valid Email");
                    return true;
                } else {
                    console.log("Please enter a valid email!")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "Enter Engineer's github user name: ",
            validate: data => {
                if (data) {
                    return true;
                } else {
                    console.log("Please enter gitHub user name!");
                    return false;
                }
            }
        }
    ]).then(function(data) {
        console.log("Engineer: ", data)
        data.role = "Engineer";
        const newEngineer = new Engineer(
            data.name,
            data.id,
            data.email,
            data.github
        );
        teamArray.push(newEngineer);
        addNewEmployee();
    });
};

//Intern role
const addIntern = () => {
    return inquirer.prompt([{
            type: "input",
            name: "name",
            message: "What is the Intern's name? ",
            validate: data => {
                if (data) {
                    return true;
                } else {
                    console.log("Please enter Intern's name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "id",
            message: "Enter Intern's employee ID: ",
            validate: data => {
                const pass = !isNaN(data)
                if (pass) {
                    return true
                } else {
                    return "Please enter a valid number Id";
                }
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter Intern's email address: ",
            validate: function(email) {
                emailValid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
                if (emailValid) {
                    console.log("Valid Email");
                    return true;
                } else {
                    console.log("Please enter a valid email!")
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "school",
            message: "Enter Intern's School: ",
            validate: data => {
                if (data) {
                    return true;
                } else {
                    console.log("Please enter intern's School!");
                    return false;
                }
            }
        }
    ]).then(function(data) {
        data.role = "Intern";
        const newIntern = new Intern(
            data.name,
            data.id,
            data.email,
            data.school
        );
        teamArray.push(newIntern);
        addNewEmployee();
    });
};

function generateMemberCard(teamArray) {
    let employeeCard = ``;
    teamArray.forEach(data => {
        let employeeField = "";
        let employeeIcon = "";
        switch (data.getRole()) {
            case "Manager":
                employeeField = `Office number: ${data.getOfficeNumber()}`;
                employeeIcon = `<i class="fa fa-users"></i>`
                break;
            case "Engineer":
                employeeField = `GitHub: <a href="https://github.com/${data.getGitHub()}" target="_blank">${data.getGitHub()}</a>`;
                employeeIcon = `<i class="fa fa-book"></i>`;
                break;
            case "Intern":
                employeeField = `School: ${data.getSchool()}`;
                employeeIcon = `<i class="fa fa-graduation-cap"></i>`;
                break;
        }
        let cardHTML = `
        <div class="card text-white bg-info">
                <div class="card-body">
                    <h3 class="card-title">${data.getName()}</h3>
                    <h5 class="card-title">${employeeIcon} ${data.getRole()}</h5>
                </div>
                <ul class="list-group list-group-flush text-dark">
                    <li class="list-group-item">ID: ${data.getId()}</li>
                    <li class="list-group-item">Email: <a href="mailto:${data.getEmail()}" target="_blank">${data.getEmail()}</a></li>
                    <li class="list-group-item">${employeeField}</li>
                </ul>
            </div>
        `;
        employeeCard += cardHTML;
    });
    return employeeCard;
}

//rendering HTML
function generateTemplate(teamArray) {
    return `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My team Generator</title>

    <!-- Bootstrap CDN -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">

    <!-- Add icon library -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="style.css">
</head>

<body class="bg-secondary">
    <section class="pt-5 pb-5 bg-dark inner-header">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h1 class="mt-0 mb-3 text-white">My Team</h1>
                </div>
            </div>
        </div>
    </section>
    <div class="container mt-5">
        <div class="card-deck">
           ${generateMemberCard(teamArray)}
        </div>
    </div>
</body>

</html>
    `;
}
//function to generate team HTML
const generateTeam = () => {
    generateTemplate(teamArray);

    writeFileAsync("./dist/team.html", generateTemplate(teamArray), function(err) {
        if (err) throw err;
        // success case, the file was saved
        console.log('Successfully new team profile created ✅');
    })
}

// Function call to initialize app
addManager();