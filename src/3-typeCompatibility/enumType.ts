/* 열거형의 호환성 */

// 서로 다른 열거형으로부터 유래된 값은 할당 불가능.
enum Status {
  Ready,
  Waiting,
}
enum Color5 {
  Red,
  Blue,
  Green,
}
let status5: Status = Status.Ready;
// status5 = Color5.Green; // error

enum MyEnum {
  Zero, // 숫자 열거형
  One = 1, // 숫자 열거형
  Name = "안희종", // 문자열 열거형.
}
const zero: number = MyEnum.Zero;
const one: number = MyEnum.One;
const name5: string = MyEnum.Name;
