## 소개
개인프로젝트

개발기간 : 2023.06.27 ~ 2023.07.26

영양제 조합의 총 영양성분을 알려주는 사이트

## 아키텍처 
![cherb drawio (1)](https://github.com/swookang77/Cherb/assets/106954289/1930294f-f82b-4dd3-98ff-1f60a2e06e75)


## 시연
![Jul-26-2023 14-35-39](https://github.com/swookang77/Cherb/assets/106954289/e2e6db54-4b4a-4054-9198-05f27d0d4662)

## 주요기능 구현방식.
|기능|구현방식|
|---|---|
| 검색 |유저가 검색한 상품의 이미지와 상품명을 i-herb웹사이트에서 스크래핑 후 렌더링 |
| 상품 추가 시 그래프 갱신 | 유저가 추가한 상품의 영양성분을 i-herb웹사이트에서 웹스크래핑 후 그래프 갱신|
| 싱픔 삭제 시 그래프 갱신 | 유저가 삭제한 상품의 영양성분을 세션스토리지에서 조회 후 그래프 갱신 |
| 인증 | httponly쿠키로 jwt(access token)전송|
## Tool
|이름|설명|
|---|---|
|nest.js|WAS 구축|
|postgreSQL| 회원정보 저장|      
|mongodb| 회원의 영양제 정보를 저장 |   
|react| ui 구축|    
|certbot| SSL/TLS 인증서 발급  |
|ec2| WAS 호스팅  |
|cloudfront| 웹 컨텐츠 응답 & s3의 캐시 역할  |
|s3| cloudfront의 origin으로서 웹 컨텐츠를 저장.|  
|cheerio| iherb에서 회원이 검색한 비타민 & 영양성분 스크래핑할때 사용.  |
|github actions| frontend브랜치에 push시 빌드 & s3업로드 |





