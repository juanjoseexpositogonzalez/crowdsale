// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./Token.sol";

contract Crowdsale {
    address public owner;
    Token public token;
    uint256 public price;
    uint256 public maxTokens;
    uint256 public tokensSold;
    mapping(address=>bool) public whitelist;

    event Buy(
        uint256 amount,
        address buyer
    );

    event Finalize(
        uint256 tokensSold,
        uint256 ethRaised
    );

    event Whitelisted(
        address whitelisted
    );

    event Blacklisted(
        address blacklisted
    );

    constructor(
        Token _token,
        uint256 _price,
        uint256 _maxTokens
    ) {
        owner = msg.sender;
        token = _token;
        price = _price;
        tokensSold = 0;
        maxTokens = _maxTokens;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, 'Caller is not the owner');
        _;
    }

    modifier onlyWhiteListed() {
        require(whitelist[msg.sender], 'Only Whitelisted users can buy tokens');
        _;
    }

    receive() external payable {
        uint256 amount = msg.value / price;
        buyTokens(amount * 1e18);
    }

    function buyTokens(uint256 _amount) public payable onlyWhiteListed {
        require(msg.value == (_amount / 1e18) * price);
        require(token.balanceOf(address(this)) >= _amount);
        require(token.transfer(msg.sender, _amount));

        tokensSold += _amount;

        emit Buy(_amount, msg.sender);
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function finalize() public onlyOwner {        
        require(token.transfer(owner, token.balanceOf(address(this))));

        uint256 value = address(this).balance;
        (bool sent, ) = owner.call{ value: value }("");
        require(sent);

        emit Finalize(tokensSold, value);
    }

    function addToWhitelist(address _people) public onlyOwner returns (bool success) {
        require(!whitelist[_people]);
        whitelist[_people] = true;

        emit Whitelisted(_people);
        return true;
    }

    function isWhitelisted(address _people) public view returns (bool whitelisted) {
        return whitelist[_people];
    }

    function removeFromWhitelist(address _people) public onlyOwner returns (bool success) {
        require(whitelist[_people]);
        whitelist[_people] = false;

        emit Blacklisted(_people);
        return true;
    }
    
}
