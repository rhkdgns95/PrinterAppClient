import React from "react";
import styled from "../../Styles/typed-components";
import Spinner from "../../Components/Spinner";
import Intro from "../../Components/Intro";
import ListBox from "../../Components/ListBox";
import RecordBox from "../../Components/RecordBox";

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    border: 1px solid red;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const SpinnerExtended = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const Light = styled.div`
    position: absolute;
    top: 10px;
    left: 50%;
    width: 90px;
    height: 90px;
    transform: translateX(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    & svg{
        fill: #ffc107;
        transform: rotate(180deg);
    }
`;
const LightContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150%;
    height: 150%;
    transform: translate(-50%, -50%);
    background-color: rgba(250,250,250, .7);
    border-radius: 50%;
`;
const LightOne = styled(LightContainer)`
    opacity: .9;  
    width: 30%;
    height: 30%;
`;
const LightTwo = styled(LightContainer)`
    opacity: .7;
    width: 60%;
    height: 60%;
`;
const LightThree = styled(LightContainer)`
    opacity: .5;
    width: 90%;
    height: 90%;
    // background-color: rgba(250,250,250,.54);
`;
const LightFour = styled(LightContainer)`
    opacity: .3;
    width: 120%;
    height: 120%;
    // background-color: rgba(250,250,250,.44);
`;
const LightFive = styled(LightContainer)`
    opacity: .1;
    // background-color: rgba(250,250,250,.24);
`;
const Box = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    max-width: 750px;
    max-height: 500px;
    background-color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.24), 0 3px 6px rgba(0,0,0,.32);
    overflow: hidden;
`;
interface ISlideScreen {
    step: number;
}
const SlideScreen = styled.div<ISlideScreen>`
    position: absolute;
    top: 0;
    left: 0;
    left: -${props => props.step * 50}%;
    width: 150%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: row;
    transition: .5s;
    transition-delay: .1s;
    transition-timing-function: ease-in-out;
    & > div {
        flex: 1;
        &.screen {
            & > div {
                &:nth-of-type(${props => props.step + 1}) {
                    opacity: 1;
                    top: 0;
                }
            }
        }
    }
`;
const Screen = styled.div`
    position: relative;
    background: linear-gradient(180deg,rgba(81,102,100,.1) 0%,rgba(13,37,34,.5) 100%);
    height: 100%;
    & > div {
        opacity: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        transition: opacity .5s, top .4s;
        &:nth-of-type(1) {
            top: -100%;
        }
        &:nth-of-type(2) {
            top: 100%;
        }
    }
`;
const MainView = styled.div`
    width: 50%;
    height: 100%;
    border: 1px solid green;
    // background: linear-gradient(180deg, rgba(81,102,100,1) 0%, rgba(13,37,34,1) 100%);
    // background: #1e3f49;
    background: linear-gradient(180deg,rgba(81,102,100,.1) 0%,rgba(13,37,34,.5) 100%);
`;
const GoBtn = styled.button`
    position: absolute;
    top: 10px
    left: 10px;
    cursor: pointer;
    padding: 10px;
    background-color: #00c0ff;
    color: white;
    border: none;
    &:active,
    &:focus {
        border: none;
        outline: none;
    }
`;
const GoRecordBtn = styled(GoBtn)`

`;
const GoListBtn = styled(GoBtn)`
    left: auto;
    right: 10px;
`;




{/* <Light>
                            <LightOne /> 
                            <LightTwo /> 
                            <LightThree /> 
                            <LightFour /> 
                            <LightFive /> 
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 19h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm0 2h-4c-.276 0-.5.224-.5.5s.224.5.5.5h4c.276 0 .5-.224.5-.5s-.224-.5-.5-.5zm.25 2h-4.5l1.188.782c.154.138.38.218.615.218h.895c.234 0 .461-.08.615-.218l1.187-.782zm3.75-13.799c0 3.569-3.214 5.983-3.214 8.799h-1.989c-.003-1.858.87-3.389 1.721-4.867.761-1.325 1.482-2.577 1.482-3.932 0-2.592-2.075-3.772-4.003-3.772-1.925 0-3.997 1.18-3.997 3.772 0 1.355.721 2.607 1.482 3.932.851 1.478 1.725 3.009 1.72 4.867h-1.988c0-2.816-3.214-5.23-3.214-8.799 0-3.723 2.998-5.772 5.997-5.772 3.001 0 6.003 2.051 6.003 5.772zm4-.691v1.372h-2.538c.02-.223.038-.448.038-.681 0-.237-.017-.464-.035-.69h2.535zm-10.648-6.553v-1.957h1.371v1.964c-.242-.022-.484-.035-.726-.035-.215 0-.43.01-.645.028zm-3.743 1.294l-1.04-1.94 1.208-.648 1.037 1.933c-.418.181-.822.401-1.205.655zm10.586 1.735l1.942-1.394.799 1.115-2.054 1.473c-.191-.43-.423-.827-.687-1.194zm-3.01-2.389l1.038-1.934 1.208.648-1.041 1.941c-.382-.254-.786-.473-1.205-.655zm-10.068 3.583l-2.054-1.472.799-1.115 1.942 1.393c-.264.366-.495.763-.687 1.194zm13.707 6.223l2.354.954-.514 1.271-2.425-.982c.21-.397.408-.812.585-1.243zm-13.108 1.155l-2.356 1.06-.562-1.251 2.34-1.052c.173.433.371.845.578 1.243zm-1.178-3.676h-2.538v-1.372h2.535c-.018.226-.035.454-.035.691 0 .233.018.458.038.681z"/></svg>
                        </Light> */}


interface IProps {
    loading: boolean;
    onStep: (newStep: number) => {};
    step: number;
}
const MainPresenter: React.FC<IProps> = ({
    loading,
    onStep,
    step
}) => {
    return (
        <Container>
            {
                loading ? <SpinnerExtended /> :
                (
                    <Box>
                        {/* 1. 해야할 리스트를 보여주는 ListBox. */}
                        {/* 2. 최근 실행항목 확인하기. */}
                        <SlideScreen step={step}>
                            <Intro />
                            <Screen className={"screen"}>
                                <ListBox/>
                                <RecordBox />
                            </Screen>
                            <Intro />
                            {
                                step === 0 && <GoRecordBtn onClick={e => onStep(1)}>Records</GoRecordBtn>
                            }
                            {
                                step === 1 && <GoListBtn onClick={e => onStep(0)}>Lists</GoListBtn>
                            }
                            
                        </SlideScreen>
                        
                    </Box>
                )
            }
            
        </Container>
    )
};


export default MainPresenter;




















// import React from "react";
// import styled from "../../Styles/typed-components";
// import MenuItem from "../../Components/MenuItem";
// import { Link } from "react-router-dom";
// import Spinner from "../../Components/Spinner";

// const Container = styled.div`
//     width: 100%;
//     height: 100vh;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     &.active {
//         & > div {
//             transform: scale(1);
//             opacity: 1;
//             pointer-events: auto;
//             height: auto;
//         }
//     }
// `;
// const Wrapper = styled.div`
//     min-width: 400px;
//     height: 0;
//     max-height: 900px;
//     pointer-events: none;
//     transform: scale(.3);
//     opacity: 0;
//     transition: .3s;
//     transition-timing-function: ease-in-out;
// `;

// const NavigationMenu = styled.div`
//     position: relative;
//     width: 100%;
//     height: 100%;
//     box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0,.42);
//     border-radius: 1px;
//     overflow: hidden;
// `;
// const MenuHeader = styled.div`
//     position: relative;
//     width: 100%;
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     padding: 15px 10px;
//     padding-left: 100px;
//     font-size: 16px;
//     // background-color: rgba(250,250,250,.2);
//     background-color: #438cb5;
//     color: white;
//     box-shadow: 0 2px 4px rgba(0,0,0,.22), 0 4px 6px rgba(0,0,0,.32);
//     text-shadow: 0 2px 2px rgba(0,0,0,.24);
//     & svg {
//         // fill: darkorange;
//         fill: white;
//     }
// `;
// const HeaderText = styled.h3`
//     font-weight: 400;
//     margin: 0;
// `;
// const HeaderIcon = styled.div`
//     position: absolute;
//     top: 50%;
//     left: 28px;
//     transform: translateY(-50%);
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     padding: 5px;
//     & svg {

//     }
// `;
// const MenuScreen = styled.div`
//     width: 100%;
//     // height: 500px;
//     height: auto;
//     max-height: 634px;
//     overflow: auto;
//     // background: linear-gradient(0deg, rgba(184,239,255,1) 0%, rgba(11,185,171,1) 100%);
//     background-color: rgba(0,0,0,.2);
//     // background: linear-gradient(0deg, rgba(42,50,81,1) 0%, rgba(61,74,126,1) 100%);

//     ::-webkit-scrollbar {
//         width: 5px;
//         border-radius: 20px;
//     } 
//     ::-webkit-scrollbar-track {
//         // background-color: #bab9b6;
//         background: linear-gradient(0deg, rgba(34,40,195,1) 0%, rgba(121,184,204,1) 0%, rgba(232,141,181,1) 0%, rgba(206,25,144,1) 56%);
//         background: linear-gradient(90deg, rgba(60,87,147,1) 0%, rgba(78,236,151,1) 0%, rgba(29,214,194,1) 45%, rgba(18,191,211,1) 100%);
//         background: radial-gradient(circle, rgba(92,157,221,1) 50%, rgba(163,226,247,1) 100%);
//         border-radius: 20px;
//     }
   
//     ::-webkit-scrollbar-thumb {
//         border-radius: 20px;
//         background-color: rgba(0, 0, 0, 0.2); 
//         &:active {
//             background-color: black;
//         }
//     } 
   
//     ::-webkit-scrollbar-button {
//         // border-radius: 20px;
//         // height:2px;
//         // background-color: #7c2929;
//     } 
   
//     ::-webkit-scrollbar-corner {
//         background-color: black;
//     } 
// `;
// const SpinnerExtended = styled(Spinner)`
//     position: absolute;
//     top: 50%;
//     left: 50%;
//     transform: translate(-50%, -50%);
// `;
// const MenuItemExtended = styled(MenuItem)`
    
// `;
// interface IProps {
//     loading: boolean
// }

// const MainPresenter: React.FC<IProps> = ({
//     loading
// }) => (
//     <Container className={loading ? "main-page" : "active"}>
//         {
//             loading && <SpinnerExtended/>
//         }
//         <Wrapper>
//             <NavigationMenu>
//                 <MenuHeader>
//                     <HeaderText>PROFILE</HeaderText>
//                     <HeaderIcon>
//                         <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.757 20.171c-.791.524-1.739.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.018-.305 1.966-.829 2.757l2.829 2.829-1.414 1.414-2.829-2.829zm-7.654.829h-12.103v-20h7c1.695 1.942 2.371 3 4 3h11v7.103c-.574-.586-1.25-1.072-2-1.428v-3.675h-9c-2.339 0-3.537-1.388-4.917-3h-4.083v16h8.675c.356.75.842 1.426 1.428 2zm4.897-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z"/></svg>
//                     </HeaderIcon>
//                 </MenuHeader>
//                 <MenuScreen>
//                     <Link to={{
//                         pathname: "/home",
//                         state: {
//                             currentFile: "test"
//                         }
//                     }}
                    
//                     > 
//                         <MenuItemExtended
//                         className={"item--set"}
//                         no={1}
//                         title={"Herry Wood"}
//                         date={"19-03-22"}
//                         imgPath={"/tmp.PNG"}
//                         />
//                     </Link>
                    
//                     <MenuItemExtended 
//                     className={"item--Test"}
//                     no={2}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={3}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={4}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={5}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={1}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={1}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={1}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                     <MenuItemExtended 
//                     className={"item--set"}
//                     no={1}
//                     title={"Herry Wood"}
//                     date={"19-03-22"}
//                     imgPath={"/tmp.PNG"}
//                     />
//                 </MenuScreen>
//             </NavigationMenu>
//         </Wrapper>
        
//     </Container>
// );

// export default MainPresenter;