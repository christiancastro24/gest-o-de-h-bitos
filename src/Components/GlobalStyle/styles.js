import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle `

    :root {
        --background: #30336B;
        --black: #000;
        --pink: #B5179E;
        --lightGreen: #1FDED4;
        --lightBlue: #1C90B4;
        --purple: #7D69CB;
        --white: #FFF;
    }

    h1 {
        font-family: 'Oleo Script Swash Caps', cursive;
        font-size: 3rem;
    }
    

    body {
        background-color: var(--background);
    }
`
export const Window = styled.div`
	width: 100%;
`;