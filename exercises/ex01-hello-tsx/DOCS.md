# ex01 개념 정리: 함수형 컴포넌트와 TSX

> 작성일: 2026-03-17
> 관련 exercise: ex01

---

## 핵심 개념 한 줄 요약

TSX 파일에서 함수형 컴포넌트는 **"Props 타입을 받아 JSX를 반환하는 함수"** 다.

---

## JSX vs TSX — 왜 확장자가 다른가?

`.tsx`는 TypeScript + JSX를 함께 쓴다는 선언이다.

TypeScript에서 `<>` 꺽쇠는 **제네릭 문법**이기도 하다:
```ts
const value = <string>"hello"; // 타입 단언 (구버전 방식)
```

이 문법이 JSX의 `<div>` 와 충돌하기 때문에, 컴파일러에게 "이 파일에는 JSX가 있다"고 명시하는 것이 `.tsx` 확장자다.
`tsconfig.json`의 `"jsx": "react-jsx"` 설정이 이것을 처리한다.

---

## interface로 Props 타입 정의하기

```tsx
// Props 타입: 컴포넌트 바로 위에 선언하는 것이 관례
interface HelloWorldProps {
  name: string;
  message: string;
}

const HelloWorld = ({ name, message }: HelloWorldProps): React.JSX.Element => {
  return (
    <div>
      안녕하세요, {name}님!
      <br />
      {message}
    </div>
  );
};
```

**왜 inline으로 쓰지 않는가?**
```tsx
// 이렇게도 동작하지만 권장하지 않음
const HelloWorld = ({ name, message }: { name: string; message: string }) => { ... }
```
Props 타입이 길어질수록 함수 시그니처가 읽기 어려워진다. `interface`로 분리하면 타입 자체도 재사용 가능하다.

---

## 반환 타입: JSX.Element vs React.JSX.Element

| 표현 | 설명 |
|------|------|
| `JSX.Element` | 전역 `JSX` 네임스페이스 — React 18 이전 방식 |
| `React.JSX.Element` | `React` 네임스페이스 내부의 타입 — React 18+ 권장 |

둘 다 동작하지만, React 18부터는 `React.JSX.Element`가 더 명확하다.
`import React` 없이도 쓸 수 있는 이유: `@types/react`가 `React` 네임스페이스를 **전역**으로 선언하기 때문이다.

---

## React.FC를 쓰지 않는 이유

과거에는 `React.FC<Props>` 패턴이 일반적이었다:
```tsx
// 구버전 방식 — 지금은 권장하지 않음
const HelloWorld: React.FC<HelloWorldProps> = ({ name, message }) => { ... };
```

**`React.FC`의 문제점:**
- React 18 이전에는 `children`을 암묵적으로 포함해서 타입 안전성을 해쳤다
- 반환 타입이 `ReactElement | null`로 고정되어 유연성이 떨어진다
- 일반 함수로 쓰는 것이 더 명확하고 TypeScript 친화적이다

---

## import React가 필요 없어진 이유

React 17 이전: JSX는 `React.createElement(...)` 호출로 변환됐다. 그래서 `import React`가 필수였다.

```tsx
// 컴파일 전 (React 16 이하)
const el = <div>hello</div>;

// 컴파일 후
const el = React.createElement("div", null, "hello"); // React가 스코프에 있어야 함
```

React 17+: 새 JSX 변환(`react/jsx-runtime`)이 도입되어 컴파일러가 자동으로 처리한다.
```tsx
// 컴파일 후 (React 17+)
import { jsx as _jsx } from "react/jsx-runtime"; // 자동 삽입
const el = _jsx("div", { children: "hello" });
```

Vite의 기본 설정은 이미 새 변환을 사용한다 → `import React` 불필요.

---

## 이번 exercise에서 배운 것

- `interface`로 Props 타입 분리 → 컴포넌트 시그니처가 깔끔해짐
- 반환 타입 `: React.JSX.Element` 명시 → 함수만 봐도 무엇을 반환하는지 명확
- `import React` 제거 → 현대 React 개발 방식 체험

---

## 자주 하는 실수

```tsx
// 실수 1: import React를 남겨두는 경우
import React from "react"; // 불필요 (noUnusedLocals 설정 시 에러)

// 실수 2: 반환 타입을 생략하는 경우
const MyComp = ({ name }: Props) => { // 추론은 되지만 명시하는 것이 권장
  return <div>{name}</div>;
};

// 실수 3: Props 타입을 인라인으로 쓰는 경우
const MyComp = ({ name }: { name: string }) => { // 짧을 때는 가능하나 interface 분리가 권장
  return <div>{name}</div>;
};
```

---

## 요약 (Quick Reference)

| 상황 | 사용법 |
|------|--------|
| Props 타입 정의 | `interface XxxProps { ... }` — 컴포넌트 위에 선언 |
| 반환 타입 명시 | `(): React.JSX.Element =>` |
| React import | React 17+ Vite 환경에서는 불필요 |
| React.FC | 사용하지 않음 — 일반 함수로 작성 |
