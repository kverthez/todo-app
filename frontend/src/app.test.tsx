import { render, screen, waitFor } from "./test-lib/test-utils";
import App from "./app";
import { resetTodos } from "./test-lib/test-server";
import { aTodo } from "./test-lib/test-builder";

test("renders title", async () => {
    render(<App />);
    const title = screen.getByRole("heading", { name: /Todo/i });
    expect(title).toBeInTheDocument();
});

test("user types something in the description and clicks add. The todo shows up in the list", async ()=>{
    const { user } = render(<App />);
    const fieldDescription = screen.getByRole('textbox', {name: /description/i});
    await user.type(fieldDescription, "test1");
    const btnAdd = screen.getByRole('button', {name: /add/i});
    await user.click(btnAdd);
    await waitFor(()=>expect(screen.getByRole('list')).toHaveTextContent("test1"));
});

test("start off with a single todo item in the list. When the user marks it as done, the footer should show 'All done!'", async ()=>{
    resetTodos([aTodo({done:false, description:'test1'})]);
    const { user } = render(<App />);
    const btnDone = await screen.findByRole('checkbox', {
        name: /test1/i
      });
    await user.click(btnDone);
    const footer = screen.getByRole('contentinfo');
    await waitFor(()=> expect(footer).toHaveTextContent('All done!'));
});


test("start off with a single todo item in the list. When the user deletes it, the text 'Add some todos' should show up", async ()=>{
    resetTodos([aTodo({done:false, description:'test1'})]);
    const { user } = render(<App />);

    const btnRemove = await screen.findByRole('button', {
        name: 'Remove'
      });
    await user.click(btnRemove);
    await screen.findByText(/add some todos/i);
});