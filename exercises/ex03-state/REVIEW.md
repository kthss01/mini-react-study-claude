# ex03 코드 리뷰

## 전체 평가

`useState<number>`, `React.MouseEvent<HTMLButtonElement>`, `React.ChangeEvent<HTMLInputElement>` 타입 명시가 모두 정확하다. CSS까지 작성한 것도 좋다.
두 가지 수정이 필요하다: 반환 타입 미명시, NaN 처리 누락.

---

## 잘 된 점

- `useState<number>(0)` — 타입 파라미터를 명시했다
- 버튼과 input 모두 이벤트 타입을 정확히 명시했다
- `{ step = 1 }` 기본값 처리가 깔끔하다
- 0 미만 방지 로직 `count - step < 0 ? 0 : count - step` 이 동작한다

---

## 개선 사항

### [필수] 반환 타입이 명시되지 않았다

ex01, ex02에서 이어온 규칙이다.

**현재 코드:**
```tsx
const Counter = ({ step = 1 }: CounterProps) => {
```

**방향 힌트:**
파라미터 괄호 뒤, `=>` 앞에 `: React.JSX.Element`를 붙이면 된다.

---

### [필수] input에서 NaN 처리가 없다

**현재 코드:**
```tsx
onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
    setCount(e.target.valueAsNumber)
}
```

**문제점:**
`type="number"` input에서 값을 지우거나 `-`만 입력하면 `valueAsNumber`는 `NaN`을 반환한다.
`setCount(NaN)` 이 실행되면 count가 `NaN`이 되어 화면에 아무것도 표시되지 않는 조용한 버그가 생긴다.

직접 확인: input 값을 전부 지워보면 카운터가 사라질 것이다.

**방향 힌트:**
값을 변환한 뒤 `isNaN()`으로 체크하고, NaN이면 `setCount`를 호출하지 않으면 된다.
exercise에서 `Number()` + `isNaN()` 패턴을 명시한 이유가 여기에 있다.

---

### [선택] 버튼 핸들러의 `e` 파라미터가 사용되지 않는다

**현재 코드:**
```tsx
onClick={(e: React.MouseEvent<HTMLButtonElement>) => setCount(0)}
```

`e`를 선언했지만 핸들러 내부에서 사용하지 않는다.
`noUnusedParameters: true` tsconfig 설정 시 TypeScript 에러가 된다.

**방향 힌트 두 가지:**
1. 버튼 클릭에서는 이벤트 객체가 필요 없으므로 파라미터 자체를 제거
2. 타입 명시 연습이 목적이라면 미사용 파라미터 관례인 `_e`로 이름 변경

---

### [심화] 함수형 업데이트 패턴

**현재 코드:**
```tsx
setCount(count + step)
setCount(count - step < 0 ? 0 : count - step)
```

현재 코드는 클로저로 캡처된 `count`를 사용한다.
대부분의 경우 동작하지만, 짧은 시간에 여러 번 상태 업데이트가 발생하면 stale한 값을 참조할 수 있다.

```tsx
// 함수형 업데이트: 항상 최신 상태값을 받아 업데이트
setCount(prev => prev + step)
setCount(prev => Math.max(0, prev - step))
```

`Math.max(0, prev - step)` 패턴은 "0 미만이 되지 않도록" 처리를 한 줄로 표현한다.
이 exercise에서 바로 적용하지 않아도 되지만, 알아두면 좋은 패턴이다.

---

## TypeScript 포인트

- `useState<T>` — 초기값에서 추론 가능하지만, 명시하면 `null` 포함 여부 등을 명확히 표현 가능
- `React.MouseEvent<T>` — `T`는 이벤트가 발생한 DOM 요소 타입 (`HTMLButtonElement`, `HTMLDivElement` 등)
- `React.ChangeEvent<T>` — `e.target`의 타입이 `T`로 좁혀져 `valueAsNumber`, `checked` 등 요소별 프로퍼티에 접근 가능
- 미사용 파라미터: `_` 접두사 관례 (`_e`) — "의도적으로 사용하지 않음"을 명시

---

## 다음 exercise 예고

다음 ex04에서는 **Children props**를 다룬다.
`React.ReactNode` 타입과 컴포넌트 합성(composition) 패턴을 통해,
어떤 내용이든 담을 수 있는 재사용 가능한 레이아웃 컴포넌트를 만든다.
