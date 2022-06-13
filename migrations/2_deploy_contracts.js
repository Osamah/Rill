var RillContract = artifacts.require("./Rill.sol");

module.exports = function(deployer) {
   deployer.deploy(RillContract);
};
