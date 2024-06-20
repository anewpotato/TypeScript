/* Generic */
/* 여러 타입이 동일한 동작을 보장함. */
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
function getTypeVariable(arr) {
    return arr[0];
}
/* 호출 시 에도 타입 변수를 적어줌에 유의!!! */
getTypeVariable([1, 2, 3, 4]);
getTypeVariable(["1", "2"]);
const drinkgs = ["string array"];
const rank = [1, 2, 3, 4];
