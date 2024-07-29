/* 타입 단언 */

/**
 * 타입 단언을 통해 컴파일러에게 특정 타입 정보의 사용을 강제할 수 있다.
 * 컴파일 에러를 없애줄 뿐 런타임 에러는 발생할 수 있다.
 */

interface Dog7 {
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

type Animal8 = Dog | Insect | Fish;

function doSomethingWithAnimal3(animal: Animal8) {
  (animal as Fish).swim(); // 타입 단언을 통해 Finsh type임을 알림. (Dog, Insect 타입 값이 들어오면 런타임 에러 발생!!)
}

/* any 타입 단언 */
/**
 * 타입 검사를 완전히 무효화할 수 있지만, 런타임 에러 발생 가능. (사용하지 말자.)
 */
(3 as any).substr(0, 3);

/* 다중 단언 */
const dog3: Dog7 = {
  legs: 4,
  bark() {
    console.log("bark");
  },
};
// const insect: Insect = dog7 as Insect; dog7 type에는 creepy 속성이 없기에 단언할 수 없다.
const insect2: Insect = dog as any as Insect; // any type 단언 이후, Inspect 단언을 사용하면 통과.
