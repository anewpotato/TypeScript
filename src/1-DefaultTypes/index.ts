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
