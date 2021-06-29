import React from "react";
import { render, screen } from "@testing-library/react";
import { ConfigContext } from "../../contexts/ConfigContext";
import { PageHeaderComponent } from "./PageHeaderComponent";
import '@testing-library/jest-dom/extend-expect';

const TITLE = "title";
const VERSION = "version";

const value = {
  TITLE,
  VERSION,
};

describe("PageHeader", () => {
  it("Should render", () => {
    render(
      <ConfigContext.Provider value={value}>
        <PageHeaderComponent />
      </ConfigContext.Provider>
    );
    expect(screen.getByText(value.TITLE)).toBeInTheDocument();
    expect(screen.getByText(value.VERSION)).toBeInTheDocument();
  });
});
