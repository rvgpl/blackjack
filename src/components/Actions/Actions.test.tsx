import React from "react";
import Actions from "./Actions";
import { shallow } from "enzyme";
import { GameState } from "../../types";

const hit = jest.fn();
const stand = jest.fn();
const reset = jest.fn();

describe("Actions", () => {
  it("should render all three buttons", () => {
    const wrapper = shallow(
      <Actions
        gameState={GameState.Init}
        hit={hit}
        reset={reset}
        stand={stand}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("button").length).toBe(3);
  });
});
