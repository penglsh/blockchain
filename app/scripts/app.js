// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'

// Import our contract artifacts and turn them into usable abstractions.
// import metaCoinArtifact from '../../build/contracts/MetaCoin.json'
import secondhandArtifact from '../../build/contracts/Secondhand_goods_transaction.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
// const MetaCoin = contract(metaCoinArtifact)
const Secondhand = contract(secondhandArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account
let balances = new Map()
let username = ''
let user_addr = ''

const App = {
  start: function () {
    const self = this

    // Bootstrap the MetaCoin abstraction for Use.
    Secondhand.setProvider(web3.currentProvider)

    // Get the initial account balance so it can be displayed.
    web3.eth.getAccounts(function (err, accs) {
      if (err != null) {
        alert('There was an error fetching your accounts.')
        return
      }

      if (accs.length === 0) {
        alert('Couldn\'t get any accounts! Make sure your Ethereum client is configured correctly.')
        return
      }

      accounts = accs
      account = accounts[0]

      //self.refreshBalance()
    })
  },

  update_table: () => {
    var ins
    let len
    Secondhand.deployed().then((instance) => {

    })
  },

  log_in:(name, addr) =>{
    console.log(name);
    var curr_ba = 100;
    //alert(name)
    if (!balances.has(addr)) {
      balances.set(addr, 100);
    }
    else {
      curr_ba = balances.get(addr);
    }
    $("#seller_name").text('Seller: ' + name);
    $("#seller_addr").text('Address: '+ addr);
    $("#balance").text('Balance: ' + curr_ba);
    username = name;
    user_addr = addr;
  },

  start_a_trade:(good_name, des, value) => {

  },

  puchase:()=> {

  },

  confirm_purchasing:() => {

  },

  ask_to_exchange: () => {

  },

  answer_to_exchange: () => {

  },

  exchange_goods: () => {

  }
}

window.App = App

window.addEventListener('load', function () {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if (typeof web3 !== 'undefined') {
    console.warn(
      'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // Use Mist/MetaMask's provider
    window.web3 = new Web3(web3.currentProvider)
  } else {
    console.warn(
      'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
    )
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
  }

  App.start()
})
