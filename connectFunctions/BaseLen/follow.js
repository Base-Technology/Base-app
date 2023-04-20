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
