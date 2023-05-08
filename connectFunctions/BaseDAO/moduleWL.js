/* 添加module至白名单
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* modules:数组，目标module地址
* profileId : 创建者的profileid\
*/
export async function addModule(
    sender,
    wallet,
    baseDAO,
    daoId,
    modules,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('module', [
      {
        daoId,
        modules,
        profileId,
      },
    ]);
    const tx = await wallet
      .connect(sender)
      .execute(baseDAO.address, methodData, {
        gasLimit: 1000000,
      });
    await tx.wait();
  }

  /* 将module从中白名单移除
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* module:目标token地址
* profileId : 创建者的profileid\
*/
export async function removeModule(
    sender,
    wallet,
    baseDAO,
    daoId,
    module,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('removeModule', [
      {
        daoId,
        module,
        profileId,
      },
    ]);
    const tx = await wallet
      .connect(sender)
      .execute(baseDAO.address, methodData, {
        gasLimit: 1000000,
      });
    await tx.wait();
  }