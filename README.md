# 개요
 청와대 청원 중 정부의 답변을 받지는 못했지만 많은 사람들의 관심을 받은 청원을 재조명하고 토론할 수 있는 온라인 서비스





# Express Server (Back-End Server)
 
1. 터미널 창에 npm install 명령어 입력해서  node module을 설치 한다

2. 설치가 완료되면, 터미널창에 node app.js 입력해서 Express서버를 실행 시킨다.
  (local : https://localhost:3000/, network : https://192.168.1.5:3000/)






# Front-End Test Server (Vue Test Server)
 
 1. cd 1st_node/public (public폴더로 이동)
 2. Vue에 필요한 모듈 설치를 위해서, npm install
 3. module설치 완료되면,  npm run serve 명령어 입력해서 pack되기전 test 서버를 구동 시킨다.
   ( local : https://localhost:8080/, network : https://192.168.1.5:8080/)
 
 





# 클래스 구조

![class](https://user-images.githubusercontent.com/35789500/55612182-9c5b1e80-57c2-11e9-8583-b32e7a927bf3.PNG)



- Authentication Class : Passport.js 를 통해서 일반회원 인증 및 소셜회원 인증 처리
  
- Member Class : 회원가입, 회원탈퇴, 회원정보수정, 게시물 조회기록, 청원 공감 로직 처리 

- DetailInfo Class : 청원관련 데이터를 Django 서버로 부터 획득

- Chat Class : Socket 통신을 활용해서 각 청원별로 실시간 채팅방 생성

- User Class : 데이터베이스와 연동을 위한  쿼리문 작성




### Authentication Class
----------------------------------------------------
getAuth

- 클라이언트 측에서, request message를 통해 로그인 정보가 입력

- DB에 저장된 암호화된 패스워드와의 비교를 통해서 Access-Token 과 Refresh-Token을 발급

- response message에 토큰을 넣어서 응답한다


getNewToken

- 만료된 Access-Token이 요청으로 들어옴

- 서버에서 확인후, 클라이언트에게 access-token이 만료 되었다고 응답

- 클라이언트가 refresh token을 가지고 요청

- 서버에서 확인후, 새로운 access-token을 발급


### Member Class
-------------------------------------
getUserInfo

- 클라이언트측에서 자세히보기를 클릭시, api요청을 통해서 해당되는 청원의 ID값이 request 로 서버에  입력
- 청원 ID를 받아서, 해당 청원을 공감하기 한 사용자들의 정보를 DB로 부터 받아옴
- 공감하기 한 사용자 정보를 응답

updateUserInfo

- 사용자의 개인정보 요청이 들어옴
- DB에 update 시킴

updatePassword

- 사용자의 비밀번호 변경 요청이 들어옴
- DB에 update 시킴

registerUser

- 신규 사용자의 회원가입 요청이 들어옴
- 이메일 유효성 검사
- 닉네임 중복 검사
- 모두 통과후, DB에 저장
- 사용자 정보를 응답

registerSnsMember

- 소셜로그인 한 회원이, 등록된 회원이 아닐경우, 데이터베이스의 user테이블에 입력
- 닉네임 중복검사 
- 이메일 정보 table에 저장

deleteUser

- 클라이언트로 부터 회원탈퇴 요청
- 패스워드가 일치하는지 확인
- 일치한다면 사용자 정보 삭제처리

deleteSnsUser

- 클라이언트로 부터 회원탈퇴 요청
- 이메일이 일치하는지 확인
- 일치하면 사용자 정보 삭제 처리

getSnsMember

- 소셜계정으로 로그인 요청
- 로그인 처리 과정에서, 신규회원이 아닌회원 에게 개인정보를 응답


### DetailInfo Class
-----------------------------------------
getPetition

- 클라이언트로 부터 청원정보 요청
- express서버가 장고 서버로 청원 정보 요청
- express서버가 장고로 부터 받은 정보를 클라이언트에게 응답

getSearch

- 클라이언트로 부터 검색 요청
- 검색어를 받은 express 서버가 장고서버에게 요청
- express서버가 검색결과를 받음
- 검색결과를 클라이언트에게 응답

postHistory

- 사용자가 청원 자세히보기를 클릭
- 서버에서는 사용자의 email, 해당되는 청원 ID를 받아서 이를 DB 테이블에 저장

getHistory

- 사용자가 최근 읽은 게시물 페이지 클릭
- 서버는 사용자의 이메일을 입력 받음
- 이메일을 기준으로 table을 조회
- 서버는 사용자가 최근 읽은 5개의 게시물에 해당되는 청원 ID를 가지게 됨
- 장고 서버에 해당 ID 5개에 해당되는 청원 데이터 요청
- 응답을 받은 서버가 이를 클라이언트에게 다시 응답

postRecommend

- 클라이언트측에서 공감하기 버튼 클릭
- 청원 ID와 사용자의 이메일이 서버로 전달
- 서버에서는 history테이블에 VotingStatus값에 1을 넣어서 공감했음을 표시
