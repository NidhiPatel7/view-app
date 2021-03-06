import React,{Component} from 'react';
// import logo from './logo.svg';

import './App.css';

class AddProjectForm extends Component
{
  constructor(props)
  {
    super(props);
    //console.log(props);
   
  }
  handelFormSubmit = (e) =>
  {
    e.preventDefault();
    var {uploadFile,addProjects,setActiveView} = this.props;
    var formData = new FormData(this.form);//FormData() is part of dom we get all data from form-of project
    uploadFile(formData).then(res => {
      // when file uplodaed then you get res
      var fileName = res.data;

      var data = {
            name:formData.get('name-input'),
            description:formData.get('description-input'),
            photo:fileName,
            type_id:parseInt(formData.get('type-input')),
        }
        addProjects(data);
        setActiveView('projects');
    })

    // var data = {
    //     name:formData.get('name-input'),
    //     description:formData.get('description-input'),
    //     type_id:parseInt(formData.get('type-input')),
    // }
    // //console.log(data);
    // this.props.addProjects(data);
    // this.props.setActiveView('projects');
  }
  
  render()
  {
   
   
    return(	<form  onSubmit={this.handelFormSubmit} 
        ref={(el) =>{this.form = el}}>
            
            {/* el is stands for element which is form, ref={function(){}} for get anything from form */}
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
          <input type="file" className="form-control" name="photo-input" id="photo-input" />
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
      </form>);
  }
}

export default AddProjectForm;
