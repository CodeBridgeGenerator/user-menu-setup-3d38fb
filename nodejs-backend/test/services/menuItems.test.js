const assert = require("assert");
const app = require("../../src/app");

describe("menuItems service", () => {
  let thisService;
  let menuItemCreated;

  beforeEach(async () => {
    thisService = await app.service("menuItems");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (menuItems)");
  });

  describe("#create", () => {
    const options = {"menu":"new value","subMenu":"new value","routePage":"new value"};

    beforeEach(async () => {
      menuItemCreated = await thisService.create(options);
    });

    it("should create a new menuItem", () => {
      assert.strictEqual(menuItemCreated.menu, options.menu);
assert.strictEqual(menuItemCreated.subMenu, options.subMenu);
assert.strictEqual(menuItemCreated.routePage, options.routePage);
    });
  });

  describe("#get", () => {
    it("should retrieve a menuItem by ID", async () => {
      const retrieved = await thisService.get(menuItemCreated._id);
      assert.strictEqual(retrieved._id, menuItemCreated._id);
    });
  });

  describe("#update", () => {
    let menuItemUpdated;
    const options = {"menu":"updated value","subMenu":"updated value","routePage":"updated value"};

    beforeEach(async () => {
      menuItemUpdated = await thisService.update(menuItemCreated._id, options);
    });

    it("should update an existing menuItem ", async () => {
      assert.strictEqual(menuItemUpdated.menu, options.menu);
assert.strictEqual(menuItemUpdated.subMenu, options.subMenu);
assert.strictEqual(menuItemUpdated.routePage, options.routePage);
    });
  });

  describe("#delete", () => {
  let menuItemDeleted;
    beforeEach(async () => {
      menuItemDeleted = await thisService.remove(menuItemCreated._id);
    });

    it("should delete a menuItem", async () => {
      assert.strictEqual(menuItemDeleted._id, menuItemCreated._id);
    });
  });
});