import React, {useReducer,createContext,useContext,useEffect,useMemo} from "react";
import Web3 from "web3";
import { subscribeToAccount } from "../api/web3";

interface State {
    account : string;
    web3: Web3 | null;
}

const INITIAL_STATE : State = {
    account:"",
    web3:null,
}

const UPDATE_ACCOUNT = "UPDATE_ACCOUNT"