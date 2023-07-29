//InterFaces
interface IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
}

interface IEmployeeOrgApp {
  ceo: Employee;
  move(employeeID: number, supervisorID: number): void;
  undo(): void;
  redo(): void;
}

//Class Create Employee
export class Employee implements IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];

  constructor(name: string, uniqueId: number) {
    this.name = name;
    this.uniqueId = uniqueId;
    this.subordinates = [];
  }
}

//Class EmployeeOrgApp
export class EmployeeOrgApp implements IEmployeeOrgApp {
  ceo: Employee;
  oldState: Employee;

  constructor(employee: Employee) {
    this.ceo = employee;
    this.oldState = employee;
  }

  //Search Employee with their unique id
  search(obj: Employee, id: number): any {
    if (obj.uniqueId === id) {
      return obj;
    }

    for (const employee of obj.subordinates) {
      let searchData = this.search(employee, id);

      if (searchData) {
        return searchData;
      }
    }

    return false;
  }

  // Add new Employee under supervisor
  add(arr: Employee[], id: number) {
    let root = this.ceo;
    let supervisor = this.search(root, id);
    if (supervisor) {
      supervisor.subordinates = [...supervisor.subordinates, ...arr];
    }
    return false;
  }

  //get Current Supervisor
  getSupervisor(obj: Employee, id: number): any {
    let result = obj.subordinates.find((e) => e.uniqueId === id);

    if (result) {
      return obj;
    }

    for (const employee of obj.subordinates) {
      //Check if their is any subordinates
      if (employee.subordinates.length) {
        let result = this.getSupervisor(employee, id);
        if (result) {
          return result;
        }
      }
    }

    //In Case result not found or you are trying to get supervisor of CEO
    return false;
  }

  //Remove Employee
  remove(currentSupervisor: Employee, employeeID: number): boolean {
    if (currentSupervisor) {
      currentSupervisor.subordinates = currentSupervisor.subordinates.filter(
        (e: Employee) => e.uniqueId !== employeeID
      );

      return true;
    }

    return false;
  }

  //Move
  move(employeeID: number, supervisorID: number): boolean {
    let root = this.ceo;
    this.oldState = JSON.parse(JSON.stringify(root));

    let supervisor = this.search(root, supervisorID);
    let employee = this.search(root, employeeID);
    let currentSupervisor = this.getSupervisor(root, employeeID);

    if (supervisor && employee && currentSupervisor) {
      //Assigning current subordinates of employee to current supervisor

      currentSupervisor.subordinates = [
        ...currentSupervisor.subordinates,
        ...employee.subordinates,
      ];

      //Removing all subordinates of employee as we have moved then to current supervisor
      employee.subordinates = [];

      // removing employee from currentSupervisor
      this.remove(currentSupervisor, employeeID);

      //   Move employee to new supervisor
      supervisor.subordinates = [...supervisor.subordinates, employee];

      return true;
    }

    return false;
  }
  undo() {
    let temp = this.ceo;
    //Swap States
    this.ceo = this.oldState;
    this.oldState = temp;
  }
  redo() {
    let temp = this.ceo;
    //Swap States
    this.ceo = this.oldState;
    this.oldState = temp;
  }
}
