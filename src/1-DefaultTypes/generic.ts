/* Generic */
/* 여러 타입이 동일한 동작을 보장함. */

/* 문자열 배열이 인자로 들어오면 문자열 값을 반환. */
/* 숫자 배열이 인자로 들어오면 숫자 값을 반환. */
/* 다양한 타입을 받기 위해서는 함수 오버로딩을 통해 구현 가능. */
function getFirstElem(arr: string[]): string;
function getFirstElem(arr: number[]): number;
function getFirstElem(arr) {
  if (!Array.isArray(arr)) {
    throw new Error("getFirstElemOrNull: Argument is not array!");
  }
  if (arr.length === 0) {
    throw new Error("getFirstElemOrNull: Argument is an empty array!");
  }
  return arr[0] ? arr[0] : null;
}

/**
 * number, string을 제외한 타입도 동일하게 동작하고자
 * 모든 타입을 오버로딩하면 멍청한 짓.
 * (any 타입을 사용하면 가능하지만, Typescript 왜 씀?)
 * 즉, 함수를 정의할 때는 어떤 타입의 값이 들어올 지 모르지만
 * 런타임 시 알 수 있는 타입 정보를 사용하고자 할 경우 제네릭을 사용.
 */

/* 제네릭은 <>를 사용하여 타입 변수라는 걸 생성한다. */
// function 함수명<타입 변수>(arr: 인자 타입) :반환 타입 {
//
//     return arr[0];
// }
function getTypeVariable<T>(arr: T[]): T {
  return arr[0];
}

/* 호출 시 에도 타입 변수를 적어줌에 유의!!! */
getTypeVariable<number>([1, 2, 3, 4]);
getTypeVariable<string>(["1", "2"]);

/* 타입 alias에서도 사용 가능. */
type TypeVar<T> = T[];
const drinkgs: TypeVar<string> = ["string array"];
const rank: TypeVar<number> = [1, 2, 3, 4];
