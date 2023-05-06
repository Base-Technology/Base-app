/* 添加DAO的管理者
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* newAdmin：目标成员profileID
* profileId : 创建者的profileid\
*/
export async function setAdmin(
  sender,
  wallet,
  baseDAO,
  daoId,
  newAdmin,
  profileId,
) {
  const isOwner = wallet.isOwner(sender.address);

  if (!isOwner) {
    throw new Error('sender is not wallet owner');
  }
  const methodData = baseDAO.interface.encodeFunctionData('setAdmin', [
    {
      daoId,
      newAdmin,
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

/* 删除DAO的管理者
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseDAO ： 对象，dao合约
* daoID：目标DAO
* Admin：目标成员profileID
* profileId : 创建者的profileid\
*/
export async function removeAdmin(
    sender,
    wallet,
    baseDAO,
    daoId,
    Admin,
    profileId,
  ) {
    const isOwner = wallet.isOwner(sender.address);
  
    if (!isOwner) {
      throw new Error('sender is not wallet owner');
    }
    const methodData = baseDAO.interface.encodeFunctionData('removeAdmin', [
      {
        daoId,
        Admin,
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
  
  