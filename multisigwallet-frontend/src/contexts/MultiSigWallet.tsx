import Web3 from "web3";
import BN from "bn.js";
import React,{useReducer,useEffect,createContext,useContext,useMemo} from "react";
import { useWeb3Context } from "./Web3";
import {get as getMultiSigWallet,subscribe} from "../api/multi-sig-wallet";

//will get data from api/multi-sig-wallet.ts and render here

interface State {
    address: string;
    balance:string;
    owners:string[];
    numConfirmationsRequired:number;
    transactionCount:number;
    transactions:Transaction[]
}

interface Transaction {
    txIndex:number;
    to:string;
    value:BN;
    data:string;
    executed:boolean;
    numConfirmations:number;
    isConfirmedByCurrentAccount:boolean;
}

const INITIAL_STATE : State = {
    address:"",
    balance:"0",
    owners:[],
    numConfirmationsRequired:0,
    transactionCount:0,
    transactions:[],
}

//actions
const SET = "SET"
const UPDATE_BALANCE = "UPDATE_BALANCE"
const ADD_TX = "ADD_TX"
const UPDATE_TX = "UPDATE_TX"



