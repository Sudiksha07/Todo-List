import React, { useReducer,useState } from 'react';
import "../src/TodoList.css"
const initialState = {
    todos: [],
    newItem: "",
    editItem: "",
    isEditing: false,
    currentId: null,
  };
  
  const reducer = (state, action) => {
    switch(action.type) {
      case 'set_new_item':
        return {
          ...state,
          newItem: action.payload,
        };
      case 'set_edit_item':
        return {
          ...state,
          editItem: action.payload,
        };
      case 'Add_todo':
        return {
          ...state,
          todos: [...state.todos, { id: Math.random() * 10, value: state.newItem }],
          newItem: "",
        };
      case 'delete':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload),
        };
      case 'set_editing':
        return {
          ...state,
          editItem: action.payload.value,
          isEditing: true,
          currentId: action.payload.id,
        };
      case 'Edit_todo':
        return {
          ...state,
          todos: state.todos.map(todo => todo.id === state.currentId ? { ...todo, value: state.editItem } : todo),
          editItem: "",
          isEditing: false,
          currentId: null,
        };
      default:
        return state;
    }
  }
  
  export default function TodoList() {
    const [state, dispatch] = useReducer(reducer, initialState);
     const[checkedIds,setCheckedIds]=useState([])
    //  const[deleteArray,setDeleteArray]=useState([])
    const handleAddClick = (e) => {
      e.preventDefault();
      if (state.newItem === "") {
        alert("Please write something");
      } else {
        dispatch({ type: "Add_todo" });
      }
    }
  
    const handleEditClick = (e) => {
      e.preventDefault();
      dispatch({
         type: "Edit_todo" });
    }
  
    const deleteTodo = (id) => {
      dispatch(
        { 
            type: 'delete', 
            payload: id });
    };
  
    const handleEdit = (todo) => {
      dispatch({ type: 'set_editing', payload: todo });
    };
    const handleCheckbox=(todoId)=>(e)=>{
//  console.log("hello")
if(e.target.checked){
    setCheckedIds([...checkedIds,todoId]);
}
else{
    setCheckedIds(checkedIds.filter(id=>id!==todoId))
}

}

const handleDeleteAll=()=>{
    checkedIds.forEach(id=>deleteTodo(id));
    setCheckedIds([]);
}
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="container p-4 border rounded shadow-sm" style={{ maxWidth: '600px', width: '100%' }}>
          <h1 className="mb-4">Add Your Items</h1>
          <div className="input-group mb-3">
            <input
              className="form-control"
              value={state.newItem}
              type="text"
              placeholder="Add Your Item"
              onChange={(e) => {
                dispatch({ type: "set_new_item", payload: e.target.value });
              }}
            />
            <button className="btn btn-primary" type="button" onClick={handleAddClick}>
              Add Item
            </button>
          </div>
          <ul className="list-group">
            {state.todos.map((todo) => (
              <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
                {state.isEditing && state.currentId === todo.id ? (
                  <div className="input-group">
                    <input
                      className="form-control"
                      value={state.editItem}
                      type="text"
                      placeholder="Edit Your Item"
                      onChange={(e) => {
                        dispatch({ type: "set_edit_item", payload: e.target.value });
                      }}
                    />
                    <button className="btn btn-success" type="button" onClick={handleEditClick}>
                      Update Item
                    </button>
                  </div>
                ) : (
                  <div className="d-flex align-items-center w-100">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      onChange={handleCheckbox(todo.id)}
                      checked={checkedIds.includes(todo.id)}
                    />
                    <span className="flex-grow-1">{todo.value}</span>
                    <button className="btn btn-danger me-2" type="button" onClick={() => deleteTodo(todo.id)}>Delete</button>
                    <button className="btn btn-info" type="button" onClick={() => handleEdit(todo)}>Edit</button>
                  </div>
                )}
              </li>
            ))}
          </ul>
          {checkedIds.length >= 2 && (
            <button className="btn btn-danger mt-3" type="button" onClick={handleDeleteAll}>
              Delete All
            </button>
          )}
        </div>
      </div>
    );
  }
  