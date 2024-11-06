INSERT INTO department (name)
VALUES ('Sales'),
       ('Engineering'),
       ('Legal'),
       ('Finance'),
       ('HR');

INSERT INTO role (title, salary, department_id)
VALUES  ('Sales Lead', 120000.00, 1),
        ('Salesman', 80000.00, 1),
        ('Lead Engineer', 250000.00, 2),
        ('Software Engineer', 180000.00, 2),
        ('Account Manager', 90000.00, 1),
        ('Accounts Receivable', 75000.00, 4),
        ('Accounts Payable', 75000.00, 4),
        ('Paralegal', 50000.00, 3),
        ('Payrol Specialist', 75000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('John', 'Doe', 1, 3),
        ('Mike', 'Waldo', 2, 3),
        ('Jane', 'Doe', 9, 3);
