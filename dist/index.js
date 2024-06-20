/* Typescript 기본 타입. */
/* boolean */
const isBoolean = true;
/* number */
const count = 10;
const ieee754 = 0.1 + 0.2; // 0.30000000000000004
/* string */
const someoneName = "문자    ~~~ 열~~~!!";
/* null, undefined */
const empty = null;
const idKnow = undefined;
// const strictNullCheck: number = null; // strictNullChecks 옵션이 켜져 있으면 불가능한 코드.
/* array */
const stringArray = ["새로바뀐", "사소한 변화"];
const numberArray = [213, 10000000, -1, 0.12341]; // 제네릭 타입 이용.
/* tuple */
/* 배열과 다르게 각 원소의 수와 타입이 정확하게 정해진 타입. */
const exactTuple = ["이건", true, 30];
/* 정해진 타입 내에서 Array를 이용한 조작이 가능하다는 점이 특징. */
exactTuple.push(20);
exactTuple.push(false);
// exactTuple.push([]) // 배열 타입은 없다.
/* object */
/* Javascript object와 차이점은 , 대신 ; 사용 및 우변에 타입이 위치한다는 점. */
const user = {
    name: "yu seungjong",
    age: 30,
    sibling: ["yu jongwook"],
};
/* optional chaining을 통해 필수 값 여부를 선택 가능. */
const optionalInfo = {
    height: 180,
    address: "태양계 지구 어디", // optional chaining으로 인해 있어도 그만 없어도 그만.
};
/* readonly 옵션으로 const와 동일하게 동작시킬 수 있다. */
const onlyReadInfo = {
    parents: ["누구게?~"],
};
// onlyReadInfo.parents = ['다시 할당은 안돼!']
/* function */
/* 이건 함수 내의 Type 정의 방법. */
const func = (a, b) => {
    return `${b}의 나이는 ${a} 입니다.`;
};
func(30, "seungjong");
/* 이건 함수 Type 정의 방법. (매개변수 타입) => 반환 타입 */
const animal = {
    kind: "dog",
    bark: function (sound) {
        return sound || "";
    },
};
animal.bark("멍멍");
/************************************* 여기는 좀 헷갈릴 만한 부분들.*************************************/
/* 매개변수 초기화 문법도 무난하게 사용. */
function greetings(name = "stranger") {
    console.log(`Hello, ${name}`);
}
/* 선택 매개변수 문법도 가능. */
/* 선택 매개변수는 항상 필수 매개변수 뒤에 위치해야 한다!!!! */
const optionalFunction = (required, isRequired) => {
    const options = { required, isRequired: false };
    if (isRequired)
        options.isRequired = isRequired;
};
/* 구현은 하나만 해서 구현 내에서 분기 처리. */
function double(arg) {
    if (typeof arg === "string") {
        return `${arg}${arg}`;
    }
    else if (typeof arg === "number") {
        return arg * 2;
    }
    else if (Array.isArray(arg)) {
        return arg.concat(arg);
    }
}
/* 선언이 없으면 호출도 못해! */
const num = double(3); // number
const str = double("ab"); // string
const arr = double([true, false]); // boolean[]
let cb;
/* 실제 함수 매개변수에는 this가 나타나지 않음 */
const onClick = function (event, cb) {
    /* this는 HTMLElement 타입 */
    console.log(this.tagName);
    cb();
};
const noThis = function () {
    // console.log(this.a); // Property 'a' does not exist on type 'void'.
};
/*************************************  조금 특별한 Types.  **************************************/
/* any */
/* 모든 타입이 가능하고, 메소드 호출 시 타입 검사 수행하지 않으며
   컴파일타입에 에러가 발생하지 않고 런타임 시 에러 발생.
   타입을 특정할 수 없을 때만 사용해야 한다. (Typescript 왜 씀?)
*/
let any = true;
any = 3;
any = "string";
any = {};
/* void */
/* void는 null과 undefined만 값으로 가질 수 있으며, 변수에는 잘 사용하지 않고
   함수의 반환 값을 표시할 때 사용.
*/
// const voidValue: void = null; // strictNullChecks 옵션이 켜져 있으면 불가능한 코드.
const voidValue = undefined;
function notingReturn() { }
/* never */
/* 그 어느 값도 가질 수 없는 타입이므로 함수에 사용하고, 해당 함수가
   무슨 짓을 해도 return을 할 수 없음을 의미.
*/
function throwError() {
    throw new Error("Never Reach End.");
}
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
function unionFunction(value, returnString = false) {
    const squared = value * value;
    if (returnString) {
        return squared.toString();
    }
    return squared;
}
function 이런것도되는유니온() {
    return "";
}
/* enum */
/* 가능한 경우의 수를 가지는 집합을 정의하는 타입. */
/* 기본 숫자 열거형 자동 증가 방식으로 동작. */
var Menu;
(function (Menu) {
    Menu[Menu["Pizza"] = 0] = "Pizza";
    Menu[Menu["Chicken"] = 1] = "Chicken";
    Menu[Menu["Pasta"] = 2] = "Pasta";
})(Menu || (Menu = {}));
/* 이런식으로 초기화도 가능. */
var SameMenu;
(function (SameMenu) {
    SameMenu[SameMenu["Pizza"] = 3] = "Pizza";
    SameMenu[SameMenu["Chicken"] = 4] = "Chicken";
    SameMenu[SameMenu["Pasta"] = 7] = "Pasta";
})(SameMenu || (SameMenu = {}));
/* enum의 멤버는 enum 타입을 갖는다. */
const menu = SameMenu.Chicken;
/* 문자열 열거형은 자동 증가가 되지 않으므로 반드시 초기화가 필요. */
/* 숫자형 열거형과 다르게 컴파일 코드에 값 -> 키의 역방향 매핑이 존재하지 않는다!? */
var Direction;
(function (Direction) {
    Direction["East"] = "EAST";
    Direction["West"] = "WEST";
    Direction["South"] = "SOUTH";
    Direction["North"] = "NORTH";
})(Direction || (Direction = {}));
/* 지금까지의 상수 멤버들과 다르게 런타임 시 값을 알 수 있는 멤버를
   Computed Member라 하며, 해당 멤버 이후에 오는 멤버는 반드시 초기화가 되어야 한다는 점에 주의!!!
*/
function getAnswer() {
    return 42;
}
var ComputedEnum;
(function (ComputedEnum) {
    ComputedEnum[ComputedEnum["Answer"] = getAnswer()] = "Answer";
    ComputedEnum["Mistery"] = "aa";
})(ComputedEnum || (ComputedEnum = {}));
/* 컴파일 시 아래 코드는 이렇게 변한다.
   console.log(2);
   열거형에 대한 어떠한 정보도 남지 않고 상수값으로 대체.
*/
console.log(2 /* ConstEnum.B */);
/**
 * enum에 속하는 모든 멤버가 다음 3가지 중 1가지에 해당하는 경우 union enum이라 한다.
 * 1. 암시적으로 초기화 된 값.
 * 2. 문자열 리터럴.
 * 3. 숫자 리터럴.
 */
/* union enum */
var ShapeKind;
(function (ShapeKind) {
    ShapeKind[ShapeKind["Circle"] = 0] = "Circle";
    ShapeKind[ShapeKind["Triangle"] = 3] = "Triangle";
    ShapeKind[ShapeKind["Square"] = 4] = "Square";
})(ShapeKind || (ShapeKind = {}));
/* Typescript는 숫자, 문자열, 불리언 값을 타입으로 사용 가능한 literal type을 지원.
   literal type은 단 1개의 값만을 가진다.
*/
const answer = 42;
const east = "EAST";
// const center: UnionLiteral = 'CENTER'; // error TS2322: Type '"CENTER"' is not assignable to type 'Direction'.
