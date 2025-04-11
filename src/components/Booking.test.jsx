import {expect, test}  from "vitest";
import {render} from "vitest-browser-react";

import Booking from "./Booking";

test("Renders the Booking page", async () => {
    <router>    
        const {getByText} = render(<Booking />);
    </router>
    expect(getByText("booking")).not.toBeNull();
});