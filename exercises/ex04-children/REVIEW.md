# ex04 코드 리뷰

## 전체 평가

요구사항을 모두 충족했고 TypeScript 타입도 정확하게 사용했습니다.
`React.ReactNode`, `interface`, 반환 타입 명시, `&&` 패턴 — 핵심 개념을 잘 적용했습니다.
두 가지 필수 개선 사항을 반영하면 더욱 깔끔한 코드가 됩니다.

---

## 잘 된 점

- `children: React.ReactNode` 타입을 정확히 사용 (`JSX.Element`로 좁히지 않음)
- `interface ModalProps`로 Props 타입을 명확히 분리
- 반환 타입 `React.JSX.Element` 명시
- `{isOpen && <div>...</div>}` 패턴으로 닫힌 상태에서 DOM에서 완전히 제거
- 두 Modal이 각각 독립적인 상태를 가짐 (Counter를 children으로 넣은 시도 좋았음)

---

## 개선 사항

### [필수] 동일한 버튼이 두 번 조건부 렌더링됨

**현재 코드:**
```tsx
{!isOpen && (
  <button onClick={(_e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(true)}>
    열기
  </button>
)}
{isOpen && (
  <button onClick={(_e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(false)}>
    닫기
  </button>
)}
```

**문제점:**
`!isOpen`과 `isOpen`은 서로 반대 조건이므로, 항상 둘 중 하나만 렌더링됩니다.
이 두 블록은 사실 하나의 버튼이 상태에 따라 텍스트와 동작만 바뀌는 것입니다.
코드가 불필요하게 두 배로 늘어나고, 나중에 버튼 스타일을 수정하면 두 곳을 모두 바꿔야 합니다.

**방향 힌트:**
삼항 연산자(`? :`)로 하나의 버튼으로 통합해보세요.
더 나아가, `setIsOpen(true)` / `setIsOpen(false)` 를 `setIsOpen(!isOpen)` 하나로 합칠 수 있습니다.

---

### [필수] 사용하지 않는 이벤트 매개변수 선언

**현재 코드:**
```tsx
onClick={(_e: React.MouseEvent<HTMLButtonElement>) => setIsOpen(true)}
```

**문제점:**
`_e`를 선언했지만 함수 본문에서 전혀 사용하지 않습니다.
`_`(언더스코어) 접두사는 "의도적으로 사용하지 않음"을 나타내는 컨벤션이지만,
애초에 필요 없는 매개변수라면 선언 자체를 생략하는 것이 더 명확합니다.
타입을 명시할 이유가 없을 때 불필요한 타입 노이즈가 생깁니다.

**방향 힌트:**
이벤트 객체가 필요 없을 때는 매개변수를 아예 제거하세요.
`onClick={() => setIsOpen(true)}` — 이것으로 충분합니다.

---

### [선택] CSS 클래스명과 컴포넌트명 불일치

**현재 코드:** `notice-box`, `notice-header`, `notice-title`, `notice-toggle-btn`, `notice-content`

**문제점:**
컴포넌트 이름은 `Modal`인데 CSS 클래스명은 `notice-*` 계열입니다.
나중에 코드를 볼 때 이 CSS가 어느 컴포넌트와 연결된 것인지 바로 파악하기 어렵습니다.

**방향 힌트:**
`modal-box`, `modal-header` 등 컴포넌트명과 일치하는 네이밍을 고려해보세요.
(이번 리팩터링에 포함하지 않아도 됩니다)

---

### [심화] `PropsWithChildren<T>` 헬퍼 타입

EXERCISE.md에서 언급된 `PropsWithChildren<T>` — React가 제공하는 유틸리티 타입입니다.

```tsx
// 현재 방식 (직접 정의)
interface ModalProps {
  title: string;
  children: React.ReactNode;
}

// PropsWithChildren 활용
import { PropsWithChildren } from "react";
type ModalProps = PropsWithChildren<{ title: string }>;
```

두 방식 모두 정확히 동일하게 동작합니다.
`PropsWithChildren`은 `children`이 반드시 포함된다는 의도를 명시적으로 드러낼 때 유용하지만,
직접 정의하는 현재 방식도 충분히 좋습니다. 취향 차이입니다.

---

## TypeScript 포인트

| 항목 | 현재 | 권장 |
|------|------|------|
| children 타입 | `React.ReactNode` ✓ | — |
| 반환 타입 | `React.JSX.Element` ✓ | — |
| 이벤트 타입 | `_e: React.MouseEvent<...>` 불필요 | 매개변수 제거 |
| state 타입 | `useState<boolean>(false)` | `useState(false)` 로도 추론 가능 (선택) |

> `useState(false)` 처럼 초기값에서 타입이 명확히 추론되는 경우,
> `<boolean>` 제네릭을 생략해도 TypeScript가 자동으로 `boolean`으로 추론합니다.
> 명시적으로 쓰는 것도 틀리지 않으니 [선택] 사항입니다.
