const TransferDao = require("../dao/transferDao");
const TransferService = require("../services/transferService");
const AuthDao = require("../dao/authDao");
const AuthService = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

describe("Register function", () => {
  it("[POSITIVE] should create a transfer and return success", async () => {
    const mockedTransferData = { insertedId: "id" };

    TransferDao.prototype.createTransfer = jest
      .fn()
      .mockResolvedValue(mockedTransferData);
    const transferDao = new TransferDao();
    const transferService = new TransferService(transferDao);

    const result = await transferService.createTransfer({
      bank: "BCA",
      amount: 20000,
      toUser: "cena",
      desc: "jajan",
    });

    expect(result.success).toBe(true);
    expect(result.message).toBe("id");
  });
});

describe("Login function", () => {
  it("[POSITIVE] should successfully log in and return a token", async () => {
    const mockedUser = {
      _id: "id",
      username: "avicena.admin",
      password: await bcrypt.hash("avicena2023", 10),
      role: "user",
    };

    AuthDao.prototype.loginUser = jest.fn().mockResolvedValue(mockedUser);
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    jwt.sign = jest.fn().mockReturnValue("token");

    const authDao = new AuthDao();
    const authService = new AuthService(authDao);

    const result = await authService.loginUser(
      "avicena.admin",
      "avicena2023"
    );

    expect(result.success).toBe(true);
    expect(result.message).toBe("token");
  });
});
