# ex03 개념 정리: useState와 이벤트 타입

> 작성일: 2026-03-17
> 관련 exercise: ex03

---

## 핵심 개념 한 줄 요약

`useState<T>`는 상태 타입을 고정하고, 이벤트 타입 `React.XxxEvent<HTMLElement>`는 "어느 요소에서 발생했는지"까지 타입으로 표현한다.

---

## useState 제네릭

```tsx
const [count, setCount] = useState<number>(0);
```

`useState`는 제네릭 함수다. `<number>`를 명시하면:
- `count`의 타입이 `number`로 고정된다
- `setCount`는 `number` 또는 `(prev: number) => number`만 받는다

**타입 추론도 가능하다:**
```tsx
const [count, setCount] = useState(0); // 초기값 0으로 number 추론
```

그러나 초기값이 `null`이거나 나중에 다른 타입이 올 수 있을 때는 명시가 필요하다:
```tsx
const [user, setUser] = useState<User | null>(null); // 추론만으로는 불가
```

---

## React 이벤트 타입

### MouseEvent

```tsx
onClick={(_e: React.MouseEvent<HTMLButtonElement>) => {
  setCount(0);
}}
```

`React.MouseEvent<T>` — `T`는 이벤트가 발생한 DOM 요소 타입.
버튼 클릭처럼 이벤트 객체를 사용하지 않을 때는 파라미터를 생략하거나 `_e`를 쓴다.

```tsx
// 이벤트 객체 불필요 → 파라미터 생략 가능
onClick={() => setCount(0)}

// 타입 명시 연습이 목적이거나 팀 컨벤션 → _e 관례
onClick={(_e: React.MouseEvent<HTMLButtonElement>) => setCount(0)}
```

### ChangeEvent

```tsx
onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
  const cnt: number = Number(e.target.value);
  if (!isNaN(cnt)) setCount(cnt);
}}
```

`React.ChangeEvent<HTMLInputElement>` 덕분에 `e.target`이 `HTMLInputElement`로 좁혀진다.
그 결과 `e.target.value`, `e.target.checked`, `e.target.valueAsNumber` 등
해당 요소에만 있는 프로퍼티에 타입 안전하게 접근할 수 있다.

---

## NaN 처리 패턴

`type="number"` input에서 값을 지우거나 문자를 입력하면 변환 결과가 `NaN`이 된다.

```tsx
Number("")     // NaN
Number("abc")  // NaN
Number("3")    // 3
Number("0")    // 0  ← falsy지만 유효한 값
```

**올바른 처리:**
```tsx
const cnt = Number(e.target.value);
if (!isNaN(cnt)) setCount(cnt);  // NaN이면 setCount 호출 안 함
```

`isNaN(0)`은 `false`이므로 0도 정상적으로 처리된다 — ex02의 optional number 교훈과 동일한 맥락.

---

## 함수형 업데이트 패턴

```tsx
// 일반 업데이트: 클로저에서 캡처된 count 사용
setCount(count + step)

// 함수형 업데이트: React가 보장하는 최신 상태값 사용
setCount(prev => prev + step)
```

**왜 함수형 업데이트가 더 안전한가?**

React는 여러 상태 업데이트를 하나로 묶어 처리(배치)할 수 있다.
이 과정에서 클로저의 `count`는 오래된(stale) 값일 수 있다.
`prev`는 배치가 처리되는 시점의 실제 최신 값이다.

```tsx
// 연속 클릭 시 count가 1만 증가할 수 있음 (stale closure)
onClick={() => setCount(count + 1)}
onClick={() => setCount(count + 1)}

// 연속 클릭 시 매번 정확히 +1
onClick={() => setCount(prev => prev + 1)}
onClick={() => setCount(prev => prev + 1)}
```

**규칙:** 새 상태가 이전 상태에 의존할 때는 항상 `prev =>` 형태를 쓴다.

`Math.max(0, prev - step)` 패턴은 함수형 업데이트 + 하한값 처리를 한 줄에 표현하는 관용구다.

---

## 이번 exercise에서 배운 것

- `useState<number>` 제네릭 명시
- `React.ChangeEvent<HTMLInputElement>` → `e.target.value` 접근
- `Number()` + `isNaN()` 조합으로 안전한 문자열→숫자 변환
- 함수형 업데이트 `prev =>` 패턴과 `Math.max`로 하한값 처리
- `_e` 관례 — 미사용 파라미터를 "의도적으로 안 씀"으로 명시

---

## 자주 하는 실수

```tsx
// 실수 1: NaN 체크 없이 바로 setCount
setCount(Number(e.target.value))  // 입력 지우면 count가 NaN

// 실수 2: 이전 상태 기반 업데이트에 직접 참조
setCount(count + 1)  // stale closure 위험
// → setCount(prev => prev + 1)

// 실수 3: isNaN("") → false (전역 isNaN은 형변환 후 체크)
isNaN("")       // false (문자열을 0으로 변환)
isNaN(Number("")) // true ← 이렇게 써야 안전
```

---

## 요약 (Quick Reference)

| 상황 | 패턴 |
|------|------|
| 상태 타입 명시 | `useState<number>(0)` |
| nullable 상태 | `useState<User \| null>(null)` |
| 이전 상태 기반 업데이트 | `setCount(prev => prev + 1)` |
| 하한값 처리 | `setCount(prev => Math.max(0, prev - n))` |
| input 숫자 변환 | `Number(e.target.value)` + `isNaN()` 체크 |
| 버튼 클릭 이벤트 | `React.MouseEvent<HTMLButtonElement>` |
| input 변경 이벤트 | `React.ChangeEvent<HTMLInputElement>` |
| 미사용 이벤트 파라미터 | `_e` 접두사 관례 |
