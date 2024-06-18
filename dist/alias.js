/* Types alias */
/**
 * type [alias] = [type]
 * Alias인 이유는 실제로 Type이 생성되는 것이 아니라 진짜 별칭으로써만 기능.
 * => SementicType 관련 타입 에러가 발생하면 string이라고 표시된다.
 */
// const sementic: SementicType = 20; // 불가.
const sementic = "이건 되지롱";
const seungjong = { name: "seungjong", height: 180 };
seungjong.age = 30;
