# ex01: 첫 TSX 컴포넌트 — HelloWorld

## 목표

React에서 TypeScript를 사용할 때의 기본 구조를 익힌다.
함수형 컴포넌트가 TypeScript에서 어떻게 작성되는지, 반환 타입이 무엇인지 직접 경험한다.

---

## 구현할 것

`name`과 `message`를 받아서 인사말을 렌더링하는 `HelloWorld` 컴포넌트를 만든다.

**결과 화면 예시:**
```
안녕하세요, 홍길동님!
오늘도 좋은 하루 되세요.
```

---

## 요구사항

- [ ] `src/components/ex01/HelloWorld.tsx` 파일에 컴포넌트 작성
- [ ] `name: string`, `message: string` 두 가지 props를 받는다
- [ ] Props 타입을 `interface`로 별도 정의한다 (컴포넌트 내부에 인라인으로 쓰지 않는다)
- [ ] 함수 반환 타입을 명시한다
- [ ] `App.tsx`에서 `HelloWorld`를 import해서 실제로 렌더링한다

---

## 제약 조건

- `any` 타입 사용 금지
- `React.FC` 사용 금지 (일반 함수로 작성할 것 — 이유는 DOCS.md에서 설명)
- Props 타입 정의는 컴포넌트 위에 `interface`로 작성

---

## 힌트 (막힐 때만 참고)

<details>
<summary>힌트 보기</summary>

- 함수형 컴포넌트의 반환 타입: `JSX.Element`
- interface 위치: `function HelloWorld` 바로 위에 선언
- `interface HelloWorldProps { ... }` 형태로 이름을 짓는 것이 관례

</details>

---

## 참고 자료

- [React 공식 문서 - TypeScript 사용하기](https://react.dev/learn/typescript)
- [TypeScript - Interface](https://www.typescriptlang.org/docs/handbook/2/objects.html)

---

## 완료 기준

구현 후 다음을 직접 확인하세요:

- [ ] `npm run dev` 실행 시 브라우저에 인사말이 출력된다
- [ ] `npx tsc --noEmit` 실행 시 에러가 없다
- [ ] `any` 타입을 한 곳도 사용하지 않았다
- [ ] Props 타입이 `interface`로 분리되어 있다

완료되면 `feat(ex01): HelloWorld 컴포넌트 구현` 으로 커밋하고 리뷰를 요청하세요.
