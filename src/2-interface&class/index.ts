/* interface */
/* interface 키워드를 이용해 특정한 shape를 갖도록 제약. */
interface Admin {
  name: string;
  email?: string; // optional 가능
  readonly role: number; // readonly 가능
}

const superAdmin: Admin = {
  name: "유승종",
  role: 1,
};

// superAdmin.role = 2; readonly fail.

/* interface를 이용해 함수 타입도 표현 가능. */

interface GetAdminName {
  // 호출 시그니처라 함.
  // GetAdminName 이라는 함수 인터페이스.
  (admin: Admin): string;
}

// 함수 인터페이스의 구현.
const getAdminName: GetAdminName = (admin) => {
  return admin.name;
};

/* 여러 속성을 갖는 하이브리드 객체 (속성 타입 + 함수 타입) */

interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = <Counter>function (start: number) {};
  counter.interval = 123;
  counter.reset = () => {};
  return counter;
}

// c 자체는 함수이지만, reset과 interval이라는 속성을 추가로 갖는다.
let c = getCounter();

c(10);
c.reset();
c.interval = 5.0;

/* 제너릭 인터페이스 */
interface MyResponse<T> {
  data: T;
  status: number;
  ok: boolean;
}

interface Machine {
  name: string;
  readonly price: number;
}

const computer: MyResponse<Machine> = {
  data: {
    name: "AMD 204",
    price: 5000000,
  },
  status: 200,
  ok: true,
};

computer.data.name;

// 함수 인터페이스에도 제너릭 사용 가능.
interface GetData {
  <T>(response: MyResponse<T>): T; // 타입 변수는 매개변수의 앞에 적는다.
}
/**
 * 1. 기본적으로 type보다는 interface를 사용하고, interface로 불가능한 부분은 type을 사용!!!
 * 2. interface는 상속이 가능하지만, type은 불가능.
 * 3. interface는 실제로 타입을 생성하지만 type alias는 생성하지 않으며 새로운 이름만을 붙이는 것.
 */

/* interface extends */

// 기존 Admin 속성에 추가적인 속성으로 확장 가능.
interface ExternalAdmin extends Admin {
  organism: string;
}

interface ElectricDevice {
  voltage: number;
  //   duplicateOption?: string;
}
interface SquareShape {
  width: number;
  height: number;
  //   duplicateOption?: number;
}

/**
 * 여러 인터페이스를 동시 확장.
 * but, 확장 대상이 되는 인터페이스가 동일한 속성을 가지고 있는 경우, Type이 일치해야 한다. (Error 발생.)
 *  */
interface Laptop extends ElectricDevice, SquareShape {
  color: string;
}
const macbook15: Laptop = {
  voltage: 220,
  width: 30,
  height: 21,
  color: "white",
};
