import  * as StyleThings from "styled-components";
import { ThemedStyledComponentsModule } from "styled-components";
import { ITheme } from "../Types/types";

const {
    default: styled,
    keyframes,
    createGlobalStyle,
    ThemeProvider
} = StyleThings as ThemedStyledComponentsModule<ITheme>;

export default styled;
export { keyframes, createGlobalStyle, ThemeProvider };