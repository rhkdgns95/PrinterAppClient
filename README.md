# Install
- yarn create react-app ./ typescript
- yarn add graphql react-apollo apollo-boost react-router-dom
- yarn add @types/react-router-dom apollo-boost
- yarn add styled-components
- yarn add @types/styled-components
- yarn add react-hooks
- yarn add react-toastify
- yarn add @types/react-toastify
- yarn add apollo-cache-inmemory --save
- yarn add apollo-link
- yarn add apollo-client
*TEST
- yarn add graphql-yoga
- yarn add nodemon ts-node
- yarn add datauri

- npm install ghostscript4js --save 
- sudo apt-get install node-gyp

# API
- [ ] GetGrouping
- [ ] GetAllGrouping
- [ ] CreateGrouping
- [ ] UpdateGrouping
- [ ] DeleteGrouping
- [ ] StartGrouping

# ETC
## 1. 캐시 데이터를 사용하는 방법은 2가지가있다.
첫째로, apollo-boost를 사용해서 import { graphql } from "react-apollo"를 사용하는 방법
둘째로, 사용자에 맞게 커스한 방식이다.바로 withApollo를 사용하는 import { withApollo } from "react-apollo" 방법이있다.

두번째로 사용할경우 해당 인자로 cache객체를 가져올수있다.
타입은 다음과 같이 설정한다. 
- 타입설정 상속: interface IProps extends WithApolloClient<{}> => React.FC<IProps>

## 2. readQuery
- 커스텀 클라이언트 캐싱을 하기위한 것(apollo-boost와는 다른 방법이다)
캐시데이터를 읽어오기 위해서 readQuery를 실행시킨다. readQuery는 로컬에서 저장시킨 cache를 가져오는 쿼리를 작성해놓은것이다. (이때 graphql의 리턴타입를 꼭 잘맞추어야 하며, 로컬 쿼리이름뒤에 @client지시어를 사용한다.)
순서는 다음과 같다.
1. cache.writeData({data: {auth: {__typename: "Auth", isLoggedIn: localStorage.getItem("jwt")}}});
2. export const IS_LOGGED_IN = gql`
    auth @client {
        isLoggedIn
    }
 `;
 3. export default withApollo(앱 컨테이너));
 4-1. const { cache } = client;
 4-2. cache.readQuery({ query: IS_LOGGED_IN});

## 3. useHomeProvider, useHomeContext
- 커스텀 React hooks를 사용하기 위해서는 React Function()을 render를 반환하도록 만들어야했다.
- 주의점이 한가지있는데,
- 값을 리턴받을때, 함수만 단순히 리턴받는 useHomeFetch가 있다. 이것은 독립적으로 함수를 사용할 수 있도록 도와주지만, 독립적인만큼 데이터를 부모와 자식간에 공유 즉 통합되도록 만들려면 다음과 같이 만들어준다.
- 첫째, 부모에서도 부모를 호출하는 다른 컴포넌트에서 useContext를 반환하는 ProvideHome으로 컴포넌트를 감싸야한다.
- 둘째, 데이터를 통일되게 사용하기 위해서 useHomeFetch가 아닌, useHomeContext를 통해서 데이터에 접근하도록 한다.
- 셋째, 둘째에서 접근하기 위한 데이터는 ProvideHome인 컨텍스트에 value값을 넣어야한다. 이 value는 useHomeFetch()로 데이터를 가져와야하며, 부모, 자식 등 다른 ProvideHome으로 감싸져 있는 각기 다른 컴포넌트에서는 useContext를 리턴하는 useHomeContext를 통해서 독립적인 데이터를 가져오도록 한다.

## 4. localStorage
- localStorage에 여러 데이터를 저장한다. 이때 가져올때도 이전 데이터에 추가하기 위해서 리스트를 가져올것이다. 이때 localStorage.getItem()을 통해 먼저 값이있는지 확인한다음에 JSON.parse()를 사용해서 파싱하도록 한다.
- 1. JSON.parse(localStorage.getItem()); 처럼 한번에 사용하면, localStorage.getItem()에 값이 없는경우 에러가 되므로 주의하도록 한다.


## 삭제예정
[ Details ]
1. 클릭했을떄 tmpGrouping에 클릭한 그룹핑데이터 넣기
2. Details에서 수정하면, tmpGrouping을 HomeContainer에서 HomeProvider의 Handle Function을 작성하여, UpdateMutation에 넣기. 
3. Details에서 수정안하고 돌아온다면, 단순히 돌아오면 됨. (isModifying이면 false로 만들어주면 됨.)
4. isModifying, setIsModifying => 수정버튼클릭시,
5. [버튼 - 수정, 업데이트 분기별로 다르게 실행되도록 하기.]


