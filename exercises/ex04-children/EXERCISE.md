# ex04: Children props — 모달 컴포넌트

## 목표

`children` prop의 타입(`React.ReactNode`)을 익히고,
컴포넌트 합성(composition) 패턴을 통해 재사용 가능한 레이아웃 컴포넌트를 만드는 감각을 기른다.

---

## 구현할 것

열기/닫기 버튼이 있고, 어떤 내용이든 담을 수 있는 `Modal` 컴포넌트를 만든다.

**동작:**
- "열기" 버튼 클릭 → 모달 표시
- 모달 내부 "닫기" 버튼 클릭 → 모달 숨김
- 모달 안에는 어떤 JSX든 넣을 수 있다

**사용 예시:**
```tsx
<Modal title="공지사항">
  <p>안녕하세요!</p>
  <button>확인</button>
</Modal>
```

**결과 화면 예시 (닫힌 상태):**
```
[ 공지사항 열기 ]
```

**결과 화면 예시 (열린 상태):**
```
┌─────────────────┐
│ 공지사항    [닫기] │
│                 │
│ 안녕하세요!      │
│ [확인]          │
└─────────────────┘
```

---

## 요구사항

- [ ] `src/components/ex04/Modal.tsx` 파일에 컴포넌트 작성
- [ ] `title: string`, `children: React.ReactNode` props를 받는다
- [ ] 모달 열림/닫힘 상태를 `useState`로 관리한다 (외부에서 제어하지 않음)
- [ ] Props 타입을 `interface`로 정의한다
- [ ] 반환 타입을 명시한다
- [ ] `App.tsx`에서 서로 다른 내용을 가진 Modal을 **2개** 렌더링한다

---

## 제약 조건

- `any` 타입 사용 금지
- children 타입은 반드시 `React.ReactNode`를 사용할 것 (`JSX.Element`로 좁히지 않기)
- 모달이 닫힌 상태일 때 children이 DOM에 존재하지 않도록 처리할 것 (`&&` 패턴)

---

## 힌트 (막힐 때만 참고)

<details>
<summary>힌트 보기</summary>

- `children`을 Props에 포함시키는 방법: `interface ModalProps { children: React.ReactNode; ... }`
- 열림 상태: `const [isOpen, setIsOpen] = useState<boolean>(false)`
- 조건부 렌더링: `{isOpen && <div>...</div>}`

</details>

---

## 참고 자료

- [React - children props](https://react.dev/learn/passing-props-to-a-component#passing-jsx-as-children)
- [React TypeScript - ReactNode](https://react.dev/learn/typescript#typing-children)

---

## 완료 기준

- [ ] 열기/닫기 버튼이 정상 동작한다
- [ ] 두 Modal에 서로 다른 children을 넣었을 때 각각 독립적으로 동작한다
- [ ] `npx tsc --noEmit` 에러 없음
- [ ] children에 `<p>`, `<button>`, 문자열 등 다양한 타입을 넣어도 타입 에러가 없다

완료되면 `feat(ex04): Modal 컴포넌트 구현` 으로 커밋하고 리뷰를 요청하세요.
