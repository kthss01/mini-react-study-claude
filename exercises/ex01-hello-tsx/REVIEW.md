# ex01 코드 리뷰

## 전체 평가

`interface`로 Props 타입을 분리한 것, 구조 분해 할당으로 props를 받은 것 모두 좋다.
두 가지 개선 사항이 있다: 반환 타입 미명시, 파일 위치.

---

## 잘 된 점

- `interface HelloWorldProps`로 Props 타입을 컴포넌트 위에 깔끔하게 분리했다
- 구조 분해 할당 `({ name, message }: HelloWorldProps)` 패턴을 자연스럽게 사용했다
- `React.FC` 없이 일반 함수로 작성했다

---

## 개선 사항

### [필수] 함수 반환 타입이 명시되지 않았다

**현재 코드:**
```tsx
const HelloWorld = ({ name, message }: HelloWorldProps) => {
  return ( ... );
};
```

**문제점:**
TypeScript가 반환 타입을 추론해주기 때문에 동작은 하지만, exercise 요구사항에 명시적 반환 타입 표기가 있었다.
반환 타입을 생략하면 함수 시그니처만 봤을 때 이 컴포넌트가 무엇을 반환하는지 즉시 알 수 없다.

**방향 힌트:**
화살표 함수에서 반환 타입은 파라미터 괄호 뒤, `=>` 앞에 `: 타입` 형태로 붙인다.
JSX를 반환하는 컴포넌트의 반환 타입은 무엇일까? (`JSX.Element` vs `React.JSX.Element` 두 가지를 비교해보자)

---

### [필수] 파일 위치가 다르다

**현재:** `src/components/HelloWorld.tsx`
**요구사항:** `src/components/ex01/HelloWorld.tsx`

**문제점:**
exercise가 쌓일수록 `src/components/` 아래 파일이 모두 섞인다.
DESIGN.md의 폴더 구조대로 `ex01/` 서브폴더 안에 위치해야 이후 ex02, ex03 컴포넌트와 구분된다.

**방향 힌트:**
`src/components/ex01/` 폴더를 만들고 파일을 이동한 뒤, `App.tsx`의 import 경로도 함께 수정하면 된다.

---

### [선택] `import React from "react"` 가 불필요하다

**현재 코드:**
```tsx
import React from "react";
```

**문제점:**
React 17부터 도입된 새 JSX 변환(`react/jsx-runtime`) 덕분에 JSX를 쓰기 위해 React를 직접 import할 필요가 없다.
Vite의 기본 템플릿은 이미 이 설정을 사용한다(`tsconfig.app.json`의 `"jsx": "react-jsx"`).
불필요한 import는 `noUnusedLocals: true` 설정 시 TypeScript 오류가 된다.

**방향 힌트:**
`import React from "react"` 줄을 제거해도 컴포넌트가 정상 동작하는지 확인해보자.

---

### [선택] `App.tsx`에 미사용 import가 있다

```tsx
import { useState } from "react"; // 사용하지 않음
```

Vite 기본 템플릿의 잔여 코드다. `noUnusedLocals: true` tsconfig 설정 시 에러가 된다.
`DESIGN.md` 부록의 strict tsconfig 설정을 아직 적용하지 않았다면, 이 기회에 적용해보자.

---

## TypeScript 포인트

- 화살표 함수의 반환 타입 위치: `(params): ReturnType => { ... }`
- `JSX.Element`와 `React.JSX.Element`는 사실상 같지만, React 18부터 후자가 더 명확한 표현
- `noUnusedLocals`, `noUnusedParameters` — 미사용 변수를 에러로 처리해 코드를 깔끔하게 유지

---

## 다음 exercise 예고

다음 ex02에서는 **optional props**와 **default 값 처리**를 다룬다.
`name?: string` 처럼 있을 수도 없을 수도 있는 props를 TypeScript에서 어떻게 다루는지 경험하게 된다.
