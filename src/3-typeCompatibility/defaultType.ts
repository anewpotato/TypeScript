/* 기본 타입의 호환성. */
/* 타입의 할당 가능성: 두 가지 다른 타입 A와 B에 대해, 모든 A 타입의 값을 B 타입의 값으로도 취급할 수 있는가? */

type OneDigitOdd = 1 | 3 | 5 | 7 | 9;
const three: OneDigitOdd = 3;
// OneDigitOdd type이 가질 수 있는 값은 모두 number -> number에 할당 가능.
const number: number = three;

const four: number = 4;
// const oneDigitOdd: OneDigitOdd = four; // OneDigitOdd type은 4를 가질 수 없으므로 할당 불가능.
