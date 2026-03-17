# ex02: Props 타입 정의 — UserCard

## 목표

optional props(`?`)와 default 값 처리를 익힌다.
`interface`와 `type alias`의 차이를 이해하고, 언제 어떤 것을 쓸지 판단할 수 있게 된다.

---

## 구현할 것

사용자 정보를 보여주는 `UserCard` 컴포넌트를 만든다.

**결과 화면 예시 (모든 props 전달 시):**
```
[홍길동] (관리자)
나이: 28세
이메일: hong@example.com
자기소개: 안녕하세요!
```

**결과 화면 예시 (필수 props만 전달 시):**
```
[이순신]
나이: 정보 없음
이메일: lee@example.com
```

---

## 요구사항

- [ ] `src/components/ex02/UserCard.tsx` 파일에 컴포넌트 작성
- [ ] 아래 props를 받는다:
  - `name: string` — 필수
  - `email: string` — 필수
  - `age?: number` — 선택 (없으면 "정보 없음" 출력)
  - `isAdmin?: boolean` — 선택 (true면 이름 옆에 "(관리자)" 표시)
  - `bio?: string` — 선택 (있을 때만 렌더링)
- [ ] Props 타입을 `type alias`로 정의한다 (`interface` 대신)
- [ ] 반환 타입을 명시한다
- [ ] `App.tsx`에서 두 가지 케이스로 렌더링한다:
  - 모든 props를 전달하는 UserCard 1개
  - 필수 props만 전달하는 UserCard 1개

---

## 제약 조건

- `any` 타입 사용 금지
- optional props를 렌더링할 때 타입 에러 없이 처리할 것
- `age`가 `undefined`일 때 "정보 없음" 출력을 **삼항 연산자**로 처리할 것
- `bio`가 있을 때만 렌더링하는 것을 **`&&` 연산자**로 처리할 것

---

## 힌트 (막힐 때만 참고)

<details>
<summary>힌트 보기</summary>

- `type alias` 문법: `type UserCardProps = { name: string; ... }`
- optional prop은 `undefined`일 수 있다: `age !== undefined ? age : "정보 없음"`
- `&&` 렌더링: `{bio && <p>{bio}</p>}`
- `isAdmin`이 `true`일 때만 "(관리자)" 텍스트를 표시하려면?

</details>

---

## 참고 자료

- [TypeScript - type alias vs interface](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)
- [React - 조건부 렌더링](https://react.dev/learn/conditional-rendering)

---

## 완료 기준

- [ ] 브라우저에서 두 가지 UserCard가 다르게 렌더링된다
- [ ] `npx tsc --noEmit` 에러 없음
- [ ] optional props를 `undefined` 체크 없이 그냥 렌더링하면 TypeScript 에러가 뜨는지 확인해봤다

완료되면 `feat(ex02): UserCard 컴포넌트 구현` 으로 커밋하고 리뷰를 요청하세요.
