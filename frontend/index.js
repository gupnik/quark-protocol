// React
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// NEAR
import { HelloNEAR } from './near-interface';
import { Wallet } from './near-wallet';

import { Web3Storage } from 'web3.storage/dist/bundle.esm.min';

// When creating the wallet you can optionally ask to create an access key
// Having the key enables to call non-payable methods without interrupting the user to sign
const wallet = new Wallet({ createAccessKeyFor: process.env.CONTRACT_NAME });

// Abstract the logic of interacting with the contract to simplify your flow
const helloNEAR = new HelloNEAR({ contractId: process.env.CONTRACT_NAME, walletToUse: wallet });

const web3StorageClient = new Web3Storage({
    token: process.env.REACT_PUBLIC_WEB_STORAGE_TOKEN,
});

// Setup on page load
window.onload = async () => {
    const isSignedIn = await wallet.startUp();

    ReactDOM.render(
        <App isSignedIn={isSignedIn} helloNEAR={helloNEAR} wallet={wallet} web3StorageClient={web3StorageClient} />,
        document.getElementById('root')
    );
};
