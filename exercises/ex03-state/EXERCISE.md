# ex03: useState + 이벤트 타입 — 카운터

## 목표

`useState`의 제네릭 타입 파라미터를 익히고,
React 이벤트 타입(`React.MouseEvent`, `React.ChangeEvent`)을 직접 명시하는 경험을 한다.

---

## 구현할 것

`Counter` 컴포넌트를 만든다. 단순한 +/- 카운터가 아니라,
**직접 숫자를 입력**하거나 **버튼으로 증감**할 수 있는 카운터다.

**동작:**
- `-` 버튼: 현재 값에서 step만큼 감소 (0 미만으로 내려가지 않음)
- `+` 버튼: 현재 값에서 step만큼 증가
- input 필드: 숫자를 직접 입력하면 해당 값으로 변경 (숫자가 아닌 입력은 무시)
- 리셋 버튼: 0으로 초기화

**결과 화면 예시:**
```
[ - ]  [ 3 ]  [ + ]   [리셋]
step: [  1  ]
```

---

## 요구사항

- [ ] `src/components/ex03/Counter.tsx` 파일에 컴포넌트 작성
- [ ] `step?: number` prop을 받는다 (기본값: 1)
- [ ] `useState`에 타입 파라미터를 **명시**한다 (`useState<number>`)
- [ ] 버튼 클릭 핸들러에 `React.MouseEvent<HTMLButtonElement>` 타입을 명시한다
- [ ] input 변경 핸들러에 `React.ChangeEvent<HTMLInputElement>` 타입을 명시한다
- [ ] `App.tsx`에서 `<Counter />`와 `<Counter step={5} />`를 렌더링한다

---

## 제약 조건

- `any` 타입 사용 금지
- 이벤트 핸들러 타입을 **반드시 명시**할 것 (추론에 맡기지 않기)
- input 값은 `Number()` 또는 `parseInt()`로 변환 후 `isNaN()` 체크할 것
- 카운터 값이 0 미만이 되지 않도록 처리할 것

---

## 힌트 (막힐 때만 참고)

<details>
<summary>힌트 보기</summary>

- `useState<number>(0)` — 초기값 0, 타입은 number
- 버튼 핸들러: `(e: React.MouseEvent<HTMLButtonElement>) => void`
- input 핸들러: `(e: React.ChangeEvent<HTMLInputElement>) => void`
- input에서 숫자 추출: `const num = Number(e.target.value)`
- `step` 기본값: 파라미터 기본값 문법 `{ step = 1 }`

</details>

---

## 참고 자료

- [React TypeScript - 이벤트 타입](https://react.dev/learn/typescript#typing-dom-events)
- [React - useState](https://react.dev/reference/react/useState)

---

## 완료 기준

- [ ] `+`/`-` 버튼이 step 단위로 동작한다
- [ ] input에 숫자를 직접 입력하면 카운터 값이 바뀐다
- [ ] 숫자가 아닌 값 입력 시 아무 변화 없다
- [ ] 0 미만으로 내려가지 않는다
- [ ] `npx tsc --noEmit` 에러 없음

완료되면 `feat(ex03): Counter 컴포넌트 구현` 으로 커밋하고 리뷰를 요청하세요.
