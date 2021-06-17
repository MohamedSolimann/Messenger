const messageRouterTests = require("./messageRouter.test");
const userRouterTests = require("./userRouter.test");
const { testDbSetUp } = require("./testDBSetup");

userRouterTests();
messageRouterTests();
testDbSetUp();
