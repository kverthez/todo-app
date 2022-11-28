import { AddTodoForm, isValid } from "./index";
import { screen, render, waitFor } from "../../test-lib/test-utils";
import { mswServer } from "../../test-lib/test-server";
import { rest } from "msw";

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
    const field = screen.getByRole('textbox', {name: /description/i});
    await user.type(field, "test1");
    const btnAdd = screen.getByRole('button', {name: /add/i});
    await user.click(btnAdd);
    await waitFor(()=>expect(field).toHaveValue(""));
});

describe("given the user adds a todo, when the server returns an error,", ()=>{


    beforeEach(async () => {
        const { user } = render(<AddTodoForm />);
        const field = screen.getByRole('textbox', {name: /description/i});
    
        mswServer.use(
        rest.post('/api/todos', (req, response, context)=>{
            return response(context.status(400), context.json({code:"description_too_long", errorMessage:"Description may not be more than 100 characters"}));
        })
        );
        await user.type(field, "test1{Enter}");    
    });

    it("then the error message shows up",async () => {
        await screen.findByText("Description may not be more than 100 characters");
    });
            

    it("then description input text is not cleared",async () => {
        const field = screen.getByRole('textbox', {name: /description/i});
        await waitFor(()=>expect(field).toHaveValue("test1"));
    });
    

});