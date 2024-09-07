// SPDX-License-Identifier: GPL-3.0
 
pragma solidity 0.8.27;

contract Example{

    uint256 number;

    function setNumber(uint256 _number) public {
        number = _number;
    }

    function getNumber() public view returns(uint256){
        return number;
    }

}