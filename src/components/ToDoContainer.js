import React from 'react'

export default class ToDoContainer extends React.Component{

 /* const{toDos}=props */
    state={
        inputField:null
    }

    addData=(e)=>{
        e.preventDefault()
        console.log(this,"from child todosContainer");
        this.props.addItem(this.state.inputField)
    }

  render(){
      return (
        <div className="todos-container">
                <form className="todo-form" onSubmit={this.addData} >
                    <label className="input-item">
                        <input type="text" name="todo" onChange={(e)=>this.setState({
                            inputField:e.target.value})} />
                    </label>
                    <input className="btn" type="submit" value="ADD"/>
                </form>
                <div className="todos">
                    <h3>TO DO</h3>
                    {this.props.toDos.map(todo=>{
                        return(
                            <div className="todo-item" key={todo.id}>
                                <p>{todo.text}</p>
                                <div className="actions">
                                    <button className="btn"onClick={()=>this.props.updateItem(todo.id)} >&#10004; </button>
                                    <button className="btn" onClick={()=>this.props.delateItem(todo.id)} >&#x2718; </button>
                                </div>

                            </div>
                        )
                    })}
                </div>
        </div>
    )
  }
    
}
