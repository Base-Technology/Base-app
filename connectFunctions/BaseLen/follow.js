/* 关注用户
* sender : 地址，合约调用的发起者账户，即合约钱包的拥有者
* wallet ： 对象，合约钱包的合约
* baseHub ： 对象，Hub和合约
* target : 数组 需要关注的用户的profileId组
* data ： 数组，传递给每个profile follow module的参数，元素个数
*/
export async function follow(sender, wallet,baseHub, target, data) {
  const isOwner = wallet.isOwner(sender.address);
  if (!isOwner) {
    console.log('sender is not wallet owner');
    return;
  }
  if (target.length != data.length) {
    console.log('target.length != data.length');
    return false;
  }
  let name;
  for (i = 0; i < target.length; i++) {
    name = await baseHub.callStatic.getHandle(target[i]);
    if (name == '') {
      console.log('one of targer is not profile');
      return false;
    }
  }

  const methodData = baseHub.interface.encodeFunctionData('follow', [
    target,
    data,
  ]);
  const tx = await wallet
    .connect(sender)
    .execute(baseHub.address, methodData, {
      gasLimit: 1000000,
    });
}
