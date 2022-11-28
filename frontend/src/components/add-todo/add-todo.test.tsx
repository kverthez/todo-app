import { AddTodoForm, isValid } from "./index";
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

it("when pressing enter description should become empty", async()=>{
    const { user } = render(<AddTodoForm />);
    const field = screen.getByRole('textbox', {name: /description/i});
    await user.type(field, "test1{Enter}");
    await waitFor(()=>expect(field).toHaveValue(""));
});

it("when clicking on addButton description should become empty", async() =>{
    const { user } = render(<AddTodoForm />);
    //screen.logTestingPlaygroundURL();
    const field = screen.getByRole('textbox', {name: /description/i});
    await user.type(field, "test1");
    const btnAdd = screen.getByRole('button', {name: /add/i});
    await user.click(btnAdd);
    await waitFor(()=>expect(field).toHaveValue(""));
});