const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Commerce", (m) => {
  const commerce = m.contract("Commerce");
  return { commerce };
});
