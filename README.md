## 소개
개인프로젝트

개발기간 : 2023.06.27 ~ 2023.07.26

사이트 주소 : https://cherb.shop

영양제 조합의 총 영양성분을 알려주는 사이트


## 시연
![Jul-26-2023 14-35-39](https://github.com/swookang77/Cherb/assets/106954289/e2e6db54-4b4a-4054-9198-05f27d0d4662)

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





