import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    userData: [],
    search: '',
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
            className='search-name'
            type='search'
            name='search'
            placeholder='Search by name'
            onChange={this.handleChange} />

          <ul className='data__ul'>
            {filteredUserData.map(item => (
              <li className='data__li' key={item.firstName}>

                <div className='data__li-wrapper-pic'>
                  <img className='data__pic' src={item.pic} alt='profile pic' />
                </div>

                <div className='data__li-wrapper-information-main'>
                  <h1 className='data__name'>{item.firstName.toUpperCase()} {item.lastName.toUpperCase()}</h1>

                  <div className='data__li-wrapper-information-sub'>
                    <p className='data__detail data__email'>Email: {item.email}</p>
                    <p className='data__detail data__company'>Company: {item.company}</p>
                    <p className='data__detail data__skill'>Skill: {item.skill}</p>
                    <p className='data__detail data__grades'>Average: {item.grades.reduce((a, b) => +a + +b) / item.grades.length}%</p>
                  </div>

                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
