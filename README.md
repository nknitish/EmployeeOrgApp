This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to use this application

All Files are located in Employee Folder ../src/app/Employee
See all functions / class in ./utilities.ts.
Use Script.tsx to use class / functions.
See Output in console of browser

## Features of Application !

## Create Employee

```
<!-- let name = new Employee(name :String, uniqueId :number); -->

let ceo = new Employee("John Smith", 1);
let margot = new Employee("Margot", 2);
```

## Add Employee

add accept [] Emp and and unique id of their supervisor to add employee at one level below of supervisor
Ex : adding 4 employee under as subordinate of CEO that have id of 1.

```
<!-- add([Employee[]], supervisor'sId : number) -->

app.add([margot, tyler, ben, georgina], 1);

```

## Move Employee

```
Move Employee to new supervisor
<!-- app.move(EmployeeId :number, SupervisorId : number); -->
app.move(5, 12);

```

## Search Employee

```

let root = this.ceo;
let result = this.search(root, EmployeeId);

return Object of Employee | false

```

## Get Supervisor of Employee

```

let root = this.ceo;
let result = this.getSupervisor(root, EmployeeId);

return Object of Supervisor of employee | false

```

## Remove / Delete Employee

You can use this remove any employee from Organization

```
<!-- this.remove(Supervisor :Employee, employeeID : number); -->
let result =  this.remove(currentSupervisor, employeeID);

return Object of Supervisor of employee | false

```

## Undo

```
You can use this to Undo move changes and reset state to previous state
 <!-- undo() -->
```

## Redo

```
You can use this to Undo move changes and reset state to previous state
 <!-- redo() -->
```
