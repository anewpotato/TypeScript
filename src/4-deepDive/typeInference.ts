/* 타입 추론. */
/**
 * Typescript의 컴파일러는 명시적인 타입 표기가 없어도 이해 가능.
 */

// 명시적인 타입 표기.
let u: number = 3;

// 명시하지 않아도 number type으로 추론.
let z = 3;

// const 변수는 좀 더 구체적으로 추론하여, 3 type으로 추론.
const q = 3;
// 1|3과 같은 타입은 추론할 수 없으므로 반드시 명시.
const oneOrThree: 1 | 3 = 3;

/* 최적의 공통 타입 */
interface Animal6 {
  legs: number;
}

interface Dog3 extends Animal6 {
  bark(): void;
}

interface Cat extends Animal6 {
  meow(): void;
}
interface Camel extends Animal {
  humps: number;
}

let dog2: Dog3 = {
  legs: 4,
  bark() {},
};
let cat: Cat = {
  legs: 4,
  meow() {},
};

function getSoundFunction(dogOrCat: Dog3 | Cat) {
  if ("meow" in dogOrCat) {
    return dogOrCat.meow;
  } else {
    return dogOrCat.bark;
  }
}
// typescript는 이걸 Array<Anibal6>이 아니라 Animal<Dog3 | Cat> 타입으로 추론.
const dogAndCat = [dog2, cat]; // ??.
dogAndCat.map((dogOrCat) => getSoundFunction(dogOrCat));

/* 문맥 상의 타입 */
/**
 * 타입 추론은 할당 받는 값 뿐만 아니라 할당하는 값의 타입에 대해서도 발생하는데, 이를 문맥상 타입(contextual type)이라 한다.
 */
interface MouseEvent {
  /* ... */
  /* button 속성 없음! */
}

interface Window {
  /* ... */
  onmousedown: (event: MouseEvent) => void;
}

// 우변의 함수가 (event: MouseEvent) => void 타입일 것이라 추론.
window.onmousedown = function (mouseEvent) {
  console.log(mouseEvent.a);
};

// 타입 표기가 주어지면, 문맥상 타입은 무시된다.
window.onmousedown = function (mouseEvent: any) {
  console.log(mouseEvent.a);
};
