import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
// this adds custom jest matchers from jest-dom
import "@testing-library/jest-dom/extend-expect";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";

type RenderApolloOptions = {
  mocks?: MockedResponse[];
  defaultOptions?: any;
  cache?: any;
  resolvers?: any;
  [st: string]: any;
};

const renderApollo = (
  node: any,
  {
    mocks,
    defaultOptions,
    cache,
    resolvers,
    ...options
  }: RenderApolloOptions = {}
) => {
  return render(
    <MemoryRouter>
      <MockedProvider
        mocks={mocks}
        addTypename={false}
        defaultOptions={defaultOptions}
        cache={cache}
        resolvers={resolvers}
      >
        {node}
      </MockedProvider>
    </MemoryRouter>,
    options
  );
};

export * from "@testing-library/react";
export { renderApollo };
