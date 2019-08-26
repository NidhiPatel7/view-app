import React,{Component} from 'react';
// import logo from './logo.svg';

import './App.css';

class View extends Component
{
  constructor(props)
  {
    super(props);
  }

  render()
  {
    // var className = this.props.className;//color class coming here
    // var children = this.props.children;
    var {className , children, viewName, activeView} = this.props;//this is destructor we got children(whole stuff of div we got in children) and class name

    //for if active true we add  active class and see active div otherwise not addactive view only otherclass
    var newClassName =  'view ' + className;
    // var className = (viewName === activeView) ? 'view  active ' + className : 'view  ' + className; in real life use same bucket

    return(viewName === activeView) ?(	<div className={newClassName}>
    {/* <div className="header"><i className="fas fa-bars"></i></div>
    <div className="main">
        Home
    </div> */}

    {/* {this.props.children} */
        children
    }
</div>) : null
  }
}

export default View;
