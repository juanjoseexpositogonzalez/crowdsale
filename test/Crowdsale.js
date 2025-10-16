const { expect } = require('chai');
const { ethers } = require('hardhat');

const tokens = (n) => {
    return ethers.utils.parseUnits(n.toString(), 'ether');
}

const ether = tokens;

describe('Crowdsale', () => {
    let crowdsale, token;
    let accounts, deployer, user1;

    beforeEach(async () => {
        // Load Contracts
        const Crowdsale = await ethers.getContractFactory('Crowdsale');
        const Token = await ethers.getContractFactory('Token');

        // Deploy token
        token = await Token.deploy('Dapp University', 'DAPP', '1000000');

        // Configure accounts
        accounts = await ethers.getSigners();
        deployer = accounts[0];
        user1 = accounts[1];

        // Deploy Crowdsale
        crowdsale = await Crowdsale.deploy(token.address, ether(1), '1000000');

        // Send tokens to crowdsale
        let transaction = await token.connect(deployer).transfer(crowdsale.address, tokens(1000000));
        await transaction.wait();


    });

    describe('Deployment', () => {

        it('checks the ownership', async () => {
            expect(await crowdsale.owner()).to.equal(deployer.address);
        })

        it('sends tokens to Crowdsale contract', async () => {
            expect(await token.balanceOf(crowdsale.address)).to.equal(tokens(1000000));
        });

        it('returns the price', async () => {
            expect(await crowdsale.price()).to.equal(ether(1))
        })

        it('returns token address', async () => {
            expect(await crowdsale.token()).to.equal(token.address);
        });

        it('correctly initialize tokensSold variable', async () => {
            expect(await crowdsale.tokensSold()).to.equal(0);
        })
    });

    describe('Buying Tokens', () => {
        let transaction, result;
        let amount = tokens(10);

        describe('Success', () => {

            beforeEach(async () => {
                await crowdsale.connect(deployer).addToWhitelist(user1.address);
                transaction = await crowdsale.connect(user1).buyTokens(amount, { value: ether(10) });
                result = await transaction.wait();
            });

            it('transfers tokens', async () => {
                expect(await token.balanceOf(crowdsale.address)).to.equal(tokens(999990));
                expect(await token.balanceOf(user1.address)).to.equal(amount);
            });

            it('updates contract ether balance', async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(amount);
            });

            it('updates tokensSold', async () => {
                expect(await crowdsale.tokensSold()).to.equal(amount);
            });

            it('emits Buy event', async () => {
                // .--> https://v2.hardhat.org/hardhat-chai-matchers/docs/reference
                await expect(transaction).to.emit(crowdsale, 'Buy')
                    .withArgs(amount, user1.address);

            });

        });

        describe('Failure', () => {

            it('rejects insufficient ETH', async () => {
                await expect(crowdsale.connect(user1).buyTokens(tokens(10), { value: 0 })).to.be.reverted;
            });

            it('rejects insufficient tokens', async () => {
                await expect(crowdsale.connect(user1).buyTokens(tokens(10000000), { value: ether(100) })).to.be.reverted;
            });
        })
    });

    describe('Sending ETH', () => {
        let transaction, result;
        let amount = ether(10);

        describe('Success', () => {

            beforeEach(async () => {
                await crowdsale.connect(deployer).addToWhitelist(user1.address);
                transaction = await user1.sendTransaction({ to: crowdsale.address, value: amount });;
                result = await transaction.wait();
            });


            it('updates contract ether balance', async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(amount);
            });

            it('updates user token balance', async () => {
                expect(await token.balanceOf(user1.address)).to.equal(amount);
            });


        });
    });

    describe('Update price', () => {
        let transaction, result;
        let price = ether(2);

        describe('Success', () => {

            beforeEach(async () => {
                transaction = await crowdsale.connect(deployer).setPrice(ether(2));
                result = await transaction.wait();
            });

            it('updates the price', async () => {
                expect(await crowdsale.price()).to.equal(ether(2));
            })
        });

        describe('Failure', () => {

            it('prevents non-owner from updating price', async () => {
                await expect(crowdsale.connect(user1).setPrice(price)).to.be.reverted;
            });
        });

    });

    describe('Finalize Sale', () => {
        let transaction, result;
        let amount = tokens(10);
        let value = ether(10);

        describe('Success', () => {

            beforeEach(async () => {
                await crowdsale.connect(deployer).addToWhitelist(user1.address);
                transaction = await crowdsale.connect(user1).buyTokens(amount, { value: value });
                result = await transaction.wait();

                transaction = await crowdsale.connect(deployer).finalize();
                result = await transaction.wait();
            });

            it('transfer remaining tokens to owner', async () => {
                expect(await token.balanceOf(crowdsale.address)).to.equal(0);
                expect(await token.balanceOf(deployer.address)).to.equal(tokens(999990));
            });

            it('transfers ETH balance to the owner', async () => {
                expect(await ethers.provider.getBalance(crowdsale.address)).to.equal(0);
                // expect(await ethers.provider.getBalance(deployer.address)).to.equal(value);
            });

            it('emits Finalize event', async () => {
                await expect(transaction).to.emit(crowdsale, 'Finalize')
                    .withArgs(amount, value);

            });

        });

        describe('Failure', () => {

            it('prevents non-owner from finalizer', async () => {
                await expect(crowdsale.connect(user1).finalize()).to.be.reverted;
            })
        })

    });

    describe('Whitelisting', () => {
        let transaction, whitelisted;
        beforeEach(async () => {
            whitelisted = ethers.utils.getAddress(accounts[2].address);
            transaction = await crowdsale.connect(deployer).addToWhitelist(whitelisted);
            await transaction.wait();
        });

        describe('Success', () => {
            it('correctly adds user to whitelist', async () => {
                expect(await crowdsale.isWhitelisted(whitelisted)).to.be.true;
            });

            it('correctly removes user from whitelist', async () => {
                transaction = await crowdsale.connect(deployer).removeFromWhitelist(whitelisted)
                await transaction.wait();
                expect(await crowdsale.isWhitelisted(whitelisted)).to.be.false;
            });
        });

        describe('Failure', () => {
            it('rejects whitelisting by non-owner', async () => {
                await expect(crowdsale.connect(user1).addToWhitelist(whitelisted)).to.be.reverted;
            });
            it('rejects whitelisting by non-owner', async () => {
                await expect(crowdsale.connect(user1).removeFromWhitelist(whitelisted)).to.be.reverted;
            });
        });
    });
});
