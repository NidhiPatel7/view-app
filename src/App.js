import React,{Component} from 'react';
import Axios from'axios';
import View from'./View';
import Project from'./Project';
import AddProjectForm from'./AddProjectForm';
import EditProjectForm from'./EditProjectForm';
// import logo from './logo.svg';
import './App.css';


//where the server is
// var urlPrefix = 'http:/10.4.24.22(ip address of pc):3001/api';
var urlPrefix = 'http://localhost:4000/api';

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
      ],
      types:[],
      curentType:null,
      projectToUpdate:null,
    }
  }

  //we want to use in project.js for particular project
  setProjectToUpdate = (id) =>
  {
    var foundProject = this.state.projects.find((project) => {
      return project.id === id;
    })
    this.setState({projectToUpdate:foundProject});
  }

  setCurrentType = (id) =>
  {
    var foundType = this.state.types.find((type) => {
      return type.id === id;
    })
    
    foundType ? this.setState({curentType:foundType}) : this.setState({curentType:null});
  }
  // for active class
  setActiveView = (view) => 
  {
    this.setState({activeView:view});
  }

  getProjects = () =>
  {
      Axios.get(urlPrefix+'/projects')
      .then(res=>{
        //console.log(res);
        this.setState({projects:res.data});
      })
  }
  getTypes = () =>
  {
      Axios.get(urlPrefix+'/types')
      .then(res=>{
        //console.log(res);
        this.setState({types:res.data});
      })
  }
  addProject = (data) =>
  {
    Axios.post(urlPrefix+'/projects',data)
    .then(res=>{
      //console.log(res);
      //$r.addProject({name:'p1',description:'test'}) click on app and copy this in comand prompt
      this.getProjects()//refrase page automatically after add data
    })
  }
  deleteProject = (id) => 
  {
    Axios.delete(urlPrefix+'/projects/'+id)//rest table formate 
    .then(res => {
      //console.log(res);
      //$r.deleteProject(1565833927595) test in console log
      this.getProjects()//refrase page automatically after add data
    })
  }
  updateProject = (id,data) =>
  {
    Axios.put(urlPrefix+'/projects/'+id,data)//rest table formate 
    .then(res => {
      console.log(res);
      //$r.updateProject(1566180317318,{name:"nidhi"})
      this.getProjects()//refrase page automatically after add data
    })
  }
  uploadFile = (formData) =>
  {
    // you get back a promise - we saw later
    // axios settings form data https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
    var settings =  { headers: {'Content-Type': 'multipart/form-data' }};
    return Axios.post(urlPrefix+'/upload',formData,settings)
  }
  componentDidMount(){
    this.getProjects();
    this.getTypes();
  }

  handleProjectTypeClick = (e) =>
  {
  
    var link = e.target;

    this.setCurrentType(parseInt(link.dataset.type));//dataset give which type is
    this.setActiveView('projects')
  }
  render()
  {
    var {curentType,projects} = this.state;
    if(curentType)
    {
      projects = projects.filter(project => {
        return project.type_id === curentType.id;
      })
    }
    return(
      <div className="app">
        <View viewName="projects" activeView={this.state.activeView} className="color1">

            <div className="header">
              <i className="fas fa-plus" onClick={()=> this.setActiveView('add-project')}></i>
              <i onClick={()=> this.setActiveView('nav')} className="fas fa-bars"></i>
            </div>
            <div className="main">
            <h3>{curentType ? curentType.name :null}</h3>
            {
              projects.map((project) => {
                var projectProps = {
                  key:project.id,
                  ...project,
                  deleteProject:this.deleteProject,
                  setActiveView:this.setActiveView,
                  setProjectToUpdate:this.setProjectToUpdate,
                  // updateProject:this.updateProject,
                }
                return (<Project {...projectProps}/>)
              })
            }
             
            </div>
        </View>
        <View viewName="add-project" activeView={this.state.activeView} className="color2">
          <div className="header">
            
            <i className="fas fa-times" onClick={()=> this.setActiveView('projects')}></i>
          </div>
          <div className="main">
          <h3>Add a project</h3>
            <AddProjectForm uploadFile={this.uploadFile} addProjects={this.addProject} setActiveView={this.setActiveView}/>
          </div>
        </View>

        <View viewName="edit-project" activeView={this.state.activeView} className="color3">
          <div className="header">
            
            <i className="fas fa-times" onClick={()=> this.setActiveView('projects')}></i>
          </div>
          <div className="main">
          <h3>Update a project</h3>
            <EditProjectForm {...this.state.projectToUpdate}
            updateProject={this.updateProject} setActiveView={this.setActiveView}/>
          </div>
        </View>
       
        <View viewName="nav" activeView={this.state.activeView} className="color5">
          <div className="header"><i onClick={()=> this.setActiveView('projects')} className="fas fa-times"></i></div>
          <div className="main">
            <ul className="menu">
              <li>
                <a data-type="null" onClick={this.handleProjectTypeClick} className="color1" href="#">All projects</a>
              </li>
              {
                this.state.types.map(type => {
                  return (<li>
                  <a data-type={type.id} onClick={this.handleProjectTypeClick} className="color1" href="#" >{type.name}</a>
                </li>)
                })
              }
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
