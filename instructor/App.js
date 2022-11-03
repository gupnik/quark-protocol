import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { EducationalText, SignInPrompt, SignOutButton } from './ui-components';
import { useQuery } from '@apollo/client';
import { questionsQuery } from './queries';

import PrivateRoute from './components/routing/PrivateRoute';
import PublicRoute from './components/routing/PublicRoute';

import Navigation from './components/common/Navigation';
import Dashboard from './pages/Dashboard';

export default function App({ isSignedIn, helloNEAR, wallet, web3StorageClient, graphClient }) {
    // const { loading, data } = useQuery(questionsQuery);
    // console.log(loading, data);

    // const [valueFromBlockchain, setValueFromBlockchain] = React.useState();

    // const [lastQuestion, setLastQuestion] = React.useState();
    // const [lastQuestionAnswers, setLastQuestionAnswers] = React.useState();

    // const [uiPleaseWait, setUiPleaseWait] = React.useState(true);

    // // Get blockchian state once on component load
    // React.useEffect(() => {
    //     helloNEAR
    //         .getQuestionCount()
    //         .then(setValueFromBlockchain)
    //         .catch(alert)
    //         .finally(() => {
    //             setUiPleaseWait(false);
    //         });
    // }, []);

    // React.useEffect(() => {
    //     if (valueFromBlockchain) {
    //         helloNEAR
    //             .getQuestion(valueFromBlockchain - 1)
    //             .then(setLastQuestion)
    //             .catch(alert)
    //             .finally(() => {
    //                 setUiPleaseWait(false);
    //             });
    //     }
    // }, [valueFromBlockchain]);

    // React.useEffect(() => {
    //     if (valueFromBlockchain && lastQuestion) {
    //         helloNEAR
    //             .getAnswers(valueFromBlockchain - 1)
    //             .then(setLastQuestionAnswers)
    //             .catch(alert)
    //             .finally(() => {
    //                 setUiPleaseWait(false);
    //             });
    //     }
    // }, [valueFromBlockchain, lastQuestion]);

    // // /// If user not signed-in with wallet - show prompt
    // // if (!isSignedIn) {
    // //     // Sign-in flow will reload the page later
    // //     return <SignInPrompt greeting={valueFromBlockchain} onClick={() => wallet.signIn()} />;
    // // }

    // async function ask(e) {
    //     e.preventDefault();
    //     setUiPleaseWait(true);
    //     const { questionInput } = e.target.elements;

    //     const cid = await web3StorageClient.put(
    //         [
    //             new File([questionInput.value], 'q.json', {
    //                 type: 'application/json',
    //             }),
    //         ],
    //         {
    //             name: 'q.json',
    //             maxRetries: 3,
    //         }
    //     );
    //     console.log(cid);
    //     await helloNEAR.ask(cid);
    //     setValueFromBlockchain(await helloNEAR.getQuestionCount());
    //     setUiPleaseWait(false);
    // }

    // function answer(e) {
    //     e.preventDefault();
    //     setUiPleaseWait(true);
    //     const { answerInput } = e.target.elements;
    //     helloNEAR
    //         .answer(parseInt(valueFromBlockchain - 1), answerInput.value)
    //         .then(async () => {
    //             return helloNEAR.getQuestionCount();
    //         })
    //         .then(setValueFromBlockchain)
    //         .finally(() => {
    //             setUiPleaseWait(false);
    //         });
    // }

    return (
        <div className="App">
            <Router>
                <Navigation />
                <Switch>
                    <PublicRoute path="/dashboard" component={Dashboard} exact />
                </Switch>
            </Router>
        </div>
        // <>
        //     <SignOutButton accountId={wallet.accountId} onClick={() => wallet.signOut()} />
        //     <main className={uiPleaseWait ? 'please-wait' : ''}>
        //         <h1>
        //             Number of questions: <span className="greeting">{valueFromBlockchain}</span>
        //         </h1>
        //         <form onSubmit={answer} className="change">
        //             <label>
        //                 Last Question: <span className="greeting">{lastQuestion}</span>
        //             </label>
        //             <label>
        //                 Last Question Answers: <span className="greeting">{JSON.stringify(lastQuestionAnswers)}</span>
        //             </label>
        //             <div>
        //                 <input autoComplete="off" defaultValue={''} id="answerInput" />
        //                 <button>
        //                     <span>Save</span>
        //                     <div className="loader"></div>
        //                 </button>
        //             </div>
        //         </form>
        //         <form onSubmit={ask} className="change">
        //             <label>Ask Question:</label>
        //             <div>
        //                 <input autoComplete="off" defaultValue={''} id="questionInput" />
        //                 <button>
        //                     <span>Save</span>
        //                     <div className="loader"></div>
        //                 </button>
        //             </div>
        //         </form>
        //         <EducationalText />
        //     </main>
        // </>
    );
}
