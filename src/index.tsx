import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import App from './App';
import { client } from './apollo';
import GlobalStyles from './Styles/global-styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// export const AppStart = () => {
//     ReactDOM.render( 
//         <ApolloProvider client={client}>
//             <App />
//             <GlobalStyles />
//             <ToastContainer position={"bottom-center"} autoClose={5000}/>
//         </ApolloProvider>,
//     document.getElementById('root'));
// }
ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
        <GlobalStyles />
        <ToastContainer position={"bottom-center"} autoClose={5000}/>
    </ApolloProvider>,
document.getElementById('root'));