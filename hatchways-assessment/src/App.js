import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';
import StudentCard from './Components/StudentCard/StudentCard';




class App extends Component {
  state = {
    userData: [],
    search: '',
    tagInput: '',
    tags: []
  };

  componentDidMount() {
    axios.get('https://www.hatchways.io/api/assessment/students')
      .then(res => {
        this.setState({ userData: res.data.students })
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ search: e.target.value });
  }


  render() {

    const filteredUserData = this.state.userData.filter(
      (students) =>
        students.firstName.toUpperCase().includes(this.state.search.toUpperCase()) || students.lastName.toUpperCase().includes(this.state.search.toUpperCase())
    )

    return (

    

      <div className='data'>
        <div className='data__wrapper'>
        

        <input
            className='search search-name'
            type='search'
            name='search'
            placeholder='Search by name'
            onChange={this.handleChange} />
            
        {filteredUserData.map(({ id, pic, email, skill, firstName, lastName, company, grades }) => {
          return <StudentCard key={id} pic={pic} email={email} skill={skill} firstName={firstName} lastName={lastName} company={company} grades={grades} />

          {/* 

          <input
            className='search search-tag'
            type='search'
            name='search'
            placeholder='Search by tag'
            onChange={this.handleChange} /> */}

         
                  
{/* 
                  </div>
                </div> */}

              })}
        </div>
      </div>
          
    )
  }
}

export default App;