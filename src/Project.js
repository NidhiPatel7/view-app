import React,{Component} from 'react';
// import logo from './logo.svg';

import './App.css';

class Project extends Component
{
  constructor(props)
  {
    super(props);
    //console.log(props);
  }
  handleDeleteProjectClick = () =>
  {
     var {deleteProject,id} = this.props;
     deleteProject(id);
  }
  handleUpdateProjectClick = () =>
  {
      var {setActiveView,setProjectToUpdate,id} = this.props;
      setProjectToUpdate(id);
      setActiveView('edit-project');
  }
  render()
  {
   
    var {name,description} = this.props;
    return(<div className="card project">
                <img className="card-img-top" src="project.jpg" alt="Card image cap" />
                <div className="card-body">
                <h5 className="card-title">{/*this.props.name*/name}</h5>
                <p className="card-text">{/*this.props.description*/description}</p>
                <p>
                    <i className="fas fa-heart"></i>
                    <i className="fas fa-edit" onClick={this.handleUpdateProjectClick}></i>
                    <i className="fas fa-trash" onClick={this.handleDeleteProjectClick}></i>
                </p>
            
                </div>
            </div>);
  }
}

export default Project;
