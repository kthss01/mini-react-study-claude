# ex02 코드 리뷰

## 전체 평가

`type alias` 사용, 반환 타입 명시, 두 케이스 렌더링 모두 잘 됐다.
두 가지를 수정해야 한다: `age` falsy 체크 버그, `bio` 처리 방식.

---

## 잘 된 점

- `type alias` 문법을 정확하게 사용했다
- ex01 피드백을 반영해 반환 타입 `React.JSX.Element` 를 처음부터 명시했다
- 두 가지 케이스(모든 props / 필수만)를 모두 렌더링했다

---

## 개선 사항

### [필수] `age` 체크에 falsy 판별을 사용하고 있다

**현재 코드:**
```tsx
나이: {age ? `${age}세` : "정보 없음"}
```

**문제점:**
`age`가 `0`이면 `age ?`는 `false`로 평가된다. 즉 `age={0}`을 전달하면 "정보 없음"이 출력된다.
사람 나이에 0은 없지만, TypeScript에서 `number | undefined`를 다루는 올바른 패턴을 익혀두는 것이 중요하다.
나중에 `price`, `count`, `index` 같은 실제로 0이 의미 있는 숫자 props에서 이 실수가 버그로 이어진다.

**방향 힌트:**
"값이 있는지"가 아니라 "undefined인지 아닌지"를 체크하는 비교 연산자를 쓰면 된다.

---

### [필수] `bio` 처리에 `&&` 대신 삼항 연산자를 사용했다

**현재 코드:**
```tsx
{bio ? `자기소개: ${bio}` : ""}
```

**문제점 1 — exercise 요구사항:**
EXERCISE.md에서 `bio`가 있을 때만 렌더링하는 것을 `&&` 연산자로 처리하도록 명시했다.

**문제점 2 — 빈 문자열 `""` 을 반환하는 것의 차이:**
`bio`가 없을 때 `""` 을 반환하면 React는 DOM에 빈 텍스트 노드를 생성한다.
`&&` 패턴은 조건이 `false`이면 아무것도 렌더링하지 않아 더 명확하다.

```tsx
// 삼항: bio가 없어도 "" 이라는 텍스트 노드가 DOM에 존재
{bio ? `자기소개: ${bio}` : ""}

// &&: bio가 없으면 아무것도 없음
{bio && <p>자기소개: {bio}</p>}
```

**방향 힌트:**
`&&` 연산자는 왼쪽이 truthy면 오른쪽을 반환한다. `isAdmin` 처리에도 같은 패턴을 적용해보자.

---

### [선택] `isAdmin`도 `&&` 패턴이 더 적합하다

**현재 코드:**
```tsx
[{name}] {isAdmin ? "(관리자)" : ""}
```

`bio`와 같은 이유로 `isAdmin`도 없을 때 아무것도 렌더링하지 않는 것이 더 깔끔하다.

**방향 힌트:**
`{isAdmin && " (관리자)"}` 형태로 바꾸면 `isAdmin`이 `false`이거나 `undefined`일 때 아무것도 출력되지 않는다.

---

### [심화] named export vs default export

현재 `export const UserCard`(named export)를 사용하고 있고, ex01은 `export default`를 사용했다.
둘 다 틀리지 않았지만 차이가 있다:

| | named export | default export |
|---|---|---|
| import 방식 | `import { UserCard } from "..."` | `import UserCard from "..."` |
| 이름 변경 | import 시 `as`로만 가능 | import 시 자유롭게 가능 |
| 파일당 개수 | 여러 개 가능 | 하나만 가능 |

컴포넌트 파일은 보통 `default export` 하나를 내보내는 패턴이 일반적이지만, 팀/프로젝트마다 다르다. 어느 쪽을 쓸지 일관성이 중요하다.

---

## TypeScript 포인트

- `optional number`는 `value !== undefined`로 체크 — `value ?`는 0, NaN도 falsy로 처리
- `&&` 렌더링 패턴: 조건이 falsy면 아무것도 렌더링하지 않음 (`null`과 동일한 효과)
- `boolean | undefined` 타입의 값에 `&&`를 쓸 때 주의: `0 && <X/>`는 `0`을 렌더링한다 — boolean으로 명확히 좁힌 뒤 사용

---

## 다음 exercise 예고

다음 ex03에서는 **`useState` 와 이벤트 타입**을 다룬다.
`React.ChangeEvent<HTMLInputElement>` 같은 이벤트 타입을 직접 다루면서
TypeScript가 DOM 이벤트를 어떻게 타입화하는지 경험하게 된다.
