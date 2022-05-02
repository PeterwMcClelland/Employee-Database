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
            'EXIT'
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case 'View all employees':
                viewEmployees();
                break;
            case 'View all departments':
                viewDepartments();
                break;
            case 'View all roles':
                viewRoles();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Update employee role':
                updateRole();
                break;
            case 'Exit':
                exitApp();
                break;
            default:
                break;
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
function addRole() {
    connection.query('SELECT * FROM department', function(err, res) {
        if (err) throw err;
        inquirer
        .prompt([
            {
                name: 'new_role',
                type: 'input',
                message: 'What would you like to call the new role?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Salary of this role? (Enter Salary)'
            },
            {
                name: 'Department',
                type: 'list',
                choices: function() {
                    var deptArry = [];
                    for (let i = 0; i < res.length; i++) {
                        deptArry.push(res[i].name);
                    }
                    return deptArry;
                },
            }
        ])
        .then(function (answer) {
            let department_id;
            for (let a = 0; a < res.length; a++) {
                if (res[a].name == answer.Department) {
                    department_id = res[a].id;
                }
            }
            connection.query(
                'INSERT INTO role SET ?',
                {
                    title: answer.new_role,
                    salary: answer.salary,
                    department_id: department_id
                },
                function (err, res) {
                    if(err)throw err;
                    console.log('New role is added!');
                    console.table('All Roles:', res);
                    options();
                }
            )
        })
    })
};
function updateRole() {};

function exitApp() {
    connection.end();
};
