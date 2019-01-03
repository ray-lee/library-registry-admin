import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { shallow, mount } from "enzyme";

import { LibrariesList } from "../LibrariesList";

describe("LibrariesList", () => {
  let libraries = {
    libraries:
      [{
        "uuid": "UUID1",
        "name": "Test Library 1",
        "short_name": "lib1",
        "id": 1,
        "registry_stage": "testing",
        "library_stage": "production"
      },
      {
        "uuid": "UUID2",
        "name": "Test Library 2",
        "short_name": "lib2",
        "id": 2,
        "registry_stage": "cancelled",
        "library_stage": "testing"
      }]
  };
  let fetchData;
  let isActive;
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  describe("rendering", () => {
    beforeEach(() => {
      fetchData = stub();
      isActive = stub();
      wrapper = mount(
        <LibrariesList
          fetchData={fetchData}
          libraries={libraries}
        />
      );
    });

    it("should display a list of libraries", () => {
      let libraryItems = wrapper.find(".panel");
      expect(libraryItems.length).to.equal(2);
    });

    it("should render each library's  name and short name", () => {
      let lib1 = wrapper.find(".panel").at(0);
      expect(lib1.text()).to.equal("Test Library 1 (lib1)");
      let lib2 = wrapper.find(".panel").at(1);
      expect(lib2.text()).to.equal("Test Library 2 (lib2)");
    });

    it("should initially have no active key", () => {
      expect(wrapper.state().activeKey).to.equal("");
    });

  });
});