
import axios from 'axios';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    userData: [],
  };

  componentDidMount() {
    axios.get('https://www.hatchways.io/api/assessment/students')
      .then(res => {
        console.log(res.data.students)
        this.setState({ userData: res.data.students })
      })
  }
  render() {
    const { userData } = this.state;

    return (
      <div className='data'>
        <ul>
          {userData.map(item => (
            <li key={item.name}>
              <img className='data__pic' src={item.pic} alt='profile pic' />
              <h1 className='data__name'>{item.firstName}</h1>
              <h2 className='data__email'>Email: {item.email}</h2>
              <h2 className='data__company'>Company: {item.company}</h2>
              <h2 className='data__skill'>Skill: {item.skill}</h2>
              <h2 className='data__grades'>Average: {item.grades.reduce((a,b) => +a + +b)/item.grades.length}%</h2>
            </li>

          ))}
        </ul>
      </div>
    )
  }
}


export default App;
