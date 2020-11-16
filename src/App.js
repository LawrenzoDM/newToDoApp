import React from "react"
import Navigation from "./components/Navigation"
import "./css/App.scss"
import ToDoContainer from "./components/ToDoContainer"
import ToDonesContainer from "./components/ToDonesContainer"
import {BrowserRouter,Route,Switch} from "react-router-dom"
import About from "./components/About"
import NotFound from "./components/NotFound"
// User interface (UI) unit (component) 

/* console.log(localStorage)
let data ={
  name:"Ali",
  age:43,
  city: "Berlin",
} */

//localStorage.setItem("my-new-app", JSON.stringify(data))
//localStorage.setItem("to-do-app", "man")
//localStorage.getItem("to-do-app")
//localStorage.removeItem("to-do-app")
//console.log(JSON.parse(localStorage.getItem("my-new-app")).age)
//localStorage.removeItem("my-new-app")


class App extends React.Component{

   state={
     todoItems:[
      
     ]
   }

   componentDidMount(){
     //onload
     let data = localStorage.getItem("todoapp")
     if (data) {
       let convData = JSON.parse(data)
     this.setState({
       todoItems:convData
     })
     }
   }
   
   addItem=(value)=>{
    console.log(this,"this is from App");
      let item ={id: this.state.todoItems.length, text: value, done:false}
      /* this.setState({
        todoItems:[ ...this.state.todoItems,item]
      }) */

      // second way
      let copystate=[...this.state.todoItems]
      copystate.push(item)
      this.setState({
        todoItems:copystate
      }, ()=>{
        localStorage.setItem("todoapp",JSON.stringify(this.state.todoItems))

      })
      
   }

   updateItem=(id)=>{
     let updateItems = this.state.todoItems.map(item=>{
       if (item.id===id) {
         item.done =!item.done
         return item
       } else{
         return item
       }
     })
     this.setState({
       todoItems:updateItems
     },()=>{
      localStorage.setItem("todoapp",JSON.stringify(this.state.todoItems))
     })
   }
  
   // data is passed from parent to child through props
deleteItem=(id)=>{
    let CopyState=[...this.state.todoItems]
    let upDatedData = CopyState.filter(item=>item.id!==id)
    this.setState({
      todoItems:upDatedData
    }, ()=>{
      localStorage.setItem("todoapp",JSON.stringify(this.state.todoItems))
    })
}

  render(){

    let toDos=this.state.todoItems.filter(item=>!item.done)
    let toDones=this.state.todoItems.filter(item=>item.done)
    return (
      <BrowserRouter>
      
    <div className="app">
        <Navigation/>
        <Switch>
        <Route exact path= "/">
        <ToDoContainer toDos={toDos} addItem={this.addItem} updateItem={this.updateItem} delateItem={this.deleteItem}/>
        <ToDonesContainer toDones={toDones} updateItem={this.updateItem} delateItem={this.deleteItem}  />
        </Route>
        <Route path="/about" component={About}/> 
        <Route component={NotFound} />  {/* default case */}
        </Switch>
    </div>
   
    </BrowserRouter>
  );
}
  }
  
export default App;
