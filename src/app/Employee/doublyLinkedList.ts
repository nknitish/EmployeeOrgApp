import { IEmployee } from "./Interfaces";

class Node {
  prev: Node | null = null;
  next: Node | null = null;
  value: IEmployee | null;
  constructor(value: IEmployee) {
    this.value = value;
  }
}

export class DoublyLinkedList {
  length = 0;
  head: Node | null = null;
  tail: Node | null | any = null;
  current: Node | null = null; //points to current state

  push(value: IEmployee) {
    let newNode = new Node(value);

    //If there is no node created
    if (!this.head) {
      this.head = newNode;
      this.tail = this.head;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }

    //setting last updated state as current state
    this.setCurrent(newNode);

    this.length++;

    return this;
  }
  setCurrent(value: Node) {
    this.current = value;
  }
}
