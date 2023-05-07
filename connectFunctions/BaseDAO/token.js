/* 添加token至白名单
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* tokenAddr:目标token地址
* profileId : 创建者的profileid\
*/
export async function addTokenWL(
    sender,
    wallet,
    baseDAO,
    daoId,
    tokenAddr,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('addTokenWL', [
      {
        daoId,
        tokenAddr,
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

  /* 将token从中白名单移除
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* tokenAddr:目标token地址
* profileId : 创建者的profileid\
*/
export async function removeTokenWL(
    sender,
    wallet,
    baseDAO,
    daoId,
    tokenAddr,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('removeTokenWL', [
      {
        daoId,
        tokenAddr,
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