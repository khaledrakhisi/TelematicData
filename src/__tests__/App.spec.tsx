import { render, waitFor } from "@testing-library/react";

import App from "../App";

const MockApp = () => {
  window.scrollTo = jest.fn();
  return <App />;
};

const renderComponent = () => render(<MockApp />);
test("if it renders without crashing", async () => {
  const { getByText } = renderComponent();
  await waitFor(() => getByText(/User name/i));
  await waitFor(() => getByText(/Forgot your password/i));

  expect(getByText(/User name/i)).toBeInTheDocument();
  expect(getByText(/Forgot your password/i)).toBeInTheDocument();
});

afterEach(() => {
  global.innerWidth = 1024;
  global.dispatchEvent(new Event("resize"));
});

test("the App responsivness as expected", async () => {
  // Change the viewport to 500px.
  global.innerWidth = 500;
  // Trigger the window resize event.
  global.dispatchEvent(new Event("resize"));
  const { getByTestId } = renderComponent();
  await waitFor(() => getByTestId("keypic"));

  expect(getByTestId("keypic")).toBeInTheDocument();
});
