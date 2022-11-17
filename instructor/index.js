// React
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import store from './store';

// NEAR
import { HelloNEAR } from './near-interface';
import { Wallet } from './near-wallet';
import { QWalletProvider } from './hooks/useQWallet';

import { Web3Storage } from 'web3.storage/dist/bundle.esm.min';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const web3StorageClient = new Web3Storage({
    token: process.env.REACT_PUBLIC_WEB_STORAGE_TOKEN,
});

const graphClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/gupnik/ama-near',
    cache: new InMemoryCache(),
});

// Setup on page load
window.onload = async () => {
    const isSignedIn = await wallet.startUp();

    ReactDOM.render(
        <Provider store={store}>
            <ApolloProvider client={graphClient}>
                <QWalletProvider wallet={wallet} isSignedIn={isSignedIn} helloNEAR={helloNEAR}>
                    <App web3StorageClient={web3StorageClient} graphClient={graphClient} isSignedIn={isSignedIn}  wallet={wallet} />
                </QWalletProvider>
            </ApolloProvider>
        </Provider>,
        document.getElementById('root')
    );
};
