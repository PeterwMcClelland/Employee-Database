const mysql = require('mysql');
const inquirer = require('inquirer');

const cTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3001,
    user: 'root',
    password: 'Peter741!',
    database: 'employee_trackerDB'
})

connection.connect(function(err){
    if (err) throw err;
    options();
});

function options() {
    inquirer.prompt({
        name: 'action',
        type: 'list',
        message: 'Hello! What would you like to do today?',
        choices: [
            'View all employees',
            'View all roles',
            'View all departments',
            'Add an employee',
            'Add a role',
            'Add a department',
            'Delete an employee'
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case 'View all employees':
                viewEmployees();
            case 'View all departments':
                viewDepartments();
            case 'View all roles':
                viewRoles();
            case 'Add an employee':
                addEmployee();
            case 'Add a department':
                addDepartment();
            case 'Add a role':
                addRole();
            case 'Update employee role':
                updateRole();
            case 'Delete an employee':
                deleteEmployee();
            case 'Exit':
                exitApp();
            default:
        }
    })
    
};