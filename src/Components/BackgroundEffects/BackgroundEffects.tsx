import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
`;

const EffectWrapperLeft = styled.span`
    display: block;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    // background: linear-gradient(0deg, rgba(34,40,195,1) 0%, rgba(121,184,204,1) 0%, rgba(232,141,181,1) 0%, rgba(206,25,99,1) 56%);
    background: linear-gradient(90deg, rgba(60,87,147,1) 0%, rgba(78,236,151,1) 0%, rgba(29,214,194,1) 45%, rgba(18,191,211,1) 100%);
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
`;
const EffectWrapperRight = styled.span`
    display: block;
    width: 160px;
    height: 15px;
    border-radius: 50px;
    background: linear-gradient(90deg, rgba(60,87,147,1) 0%, rgba(78,236,151,1) 0%, rgba(29,214,194,1) 45%, rgba(18,191,211,1) 100%);
    box-shadow: 0 2px 4px rgba(0,0,0,.24);
`;
const Effect = styled.div`
    position: absolute;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 200px;
    height: 15px;
    top: 20px;
    left: 10px;
    transform: rotateZ(-30deg);

    transform: rotateZ(-41deg);
    top: 35px;
    left: -111px;
    width: 256px;
`;
const EffectWrapperLeftExtended_1 = styled(EffectWrapperLeft)`
    background: #06f2a0;
`;
const EffectWrapperRightExtended_1 = styled(EffectWrapperRight)``
const EffectExtended_1 = styled(Effect)`
`;
const EffectExtended_2 = styled(Effect)`
    top: 51px;
    left: -8px;
    width: 256px;
`;
const EffectWrapperLeftExtended_2 = styled(EffectWrapperLeft)`
    width: 200px; 
    height: 15px;
    border-radius: 20px;
`;  
const EffectWrapperRightExtended_2 = styled(EffectWrapperRight)`
    width: 30px; 
    height: 15px;
    border-radius: 10px;
`;
const EffectExtended_3 = styled(Effect)`
    top: 112px;
    left: -50px;
    width: 270px;
`;
const EffectWrapperLeftExtended_3 = styled(EffectWrapperLeft)`
    width: 200px;
    height: 15px;
    border-radius: 30px;
    background: #46e89e;
`;
const EffectWrapperRightExtended_3 = styled(EffectWrapperRight)`
    width: 40px;
    height: 15px;
    border-radius: 30px;
`;
const EffectExtended_4 = styled(Effect)`
    top: 58px;
    left: 132px;
    width: 220px;
`;
const EffectWrapperLeftExtended_4 = styled(EffectWrapperLeft)`
    width: 40px;
    height: 100%;
    border-radius: 30px; 
`;
const EffectWrapperRightExtended_4 = styled(EffectWrapperRight)`
    width: 150px;
    height: 100%;
    border-radius: 30px;
    background: linear-gradient(90deg, rgba(58,89,180,1) 0%, rgba(29,218,253,1) 0%, rgba(96,107,246,1) 100%);
`;
const EffectExtended_5 = styled(Effect)`
    top: 100px;
    left: 50px;
    width: 300px;
`;
const EffectWrapperLeftExtended_5 = styled(EffectWrapperLeft)`
    width: 30px;
    height: 100%;
    border-radius: 30px;

`;
const EffectWrapperRightExtended_5 = styled(EffectWrapperRight)`
    width: 200px;
    height: 100%;
    border-radius: 30px;
`;
const BackgroundEffects = () => (
    <Container>
        <EffectExtended_1>
            <EffectWrapperLeftExtended_1/>
            <EffectWrapperRightExtended_1/>
        </EffectExtended_1>
        {/* <EffectExtended_2>
            <EffectWrapperLeftExtended_2 />
        </EffectExtended_2>
        <EffectExtended_3>
            <EffectWrapperLeftExtended_3 />
            <EffectWrapperRightExtended_3 />
        </EffectExtended_3>
        <EffectExtended_4>
            <EffectWrapperLeftExtended_4 />
            <EffectWrapperRightExtended_4 />
        </EffectExtended_4> */}
    </Container>
);

export default BackgroundEffects;