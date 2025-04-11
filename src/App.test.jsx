import {expect, test}  from "vitest";
import {render} from "vitest-browser-react";

import App from "./App";

test("Renders the landing page", async () => {
    const {getByText} = render(<App />);
    expect(getByText("reserve your spot")).not.toBeNull();
});