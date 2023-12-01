const MultiSigWallet = artifacts.require("MultiSigWallet")
//deployed to : 0x3035c0d23634339b76f48db5f2b10c9e04047d5dac8c8116ac18ec74a3ea4b76 on local

module.exports = function(deployer,network,accounts) {
    const owners = accounts.slice(0,3)
    const numConfirmationsRequired = 2
    deployer.deploy(MultiSigWallet,owners,numConfirmationsRequired) // contract and constructor parameters
}