import React from "react";
import { render, screen } from "@testing-library/react";

import UserContextPage from "../UserContextPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders userContext page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <UserContextPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("userContext-datatable")).toBeInTheDocument();
    expect(screen.getByRole("userContext-add-button")).toBeInTheDocument();
});
