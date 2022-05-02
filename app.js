const mysql = require('mysql2');
const inquirer = require('inquirer');

const consoleTable = require('console.table')

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Peter741!',
    database: 'employee_trackerDB'
});

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
function viewEmployees() {
    var query = 'SELECT * FROM employee';
    connection.query(query, function(err, res) {
        console.log(res.length + 'employees found');
        console.table('All Employees:', res);
        options();
    })
};
function viewRoles() {
    var query = 'SELECT * FROM role';
    connection.query(query, function(err, res){
        if (err) throw err;
        console.table('All Roles:', res);
        options();
    })
};
function viewDepartments() {
    var query = 'SELECT * FROM department';
    connection.query(query, function(err, res) {
        if(err)throw err;
        console.table('All Departments:', res);
        options();
    })
};

function addEmployee() {
    connection.query('SELECT * FROM role', function (err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            { 
                name: 'first_name',
                type: 'input',
                message: "Employee's first name?",
        },
        {
                name: 'last_name',
                type: 'input',
                message: "Employee's last name?",
        },
        {
                name: 'manager_id',
                type: 'input',
                message: "Employee's manager's ID?",
        },
        {
                name: 'role',
                type: 'list',
                choices: function() {
                    var roleArray = [];
                    for (let i = 0; i < res.length; i++) {                      const element = array[i];
                   roleArray.push(res[i].title);
                    }
                    return roleArray;
                },
            message: "Employee's role?"
        }
        ])
        .then(function (answer) {
            let role_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].title == answer.role) {
                    role_id = res[a].id;
                    console.log(role_id)
                }
            }
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    manager_id: answer.manager_id,
                    role_id: role_id,
                },
                function (err) {
                    if (err) throw err;
                    console.log('Employee added!');
                    options();
                }
            )
        })
    })
};

function addDepartment() {
    inquirer
    .prompt([
        {
            name: 'newDepartment',
            type: 'input',
            message: 'Add a department name.'
        }
    ])
    .then(function (answer) {
        connection.query(
            'INSERT INTO department SET ?',
            {
                name: answer.newDepartment
            });
            var query = 'SELECT * FROM department';
            connection.query(query, function(err, res) {
                if(err)throw err;
                console.log('Department has been added!');
                console.table('All Departments:', res);
                options();
            })
    })
};