# ex02 개념 정리: optional props와 조건부 렌더링

> 작성일: 2026-03-17
> 관련 exercise: ex02

---

## 핵심 개념 한 줄 요약

`?`로 선언한 optional prop은 `T | undefined` 타입이며, 사용 시 반드시 `undefined` 가능성을 처리해야 한다.

---

## type alias vs interface

두 가지 모두 Props 타입 정의에 쓸 수 있고, 대부분의 경우 교환 가능하다.

```tsx
// interface
interface UserCardProps {
  name: string;
  age?: number;
}

// type alias
type UserCardProps = {
  name: string;
  age?: number;
};
```

**실질적인 차이:**

| | interface | type alias |
|---|---|---|
| 확장 | `extends` 키워드 | `&` 교차 타입 |
| 선언 병합 | 가능 (같은 이름으로 재선언 시 병합) | 불가 |
| 원시 타입 별칭 | 불가 | 가능 (`type ID = string`) |
| 유니온 타입 | 불가 | 가능 (`type Status = "on" \| "off"`) |

**React Props에서의 권장:**
- 단순한 객체 형태 Props → `interface`와 `type` 모두 괜찮다
- 유니온이 필요할 때 (`type Status = "loading" | "success" | "error"`) → `type`만 가능
- 공식 React TypeScript Cheatsheet는 `interface` 우선을 권장하지만, 팀 컨벤션이 우선이다

---

## optional props: `?` 의 실체

```tsx
type Props = {
  age?: number;   // 실제 타입: number | undefined
};
```

`age?: number`는 `age: number | undefined`와 완전히 동일하다.
TypeScript는 이 값을 바로 사용하는 것을 막는다:

```tsx
// 에러: Object is possibly 'undefined'
<p>나이: {age}세</p>

// 올바른 처리
<p>나이: {age !== undefined ? `${age}세` : "정보 없음"}</p>
```

---

## falsy 체크 vs undefined 체크

optional `number`를 처리할 때 가장 자주 하는 실수:

```tsx
// 위험: age가 0이면 "정보 없음" 출력
{age ? `${age}세` : "정보 없음"}

// 안전: undefined인지만 체크
{age !== undefined ? `${age}세` : "정보 없음"}

// 실용적: null과 undefined 모두 걸러냄 (loose equality)
{age != null ? `${age}세` : "정보 없음"}
```

`!= null`(느슨한 비교)은 `null`과 `undefined` 둘 다 `false`로 처리한다.
TypeScript strict 모드에서도 유효하며, 실무에서 자주 쓰이는 패턴이다.

**규칙:** optional `string`은 `&&`로, optional `number`는 `!== undefined` 또는 `!= null`로.

---

## 조건부 렌더링 두 가지 패턴

### `&&` 패턴 — "있을 때만 보여준다"

```tsx
{bio && <p>자기소개: {bio}</p>}
```

- `bio`가 truthy면 `<p>` 렌더링
- `bio`가 `undefined`이면 아무것도 렌더링하지 않음

**주의:** 숫자 `0`에는 `&&`를 쓰면 안 된다.

```tsx
// 위험: count가 0이면 "0"이 화면에 출력됨
{count && <p>{count}개</p>}

// 안전: boolean으로 명확히 변환
{count > 0 && <p>{count}개</p>}
```

### 삼항 연산자 — "둘 중 하나를 보여준다"

```tsx
{age !== undefined ? <p>{age}세</p> : <p>정보 없음</p>}
```

두 가지 상태를 모두 렌더링해야 할 때 사용한다.

---

## 이번 exercise에서 배운 것

- `age != undefined`(또는 `!= null`)로 falsy 함정 없이 optional number 처리
- `{bio && <p>...</p>}` 패턴으로 "없으면 아무것도 렌더링하지 않기"
- `isAdmin && " (관리자)"` — 문자열도 `&&`로 조건부 렌더링 가능

---

## 자주 하는 실수

```tsx
// 실수 1: optional number에 falsy 체크
{age ? `${age}세` : "정보 없음"}  // age=0 → "정보 없음" 버그

// 실수 2: &&에 숫자 사용
{count && <span>{count}</span>}   // count=0 → "0" 출력 버그

// 실수 3: optional string을 undefined 체크로 처리
{bio !== undefined && <p>{bio}</p>}  // 가능하지만 {bio && ...}으로 충분
```

---

## 요약 (Quick Reference)

| 상황 | 패턴 |
|------|------|
| optional string — 있을 때만 렌더링 | `{str && <p>{str}</p>}` |
| optional number — undefined 체크 | `{num !== undefined ? num : "없음"}` |
| optional boolean — 있을 때만 표시 | `{flag && "텍스트"}` |
| 두 상태 중 하나 렌더링 | `{cond ? <A /> : <B />}` |
| null/undefined 동시 체크 | `{val != null ? val : "없음"}` |
