# mini-react-study-claude

> React + TypeScript 재학습 프로젝트
> JavaScript 실무 경험자가 직접 구현하며 감각을 되살리는 학습 루프

---

## 학습 방식

이 프로젝트는 **"문제 → 구현 → 리뷰 → 개선 → 정리"** 사이클을 반복합니다.

```
[Claude] exercise 생성
    ↓
[학습자] 직접 코드 구현  ← 핵심: Claude가 먼저 정답을 주지 않음
    ↓
[Claude] 코드 리뷰
    ↓
[학습자] 리뷰 반영 개선
    ↓
[Claude] 개념 정리
```

---

## 기술 스택

- **Vite** + **React 18** + **TypeScript 5**
- `strict: true` tsconfig (처음부터 엄격하게)

---

## 폴더 구조

```
mini-react-study-claude/
├── DESIGN.md               ← 전체 학습 설계 문서
├── exercises/              ← 학습 문제 및 리뷰 문서
│   ├── ex01-hello-tsx/
│   │   ├── EXERCISE.md     ← 문제 (Claude 작성)
│   │   ├── REVIEW.md       ← 코드 리뷰 (Claude 작성)
│   │   └── DOCS.md         ← 개념 정리 (Claude 작성)
│   └── ...
└── src/
    ├── components/
    │   ├── ex01/           ← exercise별 구현 코드
    │   └── ...
    ├── hooks/
    ├── types/
    └── utils/
```

---

## 커밋 컨벤션

| 타입 | 작성자 | 설명 |
|------|--------|------|
| `exercise(exNN)` | Claude | 학습 문제 생성 |
| `feat(exNN)` | 학습자 | 구현 코드 |
| `review(exNN)` | Claude | 코드 리뷰 |
| `refactor(exNN)` | 학습자 | 리뷰 반영 개선 |
| `docs(exNN)` | Claude | 개념 정리 |

---

## 진행 현황

| exercise | 주제 | 상태 |
|----------|------|------|
| ex01 | 첫 TSX 컴포넌트 — HelloWorld | 준비 중 |
| ex02 | Props 타입 정의 — UserCard | 대기 |
| ex03 | useState + 이벤트 타입 — 카운터 | 대기 |
| ex04 | Children props — 모달 컴포넌트 | 대기 |
| ex05 | 커스텀 훅 — useToggle | 대기 |

---

## 시작하기

```bash
npm install
npm run dev
```

타입 검사:
```bash
npx tsc --noEmit
```

---

## 학습 로드맵

| 단계 | 주차 | 주제 |
|------|------|------|
| Phase 1 | 1~2주 | TypeScript 기초 — TSX, Props, useState, 이벤트 타입 |
| Phase 2 | 2~3주 | 컴포넌트 설계 — Children, 리스트, 폼 |
| Phase 3 | 3~4주 | Hooks 심화 — useEffect, useRef, useReducer, 커스텀 훅, Context |
| Phase 4 | 4~6주 | 실전 패턴 — 비동기, 제네릭, 타입 가드, 성능 최적화 |

자세한 설계 내용은 [DESIGN.md](./DESIGN.md)를 참고하세요.
