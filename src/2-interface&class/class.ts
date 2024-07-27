/* ES6 문법에서 추가된 class 키워드를 이용한 객체 지향적 구조화 */
/* Typescript에서의 class는 ES6에서 추가된 클래스의 상위 집합. */

/* class */
// constructor(){} 기본 생성자는 명시하지 않아도 항상 생성.
class NothingImportant {}

// new 키워드와 생성자를 이용해 인스턴스화.
const nothingImportant: NothingImportant = new NothingImportant();

class Dog {
  constructor() {
    // 생성자 내부에 객체가 생성될 때 실행할 로직을 정의 가능.
    console.log("constructing!!");
  }
}

const dog: Dog = new Dog(); // constructing!!

class BarkingDog {
  constructor(barkingSound: string) {
    // 생성자 매개변수를 가질 수 있다.
    console.log(`${barkingSound}!`);
  }
}

const barkingDog: BarkingDog = new BarkingDog("월");

// 함수 시그니처와 맞지 않는 생성자 호출은 에러 발생!
// const err: BarkingDog = new BarkingDog();
// const err2: BarkingDog = new BarkingDog(3);

class Triangle2 {
  vertices: number; // class instance property.
  assertion!: string; // 확정적 할당 단언, 해당 값은 Nullish 값이 아님을 단언하는 것. (확실한 경우에만 사용.)
  constructor() {
    this.vertices = 3; // property는 this를 통해 접근.
  }
}

const triangle: Triangle2 = new Triangle2();

console.log(triangle.vertices); // 3

// readonly 속성은 선언 혹은 생성자 내부에서 반드시 초기화가 필수.
class Triangle3 {
  readonly vertices: number = 3; // 속성 기본값 제공 가능, 읽기 전용 속성은 선언 및 생성자를 제외한 곳에서 변경 불가능.

  constructor() {
    this.vertices = 5; // readonly이지만, 생성자 내부에서는 변경 가능.
  }

  getVertices(): void {
    // class 내부에 메소드 선언 가능.
    console.log(`${this.vertices}`);
  }
}

const triangle3: Triangle3 = new Triangle3();

// triangle3.vertices = 50; readonly이므로 속성 값 변경 불가능.

triangle3.getVertices(); // 객체 내 메소드 호출.

/* class 확장. */

// Super Class
class Base {
  answer: number = 42;
  baseProp: number;
  greetings() {
    console.log("Hello World");
  }

  constructor() {
    this.baseProp = 123;
  }
}
/* Super class의 생성자는 Sub class 생성자 내에서 자동으로 호출되지 않으므로, super 키워드로 명시적으로 호출해주어야 한다. */
// Sub Class
class Extended extends Base {
  extendedProp: number;
  constructor() {
    super(); // 반드시 이 호출을 직접 해 주어야 함. (Error 발생.)
    this.extendedProp = 456;
  }
}

const extended: Extended = new Extended();
console.log(extended.answer); // 42
extended.greetings(); // Hello World

console.log(extended.baseProp); // 123
console.log(extended.extendedProp); // 456
