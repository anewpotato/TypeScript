/* 클래스의 호환성 */
/* 객체 호환성과 비슷하지만, static 멤버와 생성자는 영향을 주지 않는다. */

// 두 클래스의 생성자 매개 변수가 다르지만, 할당 가능.
class Animal5 {
  feet: number;
  constructor(name: string, numFeet: number) {}
}

class Size {
  feet: number;
  constructor(numFeet: number) {}
}

let a: Animal5;
let s: Size = new Size(5);
a = s; // ok
s = a; // ok

// private 및 protected 를 멤버 접근제어자로 가지고 있는 클래스들은 이름과 타입이 호환되더라도 서로 클래스가 다르기 때문에 할당 불가능.
class FacebookUser {
  constructor(id: string, private password: string) {}
}

class TwitterUser {
  constructor(id: string, private password: string) {}
}

let twitterUser: TwitterUser;
let facebookUser: FacebookUser = new FacebookUser("aa", "ss");
//   twitterUser = facebookUser;
