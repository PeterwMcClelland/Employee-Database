USE employee_trackerDB;

INSERT INTO department (name)
VALUES 
("Sales"),
("H.R"),
("B.O.H"),
("Management");

INSERT INTO role (title, salary, department_id)
VALUES
("Chef", 550000, 1),
("Barista", 40000, 2),
("Host", 35000, 3),
("Cook", 42000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES
("Sam", "Smith", 1),
("Dave", "Jackson", 2),
("Isabel", "Rose", 3),
("Jake", "Hill", 4),
("Kate", "Moss", 5),
("Faith", "Peterson", 6);