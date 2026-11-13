# MEGO MOVE 웹앱 올리는 순서

준비물: 구글 계정 1개, 이 폴더(압축 푼 상태). 비용 0원 (Firebase 무료 요금제 + Netlify 무료).

## 1. Firebase 프로젝트 만들기 (5분)
1. https://console.firebase.google.com 접속 → 구글 계정 로그인
2. **프로젝트 만들기** → 이름 `mego-move` → Google 애널리틱스는 꺼도 됨 → 만들기

## 2. 로그인 기능 켜기
1. 왼쪽 메뉴 **빌드 → Authentication** → **시작하기**
2. **로그인 방법** 탭 → **이메일/비밀번호** 선택 → 첫 번째 스위치 **사용 설정** → 저장
   (앱의 아이디는 내부적으로 `아이디@mego-move.app` 형태로 저장돼요. 실제 이메일은 필요 없어요.)

## 3. 데이터베이스 만들기
1. 왼쪽 메뉴 **빌드 → Firestore Database** → **데이터베이스 만들기**
2. 위치: **asia-northeast3 (서울)** → **프로덕션 모드로 시작** → 만들기
3. 위쪽 **규칙** 탭 → 안에 있는 글을 전부 지우고, 이 폴더의 `firestore.rules` 내용을 그대로 붙여넣기 → **게시**

## 4. 웹 앱 설정 코드 넣기
1. 왼쪽 위 톱니바퀴 → **프로젝트 설정** → 아래 **내 앱**에서 `</>`(웹) 아이콘 클릭
2. 앱 닉네임 `mego-move-web` → 앱 등록 (Firebase 호스팅 체크는 안 해도 됨)
3. 화면에 나오는 `const firebaseConfig = { ... }` 안의 내용(apiKey ~ appId)을 복사
4. 이 폴더의 **config.js**를 메모장으로 열고 `window.FIREBASE_CONFIG = { ... }` 안을 복사한 내용으로 바꾸고 저장

## 5. 인터넷에 올리기 (Netlify, 2분)
1. https://app.netlify.com/drop 접속 (구글 계정으로 가입/로그인)
2. **이 폴더 전체**를 화면에 끌어다 놓기 → 잠시 뒤 `https://○○○.netlify.app` 링크 생성
3. **Site configuration → Change site name**에서 `mego-move` 같은 이름으로 바꾸기

## 6. Firebase에 내 사이트 주소 허용하기
1. Firebase → **Authentication → 설정 → 승인된 도메인** → **도메인 추가**
2. Netlify 주소(예: `mego-move.netlify.app`) 입력 → 추가

## 7. 확인
- 폰으로 링크 접속 → 회원가입 → 가방 고르기 → 출석하기
- 다른 폰에서 같은 아이디로 로그인해서 기록이 그대로 보이면 성공
- 폰에서 **홈 화면에 추가**(아이폰: 공유 → 홈 화면에 추가 / 안드로이드: 메뉴 → 앱 설치)하면 앱처럼 쓸 수 있어요
- QR코드: 크롬에서 링크 열고 주소창 공유 → QR 코드 만들기

## 수정본 다시 올릴 때
Netlify 사이트 → **Deploys** 탭 → 아래 상자에 새 폴더를 끌어다 놓기 (링크는 그대로 유지돼요)

## 관리자
- 관계자 전용 코드: `MEGO2026`
- 가입한 사람 확인: Firebase → Authentication → 사용자
- 후기 데이터: Firebase → Firestore → `reviews`

## 알아둘 점
- 기록과 OOTD 사진은 각자 비밀번호로 잠가서 저장돼요. 관리자도 내용을 볼 수 없어요.
- 비밀번호를 잊으면 기록을 되살릴 수 없어요.
- config.js가 비어 있으면 '로그인 없이 이 폰에서만 쓰기'로만 동작해요.
