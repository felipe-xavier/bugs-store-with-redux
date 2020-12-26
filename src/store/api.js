import { createAction } from "@reduxjs/toolkit";

export const apiCallBegun = createAction("api/callBegun");
export const apiCallSucceeded = createAction("api/callSucceeded");
export const apiCallFailed = createAction("api/callFailed");

