# React + TypeScript 학습 프로젝트 설계 문서

> 작성일: 2026-03-17
> 대상: JavaScript 실무 경험자, React/TypeScript 재학습
> 스택: Vite + React 18 + TypeScript 5

---

## 학습 원칙

- Claude는 **문제 출제 / 코드 리뷰 / 개념 정리** 역할만 담당
- **정답 코드를 먼저 제시하지 않음** — 학습자가 스스로 구현한 뒤 리뷰 요청
- 각 exercise는 **단일 개념에 집중** + 실제 동작하는 결과물을 목표로

---

## 1. 전체 학습 구조

```
[Claude] exercise 생성 → [학습자] 코드 구현 → [Claude] 코드 리뷰
         → [학습자] 리팩터링 → [Claude] 개념 정리
```

---

## 2. 폴더 구조

```
mini-react-study-claude/
├── DESIGN.md
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
│
├── exercises/
│   ├── ex01-hello-tsx/
│   │   ├── EXERCISE.md     ← 문제 정의 (Claude 작성)
│   │   ├── REVIEW.md       ← 코드 리뷰 (Claude 작성)
│   │   └── DOCS.md         ← 개념 정리 (Claude 작성)
│   └── ...
│
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── components/
    │   ├── ex01/
    │   └── ex02/
    ├── hooks/
    ├── types/
    └── utils/
```

---

## 3. 커밋 전략

### 컨벤션
```
<타입>(ex<번호>): <한 줄 요약>
```

| 타입 | 작성자 | 설명 |
|------|--------|------|
| `exercise` | Claude | 학습 문제 md 파일 생성 |
| `feat` | 학습자 | exercise 구현 코드 |
| `review` | Claude | 코드 리뷰 md 파일 작성 |
| `refactor` | 학습자 | 리뷰 반영 코드 개선 |
| `docs` | Claude | 개념 정리 md 파일 작성 |

### 예시
```
exercise(ex01): JSX 기본 문법과 함수형 컴포넌트 작성 문제 추가
feat(ex01): HelloWorld 컴포넌트 구현
review(ex01): Props 타입 정의 방식 및 반환 타입 명시 피드백
refactor(ex01): interface로 Props 타입 분리 및 반환 타입 JSX.Element 명시
docs(ex01): JSX, TSX, 함수형 컴포넌트 개념 정리
```

---

## 4. 브랜치 전략

```
main                ← 완성된 exercise만 머지 (항상 동작하는 상태)
├── ex01-hello-tsx
├── ex02-props
└── ex03-state
```

```bash
# exercise 시작
git checkout -b ex01-hello-tsx

# 완료 후 main에 머지
git checkout main
git merge ex01-hello-tsx --no-ff
git branch -d ex01-hello-tsx
```

**규칙:** `main`에 직접 push 금지. 브랜치명은 `ex<번호>-<kebab-case-주제>` 형식.

---

## 5. React + TypeScript 학습 로드맵

| 단계 | 주차 | 주제 | 핵심 개념 |
|------|------|------|-----------|
| Phase 1 | 1~2주 | TypeScript 기초 | TSX 문법, Props 타입, useState, 이벤트 타입 |
| Phase 2 | 2~3주 | 컴포넌트 설계 | Children, 조건부/리스트 렌더링, 폼 처리 |
| Phase 3 | 3~4주 | Hooks 심화 | useEffect, useRef, useReducer, 커스텀 훅, Context |
| Phase 4 | 4~6주 | 실전 패턴 | 비동기 데이터, 제네릭 컴포넌트, 타입 가드, 성능 최적화 |

---

## 6. Exercise 진행 방식

### 시작 방법
1. Claude에게 "다음 exercise 생성해줘" 요청
2. Claude가 `exercises/ex<번호>/EXERCISE.md` 작성 후 `exercise` 커밋
3. 학습자가 브랜치 생성 후 구현 시작
4. 완성 후 "ex<번호> 구현 완료, 리뷰 요청" 으로 리뷰 의뢰

### EXERCISE.md 형식
```markdown
# ex<번호>: <제목>

## 목표
<핵심 개념 1~2줄>

## 구현할 것
<동작하는 결과물 설명>

## 요구사항 (체크리스트)
- [ ] 요구사항 1
- [ ] 요구사항 2

## 제약 조건
- `any` 타입 사용 금지

## 힌트 (막힐 때만 참고)
<HINT>힌트 내용</HINT>

## 완료 기준
- 브라우저에서 정상 동작 확인
- `npx tsc --noEmit` 에러 없음
- `any` 타입 0개
```

---

## 7. 코드 리뷰 방식

### REVIEW.md 형식
```markdown
# ex<번호> 코드 리뷰

## 전체 평가

## 잘 된 점

## 개선 사항

### [필수] <개선 항목>
**현재 코드:** (학습자 코드 인용)
**문제점:** (왜 문제인지 — 정답 코드 제시 안 함)
**방향 힌트:** (어떤 방향으로 개선할지)

## TypeScript 포인트
```

### 리뷰 등급
| 등급 | 의미 |
|------|------|
| `[필수]` | 반드시 refactor 커밋에서 수정 |
| `[선택]` | 여유 있으면 개선 |
| `[심화]` | 이번에 안 해도 되는 내용 |

---

## 8. Docs 작성 방식

### DOCS.md 형식
```markdown
# ex<번호> 개념 정리: <핵심 개념명>

## 핵심 개념 한 줄 요약

## 왜 이게 필요한가?
<JavaScript와 비교 또는 문제 상황>

## 개념 설명
<소주제별 설명 + 최소 예제 코드>

## 이번 exercise에서 배운 것

## 자주 하는 실수

## 요약 (Quick Reference)
| 상황 | 사용법 |
|------|--------|
```

---

## 9. 4~6주 학습 계획

### 1주차 — TypeScript + React 기본 문법
- ex01: JSX/TSX 기본 — 함수형 컴포넌트
- ex02: Props 타입 — interface vs type alias
- ex03: useState + 이벤트 타입 — 카운터

### 2주차 — 컴포넌트 설계
- ex04: Children props — 카드 레이아웃
- ex05: 리스트 렌더링 — 타입 안전 목록
- ex06: 폼 처리 — controlled input

### 3주차 — Hooks
- ex07: useEffect — API 호출 (JSONPlaceholder)
- ex08: useRef — DOM 접근 + focus 제어
- ex09: 커스텀 훅 — useLocalStorage

### 4주차 — 상태 관리 심화
- ex10: useReducer — Todo 앱 상태 관리
- ex11: Context API — 테마/인증 전역 상태
- ex12: 비동기 상태 패턴 — loading/error/data 타입 설계

### 5~6주차 — 실전 패턴 (선택)
- ex13: 제네릭 컴포넌트 — 재사용 가능한 Select
- ex14: 타입 가드 + 에러 처리 패턴
- ex15: 미니 프로젝트 — 배운 것 종합 적용

---

## 10. 처음 시작할 Exercise 5개

| 번호 | 제목 | 핵심 개념 |
|------|------|-----------|
| ex01 | 첫 TSX 컴포넌트 — HelloWorld | JSX/TSX 문법, 반환 타입, React.FC |
| ex02 | Props 타입 정의 — UserCard | interface, type alias, optional props |
| ex03 | useState + 이벤트 타입 — 카운터 | `useState<number>()`, `React.MouseEvent` |
| ex04 | Children props — 모달 컴포넌트 | `React.ReactNode`, `PropsWithChildren<T>` |
| ex05 | 커스텀 훅 — useToggle | 커스텀 훅 설계, 반환 타입 tuple, `as const` |

---

## 부록: 초기 설정

```bash
npm create vite@latest . -- --template react-ts
npm install
```

### 권장 tsconfig.json 설정
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

`strict: true` + `noUnusedLocals/Parameters` — TypeScript 학습 중 실수를 빠르게 잡아주는 핵심 설정.
