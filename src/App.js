import React,{Component} from 'react';
import Axios from'axios';
import View from'./View';
import Project from'./Project';
// import logo from './logo.svg';
import './App.css';

//where the server is
// var urlPrefix = 'http:/10.4.24.22:3001/api';
var urlPrefix = 'http://localhost:4000/api/projects';

class App extends Component
{
  constructor(props)
  {
    super(props);
    this.state={
      activeView:'projects',//which one is active its tell
      projects:[
        {
          id:1,
          name:'developer',
          description:'developer project',
        },
        {
          id:2,
          name:'designer',
          description:'designer project',
        },
      ]
    }
  }

  // for active class
  setActiveView = (view) => 
  {
    this.setState({activeView:view});
  }

  getProjects = () =>
  {
      Axios.get(urlPrefix+'/projrcts')
      .then(res=>{
        //console.log(res);
        this.setState({projects:res.data});
      })
  }
  addProject = (data) =>
  {

  }
  deleteProject = (id,data) => 
  {

  }
  updateProject = (id,data) =>
  {

  }
  componentDidMount(){
    this.getProjects();
  }
  render()
  {
    return(
      <div className="app">
        <View viewName="projects" activeView={this.state.activeView} className="color1">

            <div className="header"><i onClick={()=> this.setActiveView('nav')} className="fas fa-bars"></i></div>
            <div className="main">
            <h3>Projects</h3>
            {
              this.state.projects.map((project) => {
                var projectProps = {
                  key:project.id,
                  ...project,
                }
                return (<Project {...projectProps}/>)
              })
            }
             
            </div>
        </View>
        <View viewName="add-project" activeView={this.state.activeView} className="color2">
          <div className="header"><i className="fas fa-times" onClick={()=> this.setActiveView('projects')}></i></div>
          <div className="main">
          <h3>Add a project</h3>
				<form>
				  <div className="form-group">
				    <label htmlFor="name-input">Name</label>
				    <input type="text" className="form-control" name="name-input" id="name-input" placeholder="Enter project name"/>
				  </div>
				  <div className="form-group">
				    <label htmlFor="name-input">Description</label>
				    <input type="text" className="form-control" name="description-input" id="description-input" placeholder="Enter project description"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="name-input">Photo</label>
				    <input type="text" className="form-control" name="photo-input" id="photo-input" value="project.jpg"/>
				  </div>

				  <div className="form-group">
				    <label htmlFor="type-input">Type</label>
				    <select className="form-control" name="type-input" id="type-input">
				      <option value="1">Painting</option>
				      <option value="2">Sculpture</option>
				      <option value="3">Digital</option>
				    </select>
				  </div>

				  <button type="submit" className="btn btn-primary">Add</button>
				</form>
          </div>
        </View>
       
        <View viewName="nav" activeView={this.state.activeView} className="color5">
          <div className="header"><i onClick={()=> this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <ul className="menu">
              <li>
                <a onClick={()=> this.setActiveView('projects')} className="color1" href="#">projects</a>
              </li>
              <li>
                <a onClick={()=> this.setActiveView('add-project')} className="color2" href="#">Add a project</a>
              </li>
              {/* <li>
                <a onClick={()=> this.setActiveView('login')} className="color3" href="#">login</a>
              </li> */}
            </ul> 
          </div>
        </View>
		{/* <div className="view color1 active">
			<div className="header"><i className="fas fa-bars"></i></div>
			<div className="main">
				Home
			</div>
		</div>
		<div className="view color2">
			<div className="header"><i className="fas fa-times"></i></div>
			<div className="main">
				Cart
			</div>
		</div>
		<div className="view color3">
			<div className="header"><i className="fas fa-times"></i></div>
			<div className="main">
				Order
			</div>
		</div>
		<div className="view color4">
			<div className="header"><i className="fas fa-times"></i></div>
			<div className="main">
				Login
			</div>
		</div>
		<div className="view color5">
			<div className="header"><i className="fas fa-times"></i></div>
			<div className="main">
				Contact
			</div>
		</div> */}

	</div>
    )
  }
}

export default App;
