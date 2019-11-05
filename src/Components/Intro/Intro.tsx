import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.3333%;
    height: 100%;
    flex-flow: column;
    background: url(https://images.unsplash.com/photo-1572583860281-a78290d07ae3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=60);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;
const Bg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    opacity: .9;
    background: linear-gradient(0deg,rgba(34,40,195,1) 0%,rgba(56,191,219,1) 0%,rgba(45,98,253,1) 66%,rgba(45,98,253,1) 84%);
    width: 100%;
    height: 100%;
;`;
const Logo = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    & svg {
        fill: lightgray;
    }
`;
const Title = styled.h3`
    position: relative;
    margin: 20px 0;
    text-align: center;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,.2);
`;
const Content = styled.h5`
    position: relative;
    text-align: center;
    margin: 0;
    color: lightgray;
    text-shadow: 0 2px 4px rgba(0,0,0,.2);
`;
interface IProps {
    step: number;
}
const Intro: React.FC<IProps> = ({
    step
}) => (
    <Container>
        <Bg/>
        <Logo>
            {
                step === 0 ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M16 18h-8v-1h8v1zm-2 1h-6v1h6v-1zm10-14v13h-4v6h-16v-6h-4v-13h4v-5h16v5h4zm-18 0h12v-3h-12v3zm12 10h-12v7h12v-7zm4-8h-20v9h2v-3h16v3h2v-9zm-1.5 1c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"/></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path d="M6 22v-16h16v7.543c0 4.107-6 2.457-6 2.457s1.518 6-2.638 6h-7.362zm18-7.614v-10.386h-20v20h10.189c3.163 0 9.811-7.223 9.811-9.614zm-10 1.614h-5v-1h5v1zm5-4h-10v1h10v-1zm0-3h-10v1h10v-1zm2-7h-19v19h-2v-21h21v2z"/></svg>        
                )
            }
        </Logo>
        <Title>
            {
                step === 0 ? "Printer Middleware" : "Recent Records"
            }
        </Title>        
        {
            step === 0 ? (
            <Content>
                It makes it easy to work with<br /> complex documents.
            </Content>
            ) : (
                <Content>
                    You can check the recently executed<br /> document work.
                </Content>
            )
        }
    </Container>
);

export default Intro;