import inquirer from "inquirer";
import { pool, connectToDb, disconnectToDb } from './connection.js';




class Cli {
    async init() {
        console.log('application running')
        await connectToDb();
        await this.performActions();
    }

    async viewAllEmployees() {
        const sql = `SELECT * FROM employee`;
        const res = await pool.query(sql);
        const employees = res.rows.map(result => result.first_name + ' ' + result.last_name);
        employees.forEach((employee: any) => {
            console.log(employee)
        });
    }

    async addEmployee(): Promise<void> {
        const roleSQL = `SELECT * FROM role ORDER BY id ASC `;
        const rolesResponse = await pool.query(roleSQL);
        const roles = rolesResponse.rows;

        const employeesSQL = `SELECT * FROM employee`;
        const employeesResponse = await pool.query(employeesSQL)
        const employees = employeesResponse.rows
        

        await inquirer
        .prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'What is the employee\'s first name?'
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'What is the employee\'s last name?'
            },
            {
                type: 'select',
                name: 'role',
                message: 'What is the employee\'s role?',
                choices: await roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            },
            {
                type: 'select',
                name: 'manager',
                message: 'Who is the employee\'s manager?',
                choices: await employees.map(employee => {
                    return { name: employee.first_name + ' ' + employee.last_name, value: employee.id }
                })
            },
        ]).then(async ({firstName, lastName, role, manager}) => {
            // make an insert for a new emplotee
            const insertNewEmployeeSQL = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES  ('${firstName}' , '${lastName}', ${role}, ${manager})`
            await pool.query(insertNewEmployeeSQL);
        })
    }
    async updateEmployeeRole() {
        // TODO: The choices here are going to be dynamic and a list of employees
        const roleSQL = `SELECT * FROM role ORDER BY id ASC `;
        const rolesResponse = await pool.query(roleSQL);
        const roles = rolesResponse.rows;

        const employeeSql = `SELECT * FROM employee`;
        const resEmployees = await pool.query(employeeSql);
        const employees = resEmployees.rows;
        
        await inquirer.prompt([
            {
                type: 'select',
                name: 'employee',
                message: 'Which employee would you like to update their Role?',
                choices: await employees.map(employee => {
                    return { name: employee.first_name + ' ' + employee.last_name, value: employee.id }
                })
            },
            {
                type: 'select',
                name: 'role',
                message: 'What is the new Role?',
                choices: await roles.map(role => {
                    return {
                        name: role.title,
                        value: role.id
                    }
                })
            }
        ]).then(async ({employee, role}) => {
            const updateEmployee = `UPDATE employee SET role_id = ${role} WHERE id = ${employee};`;
            await pool.query(updateEmployee)
            console.log('You have updated the Employee.')
        })

    } 

    async viewAllRoles(): Promise<void> {
        const roleSQL = `SELECT * FROM role ORDER BY id ASC `;
        const rolesResponse = await pool.query(roleSQL);
        const roles = rolesResponse.rows;
        roles.forEach((role) => {
            console.log(role.title)
        })
    }

    async addRole(): Promise<void> {
        // get data to insert into database
        const departmentSQL = `SELECT * FROM department ORDER BY id ASC `;
        const departmentResponse = await pool.query(departmentSQL);
        const departments = departmentResponse.rows
        await inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the title of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary?'
            },
            {
                type: 'select',
                name: 'department_id',
                message: 'What department is it under?',
                choices: await departments.map(department => {
                    return { name: department.name, value: department.id }
                })
            },
        ]).then(async ({title, salary, department_id}) => {
            // make an insert for a new emplotee
            const insertRoleSQL = `INSERT INTO role (title, salary, department_id) VALUES ('${title}', ${parseInt(salary)}, ${department_id})`;
            await pool.query(insertRoleSQL);
            console.log('Role Added Successfully')
        })

    }

    async viewAllDepartments(): Promise<void> {
        const departmentSQL = `SELECT * FROM department ORDER BY id ASC `;
        const departmentResponse = await pool.query(departmentSQL);
        const department = departmentResponse.rows;
        department.forEach((department) => {
            console.log(department.name)
        })
    }

    async addDepartments(): Promise<void> {

        await inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of this Department?'
            },
        ]).then(async ({name}) => {
            // make an insert for a new emplotee
            const insertDepartmentSQL = `INSERT INTO department (name) VALUES ('${name}')`;
            await pool.query(insertDepartmentSQL);
            console.log('Department Added Successfully')
        })
        console.log('Add Departments called')
    }





    async performActions(): Promise<void> {
        await inquirer
          .prompt([
            {
              type: 'list',
              name: 'action',
              message: 'What would you like to do?',
              choices: [
                'View All Employees',
                'Add Employee',
                'Update Employee Role',
                'View All Roles',
                'Add Role',
                'View All Departments',
                'Add Departments',
                'Exit',
              ],
            },
          ])
          .then(async (answers) => {
            let exit = false;
            if (answers.action === 'View All Employees') {
                // TODO: display a list of all employees
                await this.viewAllEmployees()
            } else if (answers.action === 'Add Employee') {
                await this.addEmployee()
                console.log('Add Employees was called')
            } else if (answers.action === 'Update Employee Role') {
                await this.updateEmployeeRole()
                console.log('Update Employee Role called')
            } else if (answers.action === 'View All Roles') {
                await this.viewAllRoles()
                console.log('View All Roles called')
            } else if (answers.action === 'Add Role') {
                await this.addRole()
                console.log('Add Role called')
            } else if (answers.action === 'View All Departments') {
                await this.viewAllDepartments()
                console.log('View All Departments called')
            } else if (answers.action === 'Add Departments') {
                await this.addDepartments()
                console.log('Add Departments called')
            } else if (answers.action === 'Exit') {
                exit = true;
                disconnectToDb();
                console.log('Exit called')
            }

            if (!exit) {
                await this.performActions();
            }
          })
        } 
    
}






















export default Cli;