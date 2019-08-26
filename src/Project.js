import React,{Component} from 'react';
// import logo from './logo.svg';

import './App.css';

var serverUrl = 'http://localhost:4000/';

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
      var {setActiveView,setProjectToUpdate,id,} = this.props;
      setProjectToUpdate(id);
      setActiveView('edit-project');
  }
  render()
  {
   
    var {name,description,photo} = this.props;
    return(<div className="card project">
                <img className="card-img-top" src={serverUrl+ photo} alt="Card image cap" />
                {/* we got img here from api projects public folder  src={serverUrl+'painting.jpg'}*/}
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
