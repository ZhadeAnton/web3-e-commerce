const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const items = require("../../assets/items.json")

module.exports = buildModule("Commerce", (m) => {
  const commerce = m.contract("Commerce");

  for (let i = 0; i < items.items.length; i++) {
    const item = items.items[i]
    const listItem = Object.keys(item).map((key) => item[key]);
    m.call(commerce, 'list', [...listItem], { id: `commerce_${i.toString()}` })
  }

  return { commerce };
});
