import React, { useContext, useEffect, useState } from 'react';
import { Wallet } from '../near-wallet';
import { HelloNEAR } from '../near-interface';

export interface QWallet {
    wallet: any | undefined,
    isSignedIn: Boolean,
    helloNear: any | undefined
}

const QWalletContext: React.Context<QWallet> =
  React.createContext<QWallet>({
    wallet: undefined,
    isSignedIn: false,
    helloNEAR: undefined
})

export function QWalletProvider({ isSignedIn, wallet, helloNEAR, children }: any) {
    return (
        <QWalletContext.Provider
          value={{
            wallet,
            isSignedIn,
            helloNEAR
          }}>
          {children}
        </QWalletContext.Provider>
      )
}

export function useQWallet(): QWallet {
  return useContext(QWalletContext)
}