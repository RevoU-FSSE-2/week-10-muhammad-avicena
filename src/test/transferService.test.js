const TransferDao = require('../dao/transferDao');
const TransferService = require('../services/transferService');

describe('Create Transfer function', () => {
  it('[POSITIVE] should successfully create a transfer', async () => {
    const mockedTransferData = {
      insertedId: 'id',
    };

    TransferDao.prototype.createTransfer = jest.fn().mockResolvedValue(mockedTransferData);

    const transferDao = new TransferDao();
    const transferService = new TransferService(transferDao);

    const result = await transferService.createTransfer({
      bank: 'bank',
      amount: 20000,
      toUser: 'ayang',
      desc: 'tabungan nikah',
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe('id');
  });
});

describe('Approve Transfer function', () => {
  it('[POSITIVE] should successfully approve transfer status', async () => {
    const mockedTransferData = {
      _id: 'id',
      status: 'approve',
    };

    TransferDao.prototype.updateTransferStatus = jest.fn().mockResolvedValue(mockedTransferData);

    const transferDao = new TransferDao();
    const transferService = new TransferService(transferDao);

    const result = await transferService.updateTransferStatus({
      id: 'id',
      status: 'approve',
    });

    expect(result.success).toBe(true);
    expect(result.message).toEqual(mockedTransferData);
  });
});
