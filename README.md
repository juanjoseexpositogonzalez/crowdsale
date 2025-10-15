# 🚀 DApp Token Crowdsale Platform

A comprehensive full-stack decentralized application (DApp) for conducting token crowdsales on the Ethereum blockchain. This project combines smart contracts written in Solidity with a modern React frontend to provide a complete crowdsale experience.

![Solidity](https://img.shields.io/badge/Solidity-0.8.9-blue)
![React](https://img.shields.io/badge/React-18.0.0-blue)
![Hardhat](https://img.shields.io/badge/Hardhat-2.9.1-yellow)
![Ethereum](https://img.shields.io/badge/Ethereum-Compatible-green)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Smart Contracts](#-smart-contracts)
- [Frontend Application](#-frontend-application)
- [Getting Started](#-getting-started)
- [Installation](#-installation)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)
- [Security Considerations](#-security-considerations)
- [License](#-license)

## 🎯 Overview

This DApp Token Crowdsale Platform enables organizations to launch secure, transparent, and decentralized token sales. The platform consists of two main components:

1. **Smart Contracts**: ERC-20 token and crowdsale contracts deployed on Ethereum
2. **Web Interface**: React-based frontend for interacting with the contracts

The platform supports dynamic pricing, real-time progress tracking, and secure token distribution with comprehensive testing coverage.

## ✨ Features

### Smart Contract Features
- ✅ **ERC-20 Token Implementation**: Full-featured token with transfer, approval, and allowance mechanisms
- ✅ **Secure Crowdsale Logic**: Protected token purchase functionality with proper validations
- ✅ **Dynamic Pricing**: Owner can update token prices during the sale
- ✅ **Direct ETH Transfers**: Support for direct ETH sends to contract address
- ✅ **Sale Finalization**: Owner can finalize sale and withdraw remaining tokens/ETH
- ✅ **Event Emissions**: Comprehensive event logging for all major operations
- ✅ **Access Control**: Owner-only functions with proper modifiers

### Frontend Features
- 🎨 **Modern UI**: Clean, responsive interface built with React Bootstrap
- 📊 **Real-time Progress**: Live tracking of tokens sold and remaining supply
- 💰 **Current Pricing**: Dynamic display of current token prices in ETH
- 👛 **Wallet Integration**: MetaMask and Web3 provider support
- 📱 **Responsive Design**: Mobile-friendly interface
- ⚡ **Live Updates**: Real-time blockchain state synchronization
- 🔄 **Transaction Feedback**: Loading states and transaction confirmations

## 🏗️ Architecture

The project follows a modern DApp architecture pattern:

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Client  │    │  Smart Contract │    │   Ethereum      │
│                 │◄──►│   (Crowdsale)   │◄──►│   Network       │
│   - Web3 UI     │    │   - Token Sale  │    │   - Blockchain  │
│   - MetaMask    │    │   - ERC-20      │    │   - State       │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 📄 Smart Contracts

### Token Contract (`Token.sol`)
A fully compliant ERC-20 token implementation with the following features:

```solidity
// Key Functions
- transfer(address _to, uint256 _value)
- approve(address _spender, uint256 _value)
- transferFrom(address _from, address _to, uint256 _value)
- balanceOf(address _owner)
- allowance(address _owner, address _spender)
```

**Key Properties:**
- Name: "Dapp University"
- Symbol: "DAPP"
- Decimals: 18
- Total Supply: 1,000,000 tokens

### Crowdsale Contract (`Crowdsale.sol`)
The main crowdsale contract managing the token distribution:

```solidity
// Key Functions
- buyTokens(uint256 _amount) payable
- setPrice(uint256 _price) onlyOwner
- finalize() onlyOwner
- receive() external payable // For direct ETH transfers
```

**Key Features:**
- Dynamic pricing mechanism
- Automatic token distribution
- ETH collection and withdrawal
- Emergency finalization capability
- Comprehensive event logging

## 🎨 Frontend Application

### Technology Stack
- **React 18**: Modern functional components with hooks
- **Bootstrap 5**: Responsive styling and components
- **Ethers.js**: Ethereum blockchain interaction
- **React Bootstrap**: Pre-built UI components
- **Redux**: State management (configured)

### Key Components
- **Navigation**: Wallet connection and network status
- **Buy**: Token purchase interface
- **Progress**: Visual sale progress tracking
- **Info**: Account balance and transaction history
- **Loading**: Elegant loading states

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MetaMask browser extension
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/juanjoseexpositogonzalez/crowdsale.git
cd crowdsale
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment**
```bash
# Copy environment template
cp .env.example .env

# Edit .env with your configuration
nano .env
```

4. **Compile smart contracts**
```bash
npx hardhat compile
```

5. **Start local blockchain**
```bash
npx hardhat node
```

6. **Deploy contracts (in new terminal)**
```bash
npx hardhat run scripts/deploy.js --network localhost
```

7. **Start React application**
```bash
npm start
```

## 🧪 Testing

The project includes comprehensive test coverage for all smart contract functionality.

### Run Tests
```bash
# Run all tests
npx hardhat test

# Run with coverage
npx hardhat coverage

# Run specific test file
npx hardhat test test/Crowdsale.js

# Run tests with gas reporting
REPORT_GAS=true npx hardhat test
```

### Test Coverage
The test suite covers:
- ✅ Contract deployment and initialization
- ✅ Token purchase functionality
- ✅ Direct ETH transfer handling
- ✅ Price update mechanisms
- ✅ Access control and security
- ✅ Sale finalization process
- ✅ Event emission verification
- ✅ Error handling and edge cases

### Sample Test Output
```
  Crowdsale
    Deployment
      ✓ checks the ownership
      ✓ sends tokens to Crowdsale contract
      ✓ returns the price
      ✓ returns token address
    Buying Tokens
      ✓ transfers tokens
      ✓ updates contract ether balance
      ✓ emits Buy event
    Finalize Sale
      ✓ transfers remaining tokens to owner
      ✓ transfers ETH balance to owner
```

## 🚀 Deployment

### Local Development
```bash
# Start Hardhat local node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

### Testnet Deployment
```bash
# Deploy to Goerli testnet
npx hardhat run scripts/deploy.js --network goerli

# Verify contract on Etherscan
npx hardhat verify --network goerli DEPLOYED_CONTRACT_ADDRESS
```

### Mainnet Deployment
```bash
# Deploy to Ethereum mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

## 💡 Usage

### For Token Buyers
1. Connect your MetaMask wallet
2. Ensure you have sufficient ETH for purchases
3. Enter the desired token amount
4. Confirm the transaction
5. Tokens will be transferred to your wallet

### For Crowdsale Administrators
1. Deploy the contracts with initial parameters
2. Transfer tokens to the crowdsale contract
3. Monitor sales through the dashboard
4. Update prices as needed using `setPrice()`
5. Finalize the sale when complete

### Web3 Integration Example
```javascript
// Connect to the crowdsale
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const crowdsale = new ethers.Contract(address, abi, signer);

// Purchase tokens
const transaction = await crowdsale.buyTokens(
  ethers.utils.parseEther("100"), // 100 tokens
  { value: ethers.utils.parseEther("1") } // 1 ETH
);
```

## 📁 Project Structure

```
crowdsale/
├── contracts/                 # Smart contracts
│   ├── Token.sol             # ERC-20 token implementation
│   └── Crowdsale.sol         # Main crowdsale contract
├── test/                     # Test files
│   └── Crowdsale.js          # Comprehensive test suite
├── src/                      # React frontend
│   ├── components/           # React components
│   │   ├── App.js           # Main application
│   │   ├── Buy.js           # Purchase interface
│   │   ├── Navigation.js    # Header navigation
│   │   ├── Progress.js      # Sale progress
│   │   └── Info.js          # Account information
│   ├── abis/                # Contract ABIs
│   └── config.json          # Network configuration
├── artifacts/               # Compiled contracts
├── cache/                   # Build cache
├── hardhat.config.js        # Hardhat configuration
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Write comprehensive tests for new features
- Follow Solidity style guidelines
- Use meaningful commit messages
- Update documentation as needed

## 🔒 Security Considerations

### Smart Contract Security
- ✅ Reentrancy protection on critical functions
- ✅ Integer overflow protection (Solidity ^0.8.0)
- ✅ Access control with `onlyOwner` modifier
- ✅ Input validation on all public functions
- ✅ Proper event emission for transparency

### Recommended Security Practices
- Always test on testnets before mainnet deployment
- Consider professional smart contract audits for mainnet
- Implement multi-signature wallets for owner functions
- Use time locks for critical parameter changes
- Monitor contract activity and set up alerts

### Known Limitations
- The contract does not implement pausable functionality
- No automatic refund mechanism if sale fails
- Price updates take effect immediately

## 📊 Gas Optimization

The contracts are optimized for gas efficiency:
- Minimal external calls in critical paths
- Efficient storage layout
- Batch operations where possible
- Events for off-chain indexing

## 🔧 Configuration

### Network Configuration
Update `hardhat.config.js` for different networks:

```javascript
module.exports = {
  networks: {
    goerli: {
      url: "https://goerli.infura.io/v3/YOUR-PROJECT-ID",
      accounts: ["0xYOUR-PRIVATE-KEY"]
    }
  }
};
```

### Frontend Configuration
Update `src/config.json` with deployed contract addresses:

```json
{
  "31337": {
    "token": { "address": "0x..." },
    "crowdsale": { "address": "0x..." }
  }
}
```

## 📚 Resources

- [Ethereum Documentation](https://ethereum.org/developers/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Hardhat Documentation](https://hardhat.org/docs/)
- [React Documentation](https://reactjs.org/docs/)
- [Ethers.js Documentation](https://docs.ethers.io/)

## 📈 Roadmap

- [ ] Add pausable functionality
- [ ] Implement whitelisting mechanisms
- [ ] Add vesting schedules for token releases
- [ ] Create governance token integration
- [ ] Add multi-token crowdsale support
- [ ] Implement Dutch auction pricing
- [ ] Add KYC/AML integration
- [ ] Create mobile app version

## 📄 License

This project is licensed under the Unlicense - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Juan José Expósito González**
- GitHub: [@juanjoseexpositogonzalez](https://github.com/juanjoseexpositogonzalez)

## 🙏 Acknowledgments

- OpenZeppelin for security best practices
- Hardhat team for excellent development tools
- Ethereum community for continuous innovation
- React team for the amazing framework

---

**⚠️ Disclaimer**: This software is provided as-is for educational and development purposes. Always conduct thorough testing and consider professional audits before deploying to mainnet with real funds.
