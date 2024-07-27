/* class static */
/* 각 인스턴스간 공유하고자 하는 정보는 static을 이용. */

class Counter {
  static count: number = 0; // 정적 멤버
  asd: string; // 인스턴스 멤버

  // 정적 메소드도 가능.
  static increaseCount() {
    Counter.count += 1;
  }
  static getCount() {
    return Counter.count;
  }
}

console.log(Counter.count); // static 속성에 접근하기 위해서는 this가 아닌, Class.static 형식으로 호출.
// console.log(Counter.asd);  error, instance member.

/* class access modifier */
/* 클래스 멤버에 대한 접근 제어자도 사용할 수 있다. */

/* 1. public */

class PublicClass {
  publicValue: number; // 명시하지 않아도 기본 public 접근자 적용.
  public publicValue2: number; // 명시적 public 접근자.
}

/* 2. private */
/* 해당 클래스 내부에서만 접근 가능. */
class PrivateClass {
  private password: string;

  constructor(password: string) {
    this.password = password; // 접근 가능.
  }
}

class SubPrivateClass extends PrivateClass {
  constructor(password: string) {
    super(password);
  }

  setPassword(newPassword: string) {
    // this.password = newPassword; Sub class 내부에서도 접근이 불가능하다.
  }
}

const testPrivate: PrivateClass = new PrivateClass("aaa");
// testPrivate.password = '222' private 접근자 접근 불가.

/* 3. protected */
/* private과 비슷하지만, Sub class에서의 접근은 허용. */
class PrivateClass2 {
  protected password: string;

  constructor(password: string) {
    this.password = password; // 접근 가능.
  }
}

class SubPrivateClass2 extends PrivateClass2 {
  constructor(password: string) {
    super(password);
  }

  setPassword(newPassword: string) {
    this.password = newPassword; // Sub class 내부에서도 접근이 가능.
  }
}

/* 생성자의 접근 제어자 */
/* 접근 제어자가 붙은 매개변수는 같은 이름을 가지는 속성으로 선언되고 암묵적으로 인스턴스에 할당. */
class User2 {
  constructor(public name: string, private password: string) {} // 매개변수 역시 접근 제어자를 가질 수 있다.
}

/* User2 class와 같은 class. */
class User3 {
  public id: string;
  private password: string;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }
}

/* 접근자 */
// 일반적인 경우, getter/setter 함수를 별도로 정의해서 호출.
class Shape2 {
  private _vertices: number = 3;

  getVertices() {
    console.log("Vertices getter called.");
    return this._vertices;
  }

  setVertices(value) {
    console.log("Vertices setter called.");
    this._vertices = value;
  }
}
// 2가지의 접근자(get, set) 존재.
class Shape3 {
  private _vertices: number = 3;
  get vertices() {
    // get 키워드를 붙여 속성값을 조회하는 메소드를 정의 가능, 인자를 받을 수 없다.
    console.log("Vertices getter called.");
    return this._vertices;
  }
  set vertices(value) {
    // set 키워드를 붙여 속성값을 수정하는 메소드를 정의 가능, 새로 할당되는 값을 인자로 받는다.
    console.log("Vertices setter called.");
    this._vertices = value;
  }
}

const squre: Shape3 = new Shape3();

squre.vertices = 5; // private set vertices
squre.vertices; // 5 get vertices

/* 추상 클래스 */
/* abstract class 키워드로 선언하고, 일반 클래스는 extends를 이용해 확장 가능
 * 인스턴스화가 불가능하고, 구현을 일부 포함할 수 있다는 점에서 인터페이스와 다르다.
 */

abstract class Animal {
  move(): void {
    // 일반적인 구현 메소드.
    console.log("roaming the earth...");
  }
  abstract makeSound(): void; // abstract method, 타입 정보 이외의 실제 구현은 포함 x.
}

// 추상 클래스를 구현한 클래스는 내부에 존재하는 abstract 멤버를 반드시 구현해야한다.
class Dog2 extends Animal {
  makeSound(): void {
    // abstract method 구현.
    console.log("aaa");
  }
}

/* class와 interface */

interface Animal3 {
  legs: number;
}

class Dog4 implements Animal3 {
  legs = 4; // class에서 interface를 구현할 때, 반드시 해당 구조와 동일해야 한다.
}

// interface가 class 구조를 확장할 수도 있다.
class Point2 {
  x: number;
  y: number;
}

interface Point3d extends Point2 {
  z: number;
}

const point3: Point3d = { x: 1, y: 2, z: 3 };
