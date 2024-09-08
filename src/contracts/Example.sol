// SPDX-License-Identifier: GPL-3.0
 
pragma solidity 0.8.27;

contract Example{

    uint256 number;
    string str;
    uint256[] array;

    function setNumber(uint256 _number) external {
        number = _number;
    }

    function setString(string calldata _string) external {
        str = _string;
    }

    function setArray(uint256 _number) external {
        array.push(_number);
    }

    function getNumber() public view returns(uint256){
        return number;
    }

    function getString() external view returns(string memory){
        return str;
    }

    function getArray() external view returns(uint256[] memory){
        return array;
    }

}