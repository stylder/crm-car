import { Process, specHelper } from "actionhero";
const actionhero = new Process();

describe("Action", () => {
  describe("cars", () => {
    beforeAll(async () => {
      await actionhero.start();
    });

    afterAll(async () => {
      await actionhero.stop();
    });

    test("returns OK", async () => {
      const { ok } = await specHelper.runAction("cars");
      expect(ok).toEqual(true);
    });
  });
});
