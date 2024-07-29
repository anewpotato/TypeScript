/* 타입 좁히기. */
/**
 * union type: A|B = A 또는 B
 * optional props: prop?: T = T 또는 undefined.
 * but, union != optional props: union type은 해당 타입이 반드시 존재해야 하지만, 후자는 그렇지 않다.
 */

/* 보다 넓은 경우의 수 -> 좁은 경우의 수로 좁히는 과정을 타입 좁히기(type narrowing)라 한다. */
interface Person2 {
  favoriteLanguage?: string;
}

function isFavoriteLangScript(p: Person2): boolean {
  // A : p.favoriteLanguate는 string 또는 undefined.
  if (p.favoriteLanguage === undefined) {
    // undefined early return.
    return false;
  }

  //B : undefined는 위에서 제외되었으므로 string으로 단정 지을 수 있다.
  const lowerCased = p.favoriteLanguage.toLowerCase();
  return lowerCased.includes("script");
}

/* 타입 가드 */
/**
 * 특정 스코프 내에서 값의 타입을 좁히는 표현을 타입 가드(type guard)라 하며 2가지가 존재한다.
 * 1. 제어 흐름 분석
 * 2. 사용자 정의 타입 가드
 */

/* 제어 흐름 분석 */
/**
 * 대부분의 프로그래밍 언어는 if, while, switch case 등과 같이 Top Down의 순차적 구조를 벗어날 수 있는
 * 제어 구조(control structure)를 제공한다.
 *
 * 컴파일러는 이러한 제어 흐름 분석을 통해 특정 값의 타입을 좁힐 수 있다.
 */

/* undefined / null과의 비교 */
interface Animal {
  ownerName: string | null;
}

function getOwnerName(animal: Animal): string {
  // undefined 또는 null을 체크하는 타입 가드.
  if (animal.ownerName === null) {
    return "wildness";
  } else {
    // animal.ownerName 타입은 string임을 보장.
    return animal.ownerName;
  }
}

/* 리터럴 타입과의 비교 */
interface TeamLeader {
  type: "leader";
  leadingSince: Date;
}

interface Newcomer {
  type: "newcomer";
  major: string;
}

type Employee = TeamLeader | Newcomer;

function doSomething(employee: Employee) {
  // switch case를 통해 employee의 타입을 좁히고 있다.
  switch (employee.type) {
    case "leader": {
      // employee는 TeamLeader 타입
      return employee.leadingSince;
    }
    case "newcomer": {
      // employee는 Newcomer 타입
      return employee.major;
    }
    default: {
      // employee는 never 타입
      return null;
    }
  }
}

/* typeof 연산자 */
// 해당 값이 가지는 타입을 문자열로 반환.
/**
 * undefined -> 'undefined', null -> 'object', array -> 'object'등 호환성 이슈로 정확하지 않으므로,
 * 원시 타입위주로 사용 필요.
 */
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }

  if (typeof padding === "string") {
    return padding + value;
  }

  throw new Error(`Expected string or number, got '${padding}'.`);
}

/* instanceof 연산자 */
/**
 * 프로토타입 체인을 통해 해당 생성자가 등장하는 지 확인할 수 있다.
 */
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

// 이 시점에선 'SpaceRepeatingPadder | StringPadder'
let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder; // SpaceRepeatingPadder 로 좁혀짐
}

if (padder instanceof StringPadder) {
  padder; // StringPadder 로 좁혀짐
}

/* in 연산자 */
/**
 * 객체에 특정 속성이 존재하는 지 확인할 수 있다.
 */
interface Dog {
  legs: 4;
  bark(): void;
}

interface Insect {
  legs: number;
  creepy: boolean;
}

interface Fish {
  swim(): void;
}

type Animal2 = Dog | Insect | Fish;

function doSomethingWithAnimal(animal: Animal2) {
  if ("legs" in animal) {
    // animal은 Dog | Insect 타입
    console.log(animal.legs);
  } else {
    // animal은 Fish 타입
    animal.swim();
  }
}

/* 사용자 정의 타입 가드 */
/**
 * 타입을 좁히기 위한 별도의 함수로 value is Type의 형태로 반환 타입을 갖는다.
 * Typescript 초반에는 많이 사용했지만, 현재는 내장 타입 가드만으로 충분히 해결 가능.
 */

// 사용자 정의 타입 가드.
function isFish(animal: Animal2): animal is Fish {
  if ("legs" in animal) {
    return false;
  }
  return true;
}

function doSomethingWithAnimal2(animal: Animal2) {
  if (isFish(animal)) {
    // animal은 Fish 타입
    animal.swim();
  } else {
    // animal은 Dog | Insect 타입
    console.log(animal.legs);
  }
}
