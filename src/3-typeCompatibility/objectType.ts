/* 객체 타입의 호환성 */
/**
 * A가 B에 할당 가능한가? (구조적 타입 시스템 (typescript) <=> 노미널 타입 시스템(C++, Java))
 * 1. B 타입의 모든 필수 멤버와 같은 이름을 가지는 멤버가 A에 존재하는 가?
 * 2. B 타입과 A 타입에 동시에 존재하는 멤버 m에 대해 A.m의 타입이 M, B.m의 타입을 M`라고 할 때, 모든 m에 대해서 M이 M`에 할당 가능한가?
 * => 같은 이름을 가지는 멤버의 타입이 할당하려는 멤버의 타입과 일치하냐?
 */
interface User5 {
  name: string;
  height: number;
}
interface Pet {
  name: string;
  species?: string;
}
const user5: User5 = { name: "안희종", height: 176 };
const puppy: Pet = { name: "해피" };

/**
 * 1. User5는 Pet에 할당 가능한 가?
 * - Pet의 필수 멤버는 name 1개이며, User5에도 존재.
 * - User5의 name은 string, Pet의 name도 string.
 * => User5는 Pet에 할당 가능.
 *
 * 2. Pet은 User5에 할당 가능한 가?
 * => User5의 필수 멤버는 name과 height2개인데, Pet에는 height가 없으므로 할당 불가능.
 */

interface Color {
  R: number;
  G: number;
  B: number;
}

/**
   * 객체 리터럴은 알려진 속성만 가질 수 있고, 이를 검사하는 과정을 과잉 속성 검사라고 한다.
   * 존재 이유: 개발자의 실수를 막기 위함, 객체 리터럴 생성 시 오타 등의 실수 발생 가능.
   * 
   interface SquareConfig {
    width?: number;
    color?: string;
  }
  const squareConfig: SquareConfig = {
    width: 100,
    colour: red // 오타 
  };
   */
//   const white: Color = {
//     R: 255,
//     G: 255,
//     B: 255,
//     A: 1        // Color에 없는 속성을 확장.
//   };

const someColor = {
  R: 255,
  G: 255,
  B: 255,
  A: 1,
};
const white: Color = someColor; // 리터럴을 할당하는 것이 아닌 변수로 변경하면 에러는 사라진다.
