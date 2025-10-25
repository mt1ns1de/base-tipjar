// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/// @title BaseTipJar - minimal tip-jar contract for Base mainnet
/// @notice Anyone can send tips to the owner in ETH; the owner can change payout address and withdraw tips.
/// @dev Emits events for frontend tracking; simple pull-payment pattern.
contract BaseTipJar {
    address public owner;

    event Tipped(address indexed from, uint256 amount, string message);
    event Withdrawal(address indexed to, uint256 amount);
    event OwnerChanged(address indexed oldOwner, address indexed newOwner);

    error NotOwner();
    error ZeroAddress();
    error NothingToWithdraw();

    constructor(address _owner) payable {
        owner = _owner == address(0) ? msg.sender : _owner;
        emit OwnerChanged(address(0), owner);
    }

    /// @notice Send a tip with an optional message
    function tip(string calldata message_) external payable {
        require(msg.value > 0, "No ETH sent");
        emit Tipped(msg.sender, msg.value, message_);
    }

    /// @notice Update the owner address
    function setOwner(address newOwner) external {
        if (msg.sender != owner) revert NotOwner();
        if (newOwner == address(0)) revert ZeroAddress();
        emit OwnerChanged(owner, newOwner);
        owner = newOwner;
    }

    /// @notice Withdraw full contract balance to the current owner
    function withdraw() external {
        if (msg.sender != owner) revert NotOwner();
        uint256 bal = address(this).balance;
        if (bal == 0) revert NothingToWithdraw();
        (bool ok, ) = owner.call{value: bal}("");
        require(ok, "Transfer failed");
        emit Withdrawal(owner, bal);
    }

    /// @notice Accept plain ETH transfers
    receive() external payable {
        emit Tipped(msg.sender, msg.value, "");
    }
}

