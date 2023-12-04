import Web3 from "web3";

export async function unlockAccount() { //metamask connection
    //@ts-ignore
    const {ethereum} = window

    if(!ethereum) {
        throw new Error("web3 not found")
    }

    const web3 = new Web3(ethereum)
    await ethereum.enable()
    
    const accounts  = await web3.eth.getAccounts()

    return {web3,acount:accounts[0] || ""}
}

export function subscribeToAccount(
    web3:Web3,
    callback: (error : Error | any, account : string | null) => any 
) {
    const id = setInterval(async () => {
        try {
            const accounts = await web3.eth.getAccounts()
            callback(null,accounts[0])            
        } catch (error) {
            callback(error,null)
        }
    },1000)
    //setInterval returns a nodejs timer object, we assign it to 'id'
    return () => {
        clearInterval(id) //we pass in the handle 'id' into clearInterval to stop setInterval
    }
}