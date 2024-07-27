/* 제네릭의 호환성 */
/* 객체의 호환성과 비슷하게 동작. */

/* 모든 타입 변수가 어떤 타입인지 알려진 경우 */

interface NotEmpty<T> {
  data: T;
}

let x: NotEmpty<number>;
let y: NotEmpty<string>;

// 각각 number, string타입을 가지게 되므로 객체 비교와 동일하게 생각하면 할당 불가능.
//   x=y

/* 어떤 타입인지 알려지지 않은 타입 변수가 있는 경우 */
// let identity = function <T>(x: T): T {
//   // ...

// };

// const reverse = function <U>(y: U): U {
//   // ...
// };

// 각각 타입 변수가 제네릭으로 아직 확정되지 않은 타입은 any로 판단되기 때문에 할당 가능.
// identity = reverse;
