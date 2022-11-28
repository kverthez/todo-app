import { isValid } from "./index";
import { screen, render, waitFor } from "../../test-lib/test-utils";

test("dummy test", () => {
    expect(1 + 2).toEqual(3);
});

test("when passing an empty string, isValid should return false", () =>{
    expect(isValid("")).toBeFalsy();

});

test("when passing a string with just whitespace, isValid should return false", ()=>{
    expect(isValid(" ")).toBeFalsy();
});

test("when passing a string with text, isValid should return true", ()=>{
    expect(isValid("test1")).toBeTruthy();
});