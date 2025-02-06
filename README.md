# Employee Cli
## Description
As a business owner, I want to be able to view and manage the departments, roles, and employees in my company so that I can organize and plan my business.

## Video Walkthrough

https://drive.google.com/file/d/17T0RPsN1uvlQw6HHpFhUg1Qm8Ffb9Mpy/view?usp=sharing



## Installation:
```
npm install
npm build
npm run start
```

## Usage:
GIVEN a command-line application that accepts user input...

WHEN I start the application, then I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role.

WHEN I choose to view all departments, then I am presented with a formatted table showing department names and department ids.

WHEN I choose to view all roles, then I am presented with the job title, role id, the department that role belongs to, and the salary for that role.

WHEN I choose to view all employees, then I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to.

WHEN I choose to add a department, then I am prompted to enter the name of the department and that department is added to the database.

WHEN I choose to add a role, then I am prompted to enter the name, salary, and department for the role and that role is added to the database.

WHEN I choose to add an employee, then I am prompted to enter the employee's first name, last name, role, and manager, and that employee is added to the database.

WHEN I choose to update an employee role, then I am prompted to select an employee to update and their new role and this information is updated in the database.


## Guidelines:
You'll need to use the pg.package to connect to your PostgreSQL database and perform queries, and the Inquirer.package to interact with the user via the command line.
  

## Contributing:
Send a Pull Request and add to the project any way you would like.

## Tests:
Run the project, and check for any errors upon "npm build."

## Questions:
Here is the developers details in case you have any questions.

Email: tyannejensen@gmail.com

Username: tyannejensen 
