const DappContract = artifacts.require("DappContract");

module.exports = function (deployer) {
  deployer.deploy(DappContract);
};
