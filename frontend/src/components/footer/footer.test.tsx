import { countTodosLeft, Footer } from "./index";
import { screen, render } from "../../test-lib/test-utils";
import { aTodo } from "../../test-lib/test-builder";

it("dummy test", () => {
    expect(1 + 1).toEqual(2);
});


it("when passing an empty array, countTodosLeft should return 0", ()=>{
    expect(countTodosLeft([])).toEqual(0);
});

it("when passing an array where all todos are done, countTodosLeft should return 0", ()=>{
    const todos = [aTodo({done:true})];
    expect(countTodosLeft(todos)).toEqual(0);
});

it("when passing an array where 1 todo is done and 2 are not done, countTodosLeft should return 2", ()=>{
    const todos = [aTodo({done: true}), aTodo({done: false}), aTodo({done: false})];

    expect(countTodosLeft(todos)).toEqual(2);
});

it("'All done!' when there are no todos left", ()=>{
    const exampleTodos = [aTodo({ done: true })];
    render(<Footer todos={exampleTodos} />);

    //screen.logTestingPlaygroundURL();
    screen.getByText(/all done/i);
});

it("'1 todo left' when there is one", () =>{
    const exampleTodos = [aTodo({ done: false })];
    render(<Footer todos={exampleTodos} />);
    screen.getByText('1 todo left');
});


it("'4 todos left' when there are multiple", () =>{
    const exampleTodos = [aTodo({ done: false }),
        aTodo({ done: false }),
        aTodo({ done: false }),
        aTodo({ done: false })];
    render(<Footer todos={exampleTodos} />);
    screen.getByText('4 todos left');
});