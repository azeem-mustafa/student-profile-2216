import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    userData: [],
    search: '',
    display: false,
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

  toggleButton = (e) => {
    const currentStatus = this.state.display;
    this.setState({
      display: !currentStatus
    })
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

                    {this.state.display
                      &&
                      <section className='data__grades-expanded'>

                        <p className='data__detail test__number'>Test 1: <span className='data__detail test__result'>{item.grades[0]}%</span></p>
                        <p className='data__detail test__number'>Test 2: <span className='data__detail test__result'>{item.grades[1]}%</span></p>
                        <p className='data__detail test__number'>Test 3: <span className='data__detail test__result'>{item.grades[2]}%</span></p>
                        <p className='data__detail test__number'>Test 4: <span className='data__detail test__result'>{item.grades[3]}%</span></p>
                        <p className='data__detail test__number'>Test 5: <span className='data__detail test__result'>{item.grades[4]}%</span></p>
                        <p className='data__detail test__number'>Test 6: <span className='data__detail test__result'>{item.grades[5]}%</span></p>
                        <p className='data__detail test__number'>Test 7: <span className='data__detail test__result'>{item.grades[6]}%</span></p>
                        <p className='data__detail test__number'>Test 8: <span className='data__detail test__result'>{item.grades[7]}%</span></p>
                      </section>
                    }

                  </div>
                </div>

                <div className='expandable'>
                  <button
                    className='expandable__button'
                    onClick={this.toggleButton}>
                    {!this.state.display ? '+' : '-'} </button>
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
