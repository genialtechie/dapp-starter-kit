App = {
    web3Provider: null,
    contracts: {},
    currentAccount: null,

    initWeb3: async function(){
        // Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
            // Request account access
            await ethereum.request({method: 'eth_requestAccounts'});
            //if accounts are succesfully accessed, change UI
            $('#loading').addClass('hide');
            } catch (error) {
            // User denied account access...
            console.error("User denied account access");
            alert('Please connect MetaMask to use HBO Wallet');
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://127.0.0.1:7545');
        }
        web3 = new Web3(App.web3Provider);
        return App.initContract();
    },

    initContract: function(){
        $.getJSON('DappContract.json', function(data) {
            // Get the necessary contract artifact file and instantiate it with @truffle/contract
            const artifact = data;
            App.contracts.DappContract = TruffleContract(artifact);
          
            // Set the provider for contract
            App.contracts.DappContract.setProvider(App.web3Provider);
          
            // Use contract to retrieve necessary data here

            return 
        });
    }
}

$(function() {
    $(window).load(function() {
      App.initWeb3();
    });
});