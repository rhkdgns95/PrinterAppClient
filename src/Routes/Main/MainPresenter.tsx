import React from "react";
import styled from "../../Styles/typed-components";
import MenuItem from "../../Components/MenuItem";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    &.active {
        & > div {
            transform: scale(1);
            opacity: 1;
            pointer-events: auto;
            height: auto;
        }
    }
`;
const Wrapper = styled.div`
    min-width: 400px;
    height: 0;
    max-height: 900px;
    pointer-events: none;
    transform: scale(.3);
    opacity: 0;
    transition: .3s;
    transition-timing-function: ease-in-out;
`;

const NavigationMenu = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: 0 2px 4px rgba(0,0,0,.24), 0 6px 12px rgba(0,0,0,.42);
    border-radius: 1px;
    overflow: hidden;
`;
const MenuHeader = styled.div`
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 10px;
    padding-left: 100px;
    font-size: 16px;
    // background-color: rgba(250,250,250,.2);
    background-color: #438cb5;
    color: white;
    box-shadow: 0 2px 4px rgba(0,0,0,.22), 0 4px 6px rgba(0,0,0,.32);
    text-shadow: 0 2px 2px rgba(0,0,0,.24);
    & svg {
        // fill: darkorange;
        fill: white;
    }
`;
const HeaderText = styled.h3`
    font-weight: 400;
    margin: 0;
`;
const HeaderIcon = styled.div`
    position: absolute;
    top: 50%;
    left: 28px;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    & svg {

    }
`;
const MenuScreen = styled.div`
    width: 100%;
    // height: 500px;
    height: auto;
    max-height: 634px;
    overflow: auto;
    // background: linear-gradient(0deg, rgba(184,239,255,1) 0%, rgba(11,185,171,1) 100%);
    background-color: rgba(0,0,0,.2);
    // background: linear-gradient(0deg, rgba(42,50,81,1) 0%, rgba(61,74,126,1) 100%);

    ::-webkit-scrollbar {
        width: 5px;
        border-radius: 20px;
    } 
    ::-webkit-scrollbar-track {
        // background-color: #bab9b6;
        background: linear-gradient(0deg, rgba(34,40,195,1) 0%, rgba(121,184,204,1) 0%, rgba(232,141,181,1) 0%, rgba(206,25,144,1) 56%);
        background: linear-gradient(90deg, rgba(60,87,147,1) 0%, rgba(78,236,151,1) 0%, rgba(29,214,194,1) 45%, rgba(18,191,211,1) 100%);
        background: radial-gradient(circle, rgba(92,157,221,1) 50%, rgba(163,226,247,1) 100%);
        border-radius: 20px;
    }
   
    ::-webkit-scrollbar-thumb {
        border-radius: 20px;
        background-color: rgba(0, 0, 0, 0.2); 
        &:active {
            background-color: black;
        }
    } 
   
    ::-webkit-scrollbar-button {
        // border-radius: 20px;
        // height:2px;
        // background-color: #7c2929;
    } 
   
    ::-webkit-scrollbar-corner {
        background-color: black;
    } 
`;
const SpinnerExtended = styled(Spinner)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;
const MenuItemExtended = styled(MenuItem)`
    
`;
interface IProps {
    loading: boolean
}

const MainPresenter: React.FC<IProps> = ({
    loading
}) => (
    <Container className={loading ? "main-page" : "active"}>
        {
            loading && <SpinnerExtended/>
        }
        <Wrapper>
            <NavigationMenu>
                <MenuHeader>
                    <HeaderText>PROFILE</HeaderText>
                    <HeaderIcon>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M19.757 20.171c-.791.524-1.739.829-2.757.829-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1.018-.305 1.966-.829 2.757l2.829 2.829-1.414 1.414-2.829-2.829zm-7.654.829h-12.103v-20h7c1.695 1.942 2.371 3 4 3h11v7.103c-.574-.586-1.25-1.072-2-1.428v-3.675h-9c-2.339 0-3.537-1.388-4.917-3h-4.083v16h8.675c.356.75.842 1.426 1.428 2zm4.897-8c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z"/></svg>
                    </HeaderIcon>
                </MenuHeader>
                <MenuScreen>
                    <Link to={{
                        pathname: "/home",
                        state: {
                            currentFile: "test"
                        }
                    }}
                    
                    > 
                        <MenuItemExtended
                        className={"item--set"}
                        no={1}
                        title={"Herry Wood"}
                        date={"19-03-22"}
                        imgPath={"/tmp.PNG"}
                        />
                    </Link>
                    
                    <MenuItemExtended 
                    className={"item--Test"}
                    no={2}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={3}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={4}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={5}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={1}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={1}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={1}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                    <MenuItemExtended 
                    className={"item--set"}
                    no={1}
                    title={"Herry Wood"}
                    date={"19-03-22"}
                    imgPath={"/tmp.PNG"}
                    />
                </MenuScreen>
            </NavigationMenu>
        </Wrapper>
        
    </Container>
);

export default MainPresenter;