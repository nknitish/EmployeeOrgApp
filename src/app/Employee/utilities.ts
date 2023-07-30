import { IEmployee, IEmployeeOrgApp } from "./Interfaces";
import { DoublyLinkedList } from "./doublyLinkedList";

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
  ceo: IEmployee;
  list: DoublyLinkedList; //for undo/redo

  constructor(employee: Employee) {
    this.ceo = employee;
    let list = new DoublyLinkedList();

    //Add initial state to list just after creation of organisation
    list.push(this.ceo);

    this.list = list;
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
    //Creating a copy of current state for undo /redo
    let root = JSON.parse(JSON.stringify(this.ceo));

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

      //Push new changes of move to list (new state) for undo/redo
      this.list.push(root);

      //Point ceo to current updated state
      this.ceo = root;

      return true;
    }

    return false;
  }

  //Undo move actions
  undo() {
    let { current } = this.list;
    let previousNode = current?.prev;
    let bool = false;

    if (previousNode && previousNode?.value) {
      this.ceo = previousNode?.value;
      this.list.setCurrent(previousNode);
      bool = true;
    }

    //Return true if undo completed else false

    if (bool) {
      console.log("After Undo => ", this.ceo);
    }
    return bool;
  }

  //Redo your last undo
  redo() {
    let { current } = this.list;
    let nextNode = current?.next;
    let bool = false;

    if (nextNode && nextNode?.value) {
      this.ceo = nextNode?.value;
      this.list.setCurrent(nextNode);
      bool = true;
    }

    //Return true if redo completed else false
    if (bool) {
      console.log("After Redo => ", this.ceo);
    }
    return bool;
  }
}
