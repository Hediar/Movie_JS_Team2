# Movie_Vanilajs_Team2

> **Vanila JS Movie List** <br/> **개발기간: 2023.06.05 ~ 2023.06.09**

## 프로젝트 소개

Javascript만을 이용해서 영화 리스트를 보여주고 검색을 할 수 있도록 만들어본 페이지 입니다.
TMDB open API를 가져와서 영화 리스트 정보들을 가져왔습니다.

## Stacks

### Environment

![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### Development

<img  src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img  src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img  src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

---

## 화면 구성

|                                                      메인 페이지                                                       |                                                      상세 페이지                                                       |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img width="400" src="https://github.com/Hediar/Movie_JS_Team2/assets/72387948/f41858b5-5eee-447b-80f1-5c003760941f"/> | <img width="400" src="https://github.com/Hediar/Movie_JS_Team2/assets/72387948/3f52e268-6406-4cf0-b09b-de12c259bdb1"/> |
|                                                    메인 페이지 기능                                                    |                                                    상세 페이지 기능                                                    |
|                                               <img width="329" src=""/>                                                |                                               <img width="329" src=""/>                                                |

---

## 주요 기능

### 메인페이지

#### 영화 리스트 불러오기

- 영화 리스트를 보여줍니다.
- 포스터 이미지, 제목, 평점(투표수), 내용 요약을 볼 수 있습니다.

#### 새로고침 했을 때

- 검색 하는 창에 자동으로 커서가 집중됩니다.

#### 검색하기

- 원하는 영화 제목을 검색할 수 있습니다.
- 일부 단어만 검색해도 검색이 가능합니다.
- 대소문자 관계없이 검색이 가능합니다.
- 검색 버튼이나 엔터를 입력해도 작동이 됩니다.

#### 페이지네이션

- 한 페이지 당 최대 6개의 카드를 보여 주고, 카드가 6개를 초과한 경우 다음 페이지가 생성됩니다.
- 페이지 숫자를 직접 선택하거나, 양 옆 화살표를 이용하여 페이지 이동이 가능합니다.
- 현재 페이지의 숫자 색상이 변경됨으로, 현재 어떤 페이지에 위치해 있는지 식별 가능합니다.

#### 현재 시간 불러오기

- 현재 시각을 기준으로 가장 인기 있는 영화들을 볼 수 있도록, 현재 시간을 보여 줍니다.

### 상세 페이지
