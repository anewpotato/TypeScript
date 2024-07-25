/* 동적인 색인을 표현하는 색인 가능 타입. */
/* 코드 작성 단계가 아닌, 실행 시점에만 알 수 있는 동적 속성을 가지는 타입을 표현. */

/* 임의의 사용자 목록을 받아, name을 key로 height을 value로 가지는 Map interface는 동적 속성을 갖는 인터페이스.
 * 동적으로 서버로부터 데이터를 받아 변경 가능성이 있는 데이터를 의미.
 */
const users: Array<{
  name: string;
  height: number;
  favoriteLanguage?: string;
}> = [
  { name: "안희종", height: 176, favoriteLanguage: "TypeScript" },
  { name: "이방인", height: 42 },
];
// interface NameHeightMap {
//   // ??
// }
// users.map((user) => {
//   nameHeightMap[user.name] = user.height;
// });
//   console.log(userHeightMap) // { '안희종': 176, 'Stranger': 42 }

/* indexable 객체. */
/* 색인 접근 시 대괄호를 이용해 색인 시그니처를 작성. */
interface NameHeightMap {
  [userName: string]: number | undefined; // [userName:string]이 색인 시그니처.
} //  NameHeightMap[userName]은 number 또는 undefined 값을 가진다. (없는 색인일 경우, undefined를 가지는 것에 주의.)

// 동적 객체.
const nameHeightMap: NameHeightMap = {};

// 동적 객체 데이터 삽입.
users.map((user) => {
  nameHeightMap[user.name] = user.height;
});

// name 동적 데이터로 value 조회.
const h = nameHeightMap["안희종"];

if (h !== undefined) {
  // undefined 체크 필수!!
  console.log(h.toString());
}

/**
 * 1. 색인의 KEY는 문자열 또는 숫자만 사용 가능
 * 2. 숫자 KEY의 값은 문자열 KEY의 값의 서브타입이어야 한다.
 * */
// interface Mixed<A, B> {
//   [stringIndex: string]: A;
//   [numberIndex: number]: B;
// }

/**
 * 1. 문자열 KEY의 값은 number.
 * 2. 숫자 KEY의 값은 boolean.
 * 3. boolean은 number의 subtype이 아니다.
 *
 * Javascript는 내부적으로 색인에 접근할 때 toString() 메소드를 이용하는데,
 * obj[1]은 obj['1']로 판단하므로, 아래의 경우 obj['1']의 VALUE는 number인데,
 * 타입 시스템은 코드를 봤을 때 boolean이므로 number !== boolean 에러 발생.
 */
// interface ErrorPerson {
//     [str:string] : number;   // string의 VALUE는 number인데, 타입 시스템은 boolean을 예측하므로 Error.
//     [num: number] : boolean; // 내부적으로 string의 VALUE 타입을 참조.
// }

// const errorPerson: ErrorPerson = {
//     '가나다' : 20,
//     30: true
// }

// errorPerson[30];

/* name의 VALUE는 결국 [string:string]으로 판단되어 VALUE가 number로 판단된다. */
interface Indexable {
  readonly [string: string]: number; // 읽기 전용 색인도 가능.
  name: number;
}

// 대표적으로 Array 인터페이스는 indexable을 사용하는데, 사용하지 않으면 아래처럼 인덱스 모두를 나열.
interface Array<T> {
  length: number;
  0?: T;
  1?: T;
  2?: T;
}

// indexable을 사용하면 간단하게 인터페이스 사용 가능.
interface IndexableArray<T> {
  length: number;
  [index: number]: T;
}
