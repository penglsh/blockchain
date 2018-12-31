pragma solidity ^0.4.24;
contract Secondhand_goods_transaction {
    // the address of the tramsaction's two sides
    address public seller;
    address public buyer;

    // traders who exchange goods
    address public trader1;

    address public trader2;

    uint public value;

    // the secondhand goods
    struct secondhand_good {
        // bytes32 description;
        address seller;
        string name;
        string description;
        uint value;
        bool for_sale;
        bool selling;
        bool has_sold;
    }
    // the mapping of traders and his secondhand_good
    //mapping(address => secondhand_good) public secondhand_goods;
    secondhand_good[] public secondhand_goods;


    constructor() public {
        //trader = msg.sender;

        // state[msg.sender] = State.INACTIVE;
    }

    // be sure the trader exists
    modifier isExisted(address addr) {
        address zero = address(0);
        require(
            addr != zero,
            "The trader does not exist!"
        );
        _;
    }

    // the function to start a transaction
    function start_a_transaction(string name, string des, uint val)
    public
        // inState(msg.sender, State.INACTIVE)
    {
        seller = msg.sender;
        //		secondhand_goods[seller].description = des;
        //	    secondhand_goods[seller].value = val;
        //        exchangeFlag[msg.sender] = false;
        secondhand_goods.push(secondhand_good({
            seller: seller,
            name: name,
            description: des,
            value: val,
            for_sale: true,
            selling: false,
            has_sold: false
            }));
        // state[seller] = State.CREATED;
    }

    // function to purchase a secondhand good
    // seller is the seller's address,
    // val is the value the buyer pays
    function purchase(uint index, uint val)
        public
    {
        buyer = msg.sender;
        address seller1 = secondhand_goods[index].seller;
        require(
            secondhand_goods[index].for_sale == true,
            "Good is not for sale."
        );
        require(
            seller1 != buyer,
            "The trader who created this transaction can not call this."
        );
        require(
            val == secondhand_goods[index].value,
            "The value you pay is not incorrect."
        );

        // lock the transaction to avoid othres to interfere
        // state[seller1] = State.LOCKED;
        secondhand_goods[index].for_sale = false;
        secondhand_goods[index].selling = true;
    }

    // function for buyer to confirm to receive the good
    function confirmReceivedForPurchasing(uint index)
        public
    {
        secondhand_goods[index].selling = false;
        secondhand_goods[index].has_sold = true;

        //buyer.transfer(secondhand_goods[addr].value);
        //trader.transfer(this.balance);
    }

    // function ask for trader to exchange good
    function ask_to_exchange(uint index, uint index1)
        public
        returns (uint, uint)
        // inState(msg.sender, State.CREATED)
    {
        require(
            secondhand_goods[index].for_sale == true,
            "Good is not for sale."
        );

        secondhand_goods[index1].for_sale = false;
        secondhand_goods[index1].selling = true;

        trader1 = msg.sender;
        return (index, index1);
        // exchangeFlag[msg.sender] = true;
    }

    // function answer for trader to exchange good
    function answer_to_exchange(uint index, uint index1)
        public
    {
        require(
            secondhand_goods[index1].selling == true,
            "Good is not for sale."
        );
        trader2 = msg.sender;
        secondhand_goods[index].for_sale = false;
        secondhand_goods[index].selling = true;
        // exchangeFlag[msg.sender] = true;
    }

    // function to exchange good
    function exchange_goods(uint index, uint index1) public
    {
        // traders can not be the same people
        require(
            trader1 != trader2,
            "The two sides of transaction can not be the same people."
        );
        require(
            secondhand_goods[index].selling == true &&
            secondhand_goods[index1].selling == true,
            "Trader do not reach an agreement for exchanging."
        );

        secondhand_goods[index].selling = false;
        secondhand_goods[index].has_sold = true;
        secondhand_goods[index1].selling = false;
        secondhand_goods[index1].has_sold = true;
    }

    function get_goods_list_len()
        public view returns(uint)
    {
        return secondhand_goods.length;
    }

    function get_good(uint index) public view
        returns (
            address,
            string,
            string,
            uint,
            bool,
            bool,
            bool
        )
    {
        return(
           secondhand_goods[index].seller,
           secondhand_goods[index].name,
           secondhand_goods[index].description,
           secondhand_goods[index].value,
           secondhand_goods[index].for_sale,
           secondhand_goods[index].selling,
           secondhand_goods[index].has_sold
        );
    }
}
