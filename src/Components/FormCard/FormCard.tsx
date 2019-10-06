import React from "react";
import styled from "../../Styles/typed-components";

const Container = styled.div`
    
`;
const EffectWrapper = styled.div`
    position: relative;
`;
const Effect = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 100%;
    &::before {
        content: "";
        position: absolute;
        top: -2px;
        left: -2px;
        width: 100%;
        height: 50%;
        transform: skew(2deg, 2deg);
    }
    &::after {
        content: "";
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        background-color: white;
    }
`;
const LeftEffect = styled(Effect)`
    &::before {
        background-color: #3f4fa8;
    }
    &::after {
        background-color: #000000;
    }
`;
const RightEffect = styled(Effect)`
    top: 0; 
    left: auto;
    right: 0;
    &::before {
        background-color: #99bcf6;
        top: auto;
        left: auto;
        bottom: -2px;
        right: -2px;
    }
    &::after {
        background-color: #47d1ae;
    }
`;
const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 334px;
    padding: 30px 20px;
    // background-color: #f1f5f6;
    background-color: white;
`;
const Title = styled.div`
   margin-left: 10px;
`;
const Logo = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    color: #00bcd4;
    & svg {
        fill: #00bcd4;
    }
`;

interface IProps extends React.PropsWithChildren<any>{
    className: string;
    title: string;
    svgPath: string;
}
const FormCard: React.FC<IProps> = ({
    children,
    title,
    className,
    svgPath
}) => (
    <Container className={className}>
        <EffectWrapper>
            <LeftEffect />
            <RightEffect />
            <Wrapper>
                <Logo>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                        <path d={svgPath}/>
                    </svg>
                    <Title>
                        {title}
                    </Title>
                </Logo>
                
                {
                    children
                }
            </Wrapper>
        </EffectWrapper>
        
    </Container>
);

export default FormCard;