/* 서로소 유니온 타입 */

// 겹치지 않는 타입으로 이루어진 유니온 타입
/**
 *
 */
interface Employee2 {
  type: "Employee";
  department: string;
  salary: number;
}
interface Boss {
  type: "Boss";
  kind: boolean;
}

// CompanyMember는 Employee 또는 Boss 타입이며, 각 타입을 branch라 한다.
type CompanyMember = Employee2 | Boss;

// type이 다르므로 겹치는 부분이 없는 서로소 유니온 타입.
// const whoAmI: CompanyMember = {
//   kind: true,
//   salary: 777,
//   department: "everywhere",
// };

/**
 * 서로 구분되는 식별자를 통해 타입을 좁히는 패턴이 가능.
 */
type Shape4 =
  | { kind: "circle"; radius: number }
  | { kind: "square"; sideLength: number }
  | { kind: "rectangle"; width: number; height: number };

function getArea(shape: Shape4): number {
  switch (
    shape.kind // 구분 속성을 이용한 타입 가드.
  ) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    case "rectangle":
      return shape.width * shape.height;
    // default 문이 없어도 undefined가 return될 일이 없기 때문에 문제가 없다.
  }
}
