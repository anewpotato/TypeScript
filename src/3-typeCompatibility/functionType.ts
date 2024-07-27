/* 함수 타입의 호환성 */
/* 매개 변수의 갯수가 같은 경우, 할당을 받는 함수를 Target 할당 하려는 함수를 Source라 할 때
 * 1. Target과 Source의 모든 배개변수 타입에 대해 Source의 매개변수 타입이 Target의 매개변수 타입에 할당 가능한가?
 * 2. Target의 반환 타입이 Source의 반환 타입에 할당 가능한가?
 */

/* Sum을 Multiply에 할당할 경우,
 * Sum의 매개변수 타입은 Multiply의 매개변수 타입에 할당 가능하다.
 * Sum의 반한 타입은 Multiply의 반환 타입에 할당 가능하다.
 */
type Sum = (sumFirst: number, sumSecond: number) => number;
type Multiply = (mulFirst: number, mulSecond: number) => number;

const sum: Sum = (sumFirst: number, sumSecond: number) => {
  return sumFirst + sumSecond;
};
const multiply: Multiply = sum; // ok

interface Animal {
  animalProp: string;
}
interface Dog extends Animal {
  dogProp: number;
}

/* g를 f에 할당할 경우,
 * g의 매개변수 Dog는 f의 매개변수 Animal에 할당할 수 없다.
 */
let f = (animal: Animal) => animal.animalProp;
let g = (dog: Dog) => {};

// f = g; error

/**
 * 할당
 */
type Login = (id: string) => void;
type LoginWithToken = (id: string, token: string) => void;

// 매개 변수가 많은 함수의 타입을 매개 변수가 적은 함수의 타입에 할당 불가능. (초과하는 매개 변수들이 undefined 가능성이 있기 때문에.)
// const loginWithToken: LoginWithToken = (id: string, token: string) => { /* ... */ };
// const login: Login = loginWithToken;

// 매개 변수가 적은 함수의 타입을 매개 변수가 많은 함수의 타입에 할당 가능. (초과된 매개 변수들은 무시할 수 있으므로.)
const login: Login = (id: string) => {
  /* ... */
};
const loginWithToken: LoginWithToken = login;
