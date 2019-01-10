import { expect } from "chai";
import { stub } from "sinon";
import * as Enzyme from "enzyme";
import * as React from "react";
import { mount } from "enzyme";
import buildStore from "../../store";

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
  let wrapper: Enzyme.CommonWrapper<any, any, {}>;
  let store;
  describe("rendering", () => {
    beforeEach(() => {
      fetchData = stub();
      store = buildStore();
      wrapper = mount(
        <LibrariesList
          fetchData={fetchData}
          libraries={libraries}
          store={store}
        />
      );
    });

    it("should display a list of libraries", () => {
      let libraryItems = wrapper.find(".panel");
      expect(libraryItems.length).to.equal(2);
    });

    it("should render each library's  name and short name", () => {
      let lib1 = wrapper.find(".panel").at(0);
      expect(lib1.text()).to.contain("Test Library 1 (lib1)");
      let lib2 = wrapper.find(".panel").at(1);
      expect(lib2.text()).to.contain("Test Library 2 (lib2)");
    });

    it("should display a header if there are no libraries", () => {
      wrapper.setProps({ libraries: [] });
      let header = wrapper.find(".page-header");
      expect(header.length).to.equal(1);
      expect(header.text()).to.equal("There are no libraries in this registry yet.");
    });
  });
});
