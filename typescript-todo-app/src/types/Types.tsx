
export interface TodoInitialState {
    todos: TodoType[];   //TodoType adında kendim bir tip oluşturdum 
}

export interface TodoType {
    id: number;
    content: string;
}