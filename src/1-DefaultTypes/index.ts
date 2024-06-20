/* Typescript 기본 타입. */

/* boolean */
const isBoolean: boolean = true;

/* number */
const count: number = 10;
const ieee754: number = 0.1 + 0.2; // 0.30000000000000004

/* string */
const someoneName: string = "문자    ~~~ 열~~~!!";

/* null, undefined */
const empty: null = null;
const idKnow: undefined = undefined;
// const strictNullCheck: number = null; // strictNullChecks 옵션이 켜져 있으면 불가능한 코드.

/* array */
const stringArray: string[] = ["새로바뀐", "사소한 변화"];
const numberArray: Array<number> = [213, 10000000, -1, 0.12341]; // 제네릭 타입 이용.

/* tuple */
/* 배열과 다르게 각 원소의 수와 타입이 정확하게 정해진 타입. */
const exactTuple: [string, boolean, number] = ["이건", true, 30];
/* 정해진 타입 내에서 Array를 이용한 조작이 가능하다는 점이 특징. */
exactTuple.push(20);
exactTuple.push(false);
// exactTuple.push([]) // 배열 타입은 없다.

/* object */
/* Javascript object와 차이점은 , 대신 ; 사용 및 우변에 타입이 위치한다는 점. */
const user: { name: string; age: number; sibling: Array<string> } = {
  name: "yu seungjong",
  age: 30,
  sibling: ["yu jongwook"],
};
/* optional chaining을 통해 필수 값 여부를 선택 가능. */
const optionalInfo: { address?: string; height: number } = {
  height: 180,
  address: "태양계 지구 어디", // optional chaining으로 인해 있어도 그만 없어도 그만.
};
/* readonly 옵션으로 const와 동일하게 동작시킬 수 있다. */
const onlyReadInfo: { readonly parents: Array<string> } = {
  parents: ["누구게?~"],
};
// onlyReadInfo.parents = ['다시 할당은 안돼!']

/* function */
/* 이건 함수 내의 Type 정의 방법. */
const func = (a: number, b: string): string => {
  return `${b}의 나이는 ${a} 입니다.`;
};
func(30, "seungjong");

/* 이건 함수 Type 정의 방법. (매개변수 타입) => 반환 타입 */
const animal: { kind: string; bark: (sound?: string) => string } = {
  kind: "dog",
  bark: function (sound) {
    return sound || "";
  },
};
animal.bark("멍멍");

/************************************* 여기는 좀 헷갈릴 만한 부분들.*************************************/
/* 매개변수 초기화 문법도 무난하게 사용. */
function greetings(name: string = "stranger"): void {
  console.log(`Hello, ${name}`);
}

/* 선택 매개변수 문법도 가능. */
/* 선택 매개변수는 항상 필수 매개변수 뒤에 위치해야 한다!!!! */
const optionalFunction = (required: boolean, isRequired?: boolean): void => {
  const options = { required, isRequired: false };

  if (isRequired) options.isRequired = isRequired;
};

/* 함수 오버로딩 */
/**
 * 1. 함수는 하나 이상의 타입을 가질 수 있다.
 * 2. 함수는 단 하나의 구현만을 가진다.
 */
/* 하나 이상의 타입을 가질 수 있고, */
function double(str: string): string;
function double(num: number): number;
function double(arr: boolean[]): boolean[];

/* 구현은 하나만 해서 구현 내에서 분기 처리. */
function double(arg) {
  if (typeof arg === "string") {
    return `${arg}${arg}`;
  } else if (typeof arg === "number") {
    return arg * 2;
  } else if (Array.isArray(arg)) {
    return arg.concat(arg);
  }
}
/* 선언이 없으면 호출도 못해! */
const num = double(3); // number
const str = double("ab"); // string
const arr = double([true, false]); // boolean[]

/* 함수 내 this */
/**
 * Javascript의 this는 런타임에 결정되기 때문에, Typescript는 자체적으로 가짜 this를 제공.
 */
interface HTMLElement {
  tagName: string;
}
/* 여기서의 this는 가짜. */
interface Handler {
  (this: HTMLElement, event: Event, callback: () => void): void;
}

let cb: any;
/* 실제 함수 매개변수에는 this가 나타나지 않음 */
const onClick: Handler = function (event, cb) {
  /* this는 HTMLElement 타입 */
  console.log(this.tagName);
  cb();
};

/* this의 타입을 void로 지정하면, 함수 내 this의 사용을 막을 수 있다. */
interface NoThis {
  (this: void): void;
}
const noThis: NoThis = function () {
  // console.log(this.a); // Property 'a' does not exist on type 'void'.
};
/*************************************  조금 특별한 Types.  **************************************/

/* any */
/* 모든 타입이 가능하고, 메소드 호출 시 타입 검사 수행하지 않으며 
   컴파일타입에 에러가 발생하지 않고 런타임 시 에러 발생.
   타입을 특정할 수 없을 때만 사용해야 한다. (Typescript 왜 씀?)
*/
let any: any = true;
any = 3;
any = "string";
any = {};

/* void */
/* void는 null과 undefined만 값으로 가질 수 있으며, 변수에는 잘 사용하지 않고 
   함수의 반환 값을 표시할 때 사용.
*/
// const voidValue: void = null; // strictNullChecks 옵션이 켜져 있으면 불가능한 코드.
const voidValue: void = undefined;
function notingReturn(): void {}

/* never */
/* 그 어느 값도 가질 수 없는 타입이므로 함수에 사용하고, 해당 함수가 
   무슨 짓을 해도 return을 할 수 없음을 의미.
*/
function throwError(): never {
  throw new Error("Never Reach End.");
}

/* union */
/* 어떤 타입이 가질 수 있는 경우의 수를 나열할 때 사용. */

/* 함수 오버로딩을 통해 함수 구현. */
function square(value: number, returnString: boolean): number;
function square(value: number, returnString: boolean): string;
function square(value, returnString = false) {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
/* 해당 함수가 반환되어 저장되는 타입은 인자가 고정된 타입이 아니라면,  
   number일 수도 있고 string일 수도 있다.
*/
// const mystery: ??? = square(randomNumber, randomBoolean);

/* | 기호를 사용해 리턴 타입을 충분히 표현 가능하다. */
function unionFunction(
  value: number,
  returnString: boolean = false
): string | number {
  const squared = value * value;
  if (returnString) {
    return squared.toString();
  }
  return squared;
}
// const stringOrNumber: string | number = square(randomNumber, randomBoolean);
type unionGroup = string | number | any | never;
function 이런것도되는유니온(a: string, b: number): unionGroup;
function 이런것도되는유니온() {
  return "";
}

/* intersection */
/* 여러 경우에 모두 해당하는 타입. */
type Person = {
  name: string;
  age: number;
};

type Programmer = {
  role: string;
};

/* 두 가지 모두 해당하는 타입을 재정의하면 바보같은 짓!! */
type DontDoThat = {
  name: string;
  age: number;
  role: string;
};

/* Person이면서 Programmer에 해당 하는 경우? intersection 사용. */
type PersonProgrammer = Person & Programmer;

/* enum */
/* 가능한 경우의 수를 가지는 집합을 정의하는 타입. */
/* 기본 숫자 열거형 자동 증가 방식으로 동작. */
enum Menu {
  Pizza,
  Chicken,
  Pasta,
}
/* 이런식으로 초기화도 가능. */
enum SameMenu {
  Pizza = 3,
  Chicken, // 3에서 증가, 4
  Pasta = 7,
}
/* enum의 멤버는 enum 타입을 갖는다. */
const menu: SameMenu = SameMenu.Chicken;

/* 문자열 열거형은 자동 증가가 되지 않으므로 반드시 초기화가 필요. */
/* 숫자형 열거형과 다르게 컴파일 코드에 값 -> 키의 역방향 매핑이 존재하지 않는다!? */
enum Direction {
  East = "EAST",
  West = "WEST",
  South = "SOUTH",
  North = "NORTH",
}

/* 지금까지의 상수 멤버들과 다르게 런타임 시 값을 알 수 있는 멤버를 
   Computed Member라 하며, 해당 멤버 이후에 오는 멤버는 반드시 초기화가 되어야 한다는 점에 주의!!!
*/
function getAnswer() {
  return 42;
}

enum ComputedEnum {
  Answer = getAnswer(),
  Mistery = "aa",
}

/* 숫자형 열거형의 경우, 아래와 같이 js로 컴파일된다.
var Direction;
(function (Direction) {
    Direction[Direction["East"] = 0] = "East";
    Direction[Direction["West"] = 1] = "West";
    Direction[Direction["South"] = 2] = "South";
    Direction[Direction["North"] = 3] = "North";
})(Direction || (Direction = {}));
var east = Direction.East;

키 -> 값 / 값 -> 키 매핑이 정의되는데, 이 때 객체 속성에 접근이 발생하므로 오버헤드가 발생.
이를 방지해 성능 향상을 할 수 있다. 아래 처럼.
*/
const enum ConstEnum {
  A,
  B = 2,
  C = B * 2,
  D = -C,
}
/* 컴파일 시 아래 코드는 이렇게 변한다.
   console.log(2);
   열거형에 대한 어떠한 정보도 남지 않고 상수값으로 대체.
*/
console.log(ConstEnum.B);

/**
 * enum에 속하는 모든 멤버가 다음 3가지 중 1가지에 해당하는 경우 union enum이라 한다.
 * 1. 암시적으로 초기화 된 값.
 * 2. 문자열 리터럴.
 * 3. 숫자 리터럴.
 */
/* union enum */
enum ShapeKind {
  Circle, // 1.
  Triangle = 3, // 3.
  Square, // 1.
}
/* union enum에 속하는 멤버는 값인 동시에 타입이 될 수 있다. */
type Circle = {
  kind: ShapeKind.Circle; // 타입으로 활용.
  radius: number;
};
type Triangle = {
  kind: ShapeKind.Triangle; // 타입으로 활용.
  maxAngle: number;
};
type Square = {
  kind: ShapeKind.Square; // 타입으로 활용.
  maxLength: number;
};
type Shape = Circle | Triangle | Square;

/* Typescript는 숫자, 문자열, 불리언 값을 타입으로 사용 가능한 literal type을 지원.
   literal type은 단 1개의 값만을 가진다.
*/

const answer: 42 = 42;
// const wrongAnser:42 = 22;

/* union + literal type. */
type UnionLiteral = "EAST" | "WEST" | "SOUTH" | "NORTH";
const east: UnionLiteral = "EAST";
// const center: UnionLiteral = 'CENTER'; // error TS2322: Type '"CENTER"' is not assignable to type 'Direction'.
