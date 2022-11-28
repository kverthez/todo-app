import { countTodosLeft, Footer } from "./index";
import { screen, render } from "../../test-lib/test-utils";
import { faker } from "@faker-js/faker";
import { TodoTO } from "../../lib/api";
import { aTodo } from "../../test-lib/test-builder";

it("dummy test", () => {
    expect(1 + 1).toEqual(2);
});


it("when passing an empty array, countTodosLeft should return 0", ()=>{
    expect(countTodosLeft([])).toEqual(0);
});

it("when passing an array where all todos are done, countTodosLeft should return 0", ()=>{
    const todo = {
        id: "3044efbc-7e54-4751-a96c-e01474caf8a7",
        description: "Jog around the park",
        done: true,
    };
    const todos = [todo];
    expect(countTodosLeft(todos)).toEqual(0);
});

it("when passing an array where 1 todo is done and 2 are not done, countTodosLeft should return 2", ()=>{
    const todos = [aTodo({done: true}), aTodo({done: false}), aTodo({done: false})];

    expect(countTodosLeft(todos)).toEqual(2);
});

