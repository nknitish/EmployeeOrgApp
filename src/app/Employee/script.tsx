"use client";
import { Employee, EmployeeOrgApp } from "./utilities";

//Creating Multiple Employee with uniqueId
let ceo = new Employee("John Smith", 1);
let margot = new Employee("Margot", 2);
let cassandra = new Employee("Cassandra", 3);
let marry = new Employee("Marry", 4);
let bob = new Employee("Bob", 5);
let tina = new Employee("Tina", 6);
let will = new Employee("Will", 7);
let tyler = new Employee("Tyler", 8);
let harry = new Employee("Harry", 9);
let george = new Employee("George", 10);
let ben = new Employee("Ben", 11);
let georgina = new Employee("Georgina", 12);
let sophie = new Employee("Sophie", 13);

//App
const app = new EmployeeOrgApp(ceo);

//===========Use this place to use all features of app ==============//

//add function accept [] Emp and and unique id of their supervisor to add employee at one level below of supervisor
//adding 4 employee under as subordinate of CEO that have id of 1
app.add([margot, tyler, ben, georgina], 1);

//adding all subordinates of margot
app.add([cassandra], 2);
app.add([bob, marry], 3);
app.add([tina], 5);
app.add([will], 6);

//adding all subordinates of Tyler
app.add([harry, george], 8);

//adding all subordinates of Georgina
app.add([sophie], 12);

//Search
//console.log(app.search(app.ceo, 8));

//Get Supervisor of Employee
// console.log(app.getSupervisor(app.ceo, 6));

//Moving Employee
//Moving Bob to be subordinate Georgina
app.move(5, 12);

//Undo /Redo
// app.undo();
// app.undo();

export default function EmployeePage() {
  console.log(app?.ceo);
  return (
    <div>
      <p className="text-2xl font-extrabold">Employee Management</p>
      <p>See /utilities.ts for all functions and classes</p>
      <p>See output in Console of browser</p>

      <a
        className="mt-10 text-blue-500 text-lg"
        href="https://github.com/nknitish/EmployeeOrgApp/blob/main/README.md#features-of-application-"
        target="_blank"
      >
        Click to see all features of App
      </a>
    </div>
  );
}
