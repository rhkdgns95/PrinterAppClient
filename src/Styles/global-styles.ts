import { createGlobalStyle, keyframes } from "./typed-components";

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
    * {
        box-sizing: border-box;
    }
    html, body {
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        overflow: hidden;
    }
    body {
        position: relative;
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        height: 100%;
        
        background: linear-gradient(0deg,rgba(34,40,195,1) 0%,rgba(56,191,219,1) 0%,rgba(45,98,253,1) 66%,rgba(45,98,253,1) 84%);
        // background: linear-gradient(0deg, rgba(200,135,255,1) 0%, rgba(123,33,196,1) 75%);
        // background: linear-gradient(0deg, rgba(62,26,83,1) 0%, rgba(5,143,204,1) 0%, rgba(4,61,162,1) 100%)
        // background: linear-gradient(90deg, rgba(68,84,111,1) 0%, rgba(40,157,164,1) 53%, rgba(68,84,111,1) 100%);

    }
    ul, li, a, p {
        list-style: none;
        padding: 0;
        margin: 0;
    }
    a {
        color: inherit;
        text-decoration: none;
    }
    .error {
        animation: ${keyframes => Shake} 0.82s cubic-bezier(.36,.07,.19,.97) both;
    }
`;
const Shake = keyframes`
    10%, 90% {
        transform: translate3d(-1px, 0, 0);
    }

    20%, 80% {
        transform: translate3d(2px, 0, 0);
    }

    30%, 50%, 70% {
        transform: translate3d(-4px, 0, 0);
    }

    40%, 60% {
        transform: translate3d(4px, 0, 0);
    }
`;

export default GlobalStyles;