// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract Commerce {
    string public name;
    address public owner;
    uint public listItemsCount;

    struct Item {
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    struct Order {
        uint256 time;
        Item item;
    }

    mapping(uint256 => Item) public items;
    mapping(address => uint256) public orderCount;
    mapping(address => mapping(uint256 => Order)) public orders;

    event Buy(address buyer, uint256 orderId, uint256 itemId);
    event List(string name, uint256 cost, uint256 quantity);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    constructor() {
        name = "E-Commerce";
        owner = msg.sender;
        listItemsCount = 0;
    }

    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public onlyOwner {
        Item memory item = Item(
            _id,
            _name,
            _category,
            _image,
            _cost,
            _rating,
            _stock
        );

        items[listItemsCount] = item;
        listItemsCount++;
        emit List(_name, _cost, _stock);
    }

    function getListItemById(
        uint256 _id
    ) public view onlyOwner returns (Item memory) {
        return items[_id];
    }

    function getListItems() public view returns (Item[] memory) {
        Item[] memory itemsArray = new Item[](listItemsCount);

        for (uint i = 0; i < listItemsCount; i++) {
            itemsArray[i] = items[i];
        }

        return itemsArray;
    }

    function buy(uint256 _id) public payable {
        Item memory item = items[_id];

        require(msg.value >= item.cost);
        require(item.stock > 0);

        Order memory order = Order(block.timestamp, item);

        orderCount[msg.sender]++;
        orders[msg.sender][orderCount[msg.sender]] = order;

        items[_id].stock = item.stock - 1;
        emit Buy(msg.sender, orderCount[msg.sender], item.id);
    }

    function withdraw() public onlyOwner {
        (bool success, ) = owner.call{value: address(this).balance}("");
        require(success);
    }
}
