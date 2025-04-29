const assert = require("assert");
const app = require("../../src/app");

describe("userContext service", () => {
  let thisService;
  let userContextCreated;

  beforeEach(async () => {
    thisService = await app.service("userContext");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (userContext)");
  });

  describe("#create", () => {
    const options = {"role":"aasdfasdfasdfadsfadfa","position":"aasdfasdfasdfadsfadfa","profile":"aasdfasdfasdfadsfadfa","user":"aasdfasdfasdfadsfadfa","company":"aasdfasdfasdfadsfadfa","branch":"aasdfasdfasdfadsfadfa","department":"aasdfasdfasdfadsfadfa","section":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      userContextCreated = await thisService.create(options);
    });

    it("should create a new userContext", () => {
      assert.strictEqual(userContextCreated.role, options.role);
assert.strictEqual(userContextCreated.position, options.position);
assert.strictEqual(userContextCreated.profile, options.profile);
assert.strictEqual(userContextCreated.user, options.user);
assert.strictEqual(userContextCreated.company, options.company);
assert.strictEqual(userContextCreated.branch, options.branch);
assert.strictEqual(userContextCreated.department, options.department);
assert.strictEqual(userContextCreated.section, options.section);
    });
  });

  describe("#get", () => {
    it("should retrieve a userContext by ID", async () => {
      const retrieved = await thisService.get(userContextCreated._id);
      assert.strictEqual(retrieved._id, userContextCreated._id);
    });
  });

  describe("#update", () => {
    let userContextUpdated;
    const options = {"role":"345345345345345345345","position":"345345345345345345345","profile":"345345345345345345345","user":"345345345345345345345","company":"345345345345345345345","branch":"345345345345345345345","department":"345345345345345345345","section":"345345345345345345345"};

    beforeEach(async () => {
      userContextUpdated = await thisService.update(userContextCreated._id, options);
    });

    it("should update an existing userContext ", async () => {
      assert.strictEqual(userContextUpdated.role, options.role);
assert.strictEqual(userContextUpdated.position, options.position);
assert.strictEqual(userContextUpdated.profile, options.profile);
assert.strictEqual(userContextUpdated.user, options.user);
assert.strictEqual(userContextUpdated.company, options.company);
assert.strictEqual(userContextUpdated.branch, options.branch);
assert.strictEqual(userContextUpdated.department, options.department);
assert.strictEqual(userContextUpdated.section, options.section);
    });
  });

  describe("#delete", () => {
  let userContextDeleted;
    beforeEach(async () => {
      userContextDeleted = await thisService.remove(userContextCreated._id);
    });

    it("should delete a userContext", async () => {
      assert.strictEqual(userContextDeleted._id, userContextCreated._id);
    });
  });
});