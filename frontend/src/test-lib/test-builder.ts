import { faker } from "@faker-js/faker";
import { TodoTO } from "../lib/api";

export function aTodo(overrides: Partial<TodoTO> = {}): TodoTO {
    return {
        id: faker.datatype.uuid(),
            description: faker.lorem.words(),
            done: faker.datatype.boolean(),
            ...overrides,
    }
}