//InterFaces
export interface IEmployee {
  uniqueId: number;
  name: string;
  subordinates: IEmployee[];
}

export interface IEmployeeOrgApp {
  ceo: IEmployee;
  move(employeeID: number, supervisorID: number): void;
  undo(): void;
  redo(): void;
}
