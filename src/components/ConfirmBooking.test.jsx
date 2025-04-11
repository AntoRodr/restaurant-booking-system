import {expect, test}  from "vitest";
import {render} from "vitest-browser-react";

import ConfirmBooking from "./ConfirmBooking";

test("Renders the Confirm Booking Page", async () => {
    const {getByText} = render(<ConfirmBooking />);
    expect(getByText("Ormer Mayfair, London")).not.toBeNull();
});