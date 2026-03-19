# ex04 개념 정리: Children Props와 컴포넌트 합성

## 핵심 개념 한 줄 요약

`children`은 컴포넌트 태그 사이에 넣은 JSX를 그대로 전달받는 특별한 prop이다.

---

## 왜 이게 필요한가?

JavaScript 함수는 어떤 값이든 인자로 받을 수 있습니다.
React 컴포넌트도 마찬가지로, **JSX 자체를 prop으로 전달**할 수 있어야
재사용 가능한 레이아웃 컴포넌트를 만들 수 있습니다.

```tsx
// children 없이 — Modal이 내부 내용을 직접 결정
<Modal title="공지사항" content="안녕하세요!" />  // 문자열만 가능

// children 있음 — 어떤 JSX든 안에 넣을 수 있음
<Modal title="공지사항">
  <p>안녕하세요!</p>
  <button>확인</button>  // 복잡한 JSX도 OK
</Modal>
```

---

## 개념 설명

### 1. `React.ReactNode` — children의 타입

`children`에 들어올 수 있는 모든 것을 허용하는 타입입니다.

```tsx
type ReactNode =
  | ReactElement    // <p>...</p> 같은 JSX
  | string          // "안녕하세요"
  | number          // {42}
  | boolean         // {true} (렌더링 안 됨)
  | null            // {null} (렌더링 안 됨)
  | undefined       // (렌더링 안 됨)
  | ReactNode[]     // 여러 요소 배열
```

`JSX.Element`는 JSX만 허용하므로 너무 좁습니다.
`children`에는 항상 `React.ReactNode`를 사용하세요.

### 2. interface에 children 직접 선언

```tsx
interface ModalProps {
  title: string;
  children: React.ReactNode;  // 명시적으로 선언
}
```

### 3. `PropsWithChildren<T>` 헬퍼 타입 (대안)

React가 제공하는 유틸리티 타입으로 `children: React.ReactNode`를 자동으로 포함시킵니다.

```tsx
import { PropsWithChildren } from "react";

type ModalProps = PropsWithChildren<{ title: string }>;
// 결과: { title: string; children?: React.ReactNode }
```

두 방식은 동일하게 동작합니다. 직접 선언하는 방식이 더 명시적이고,
`PropsWithChildren`은 children이 핵심임을 강조할 때 유용합니다.

### 4. 조건부 렌더링 — `&&` 패턴

```tsx
{isOpen && <div className="modal-content">{children}</div>}
```

`false`일 때 DOM에서 **완전히 제거**됩니다.
닫힌 Modal의 children은 마운트되지 않으므로, 그 안의 상태(Counter 등)도 초기화됩니다.

### 5. 삼항 연산자로 토글 버튼 구현

```tsx
// 안티패턴 — 같은 버튼을 두 번 조건부 렌더링
{!isOpen && <button onClick={() => setIsOpen(true)}>열기</button>}
{isOpen && <button onClick={() => setIsOpen(false)}>닫기</button>}

// 권장 패턴 — 하나의 버튼으로 통합
<button onClick={() => setIsOpen(!isOpen)}>
  {isOpen ? "닫기" : "열기"}
</button>
```

JSX에서 삼항 연산자는 반드시 `{}` 안에 위치해야 JS 표현식으로 평가됩니다.

---

## 이번 exercise에서 배운 것

- `children: React.ReactNode`로 어떤 JSX든 수용하는 컴포넌트 설계
- 레이아웃 컴포넌트(Modal, Card, Panel)가 내용을 모르면서도 감쌀 수 있는 합성 패턴
- `&&` 조건부 렌더링으로 DOM에서 완전 제거 vs 숨기기의 차이
- 삼항 연산자가 JSX `{}` 안에 있어야 하는 이유

---

## 자주 하는 실수

| 실수 | 원인 | 해결 |
|------|------|------|
| `children: JSX.Element` | 타입을 너무 좁게 정의 | `React.ReactNode` 사용 |
| `({isOpen} ? 닫기 : 열기)` | `{}` 밖에서 삼항 연산자 작성 | `{isOpen ? "닫기" : "열기"}` |
| 중복 조건부 버튼 | `!isOpen &&` + `isOpen &&` 각각 작성 | 삼항 연산자로 통합 |
| 사용 안 하는 `_e: React.MouseEvent` 선언 | 불필요한 타입 노이즈 | 매개변수 자체를 제거 |

---

## 요약 (Quick Reference)

| 상황 | 사용법 |
|------|--------|
| children 타입 정의 | `children: React.ReactNode` |
| children 헬퍼 타입 | `PropsWithChildren<{ title: string }>` |
| children 렌더링 | `<div>{children}</div>` |
| 조건부로 숨기기 (DOM 제거) | `{isOpen && <div>{children}</div>}` |
| 토글 버튼 텍스트 | `{isOpen ? "닫기" : "열기"}` |
| boolean 토글 | `setIsOpen(!isOpen)` |
