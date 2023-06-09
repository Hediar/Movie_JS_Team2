# Movie_Vanilajs

> **Vanila JS Movie List** <br/> **개발기간: 2023.06.05 ~ **

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

|                                                      메인 페이지                                                       |                                                   검색했을 시 페이지                                                   |
| :--------------------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------------------: |
| <img width="400" src="https://github.com/Hediar/Movie_Vanilajs/assets/72387948/92cedc67-7c55-41fe-94e3-eeef4545ecfb"/> | <img width="400" src="https://github.com/Hediar/Movie_Vanilajs/assets/72387948/831f572b-4848-4548-9fab-abf0d067f992"/> |

---

## 주요 기능

### 영화 리스트 불러오기

- 영화 정보를 카드리스트 형태로 보여줍니다.
- 포스터 이미지, 제목, 평점(투표수), 내용 요약을 볼 수 있습니다.

### 새로고침 했을 때

- 검색 하는 창에 자동으로 커서가 집중됩니다.
- 제목 상단에서 현재 시간을 볼 수 있습니다.

### 검색하기

- 원하는 영화 제목을 검색할 수 있습니다.
- 일부 단어만 검색해도 검색이 가능합니다.
- 대소문자 관계없이 검색이 가능합니다.
- 검색 버튼이나 엔터를 입력해도 작동이 됩니다.

### 정렬, 카테고리

- 제목, 평점, 투표수를 기준으로 카드를 오름차순, 내림차순 정렬할 수 있습니다.
- 영화의 원어(언어)에 따라 '전체, 한국,  미국, 일본, 기타' 의 항목으로 카테고리를 선택할 수 있습니다.

### 페이지네이션

- 한 화면에 최대 6개의 카드를 볼 수 있도록 페이지를 나누었습니다.

### 영화 카드 클릭

- 영화 카드를 클릭할 수 있습니다.
- 카드 클릭 시 영화의 상세정보가 있는 상세페이지로 이동할 수 있습니다.

### 반응형 디자인

- 페이지의 크기에 따라 카드의 배치가 달라집니다.

### 상세페이지

- 선택한 영화의 상세 정보를 볼 수 있습니다.
- 상세 정보에는 개봉일, 원어(언어), 인기도가 포함됩니다.
- 메인페이지로 이동하는 UI가 구현되어 있습니다.

### 리뷰 작성

- 상세 페이지에서 특정 영화에 대한 의견을 작성할 수 있습니다.
- 리뷰를 작성할 때는 리뷰, 닉네임, 비밀번호를 필수적으로 입력받습니다.

### 리뷰 수정, 삭제

- 비밀번호를 확인하여 본인이 작성한 비밀번호와 일치할 시, 리뷰 내용을 수정하거나 해당 리뷰를 삭제할 수 있습니다.

