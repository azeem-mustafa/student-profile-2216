import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';

class App extends Component {
  state = {
    userData: [],
    search: '',
    display: false,
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

  toggleButton = (e) => {
    const currentStatus = this.state.display;
    this.setState({
      display: !currentStatus,

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
            className='search search-name'
            type='search'
            name='search'
            placeholder='Search by name'
            onChange={this.handleChange} />

          <input
            className='search search-tag'
            type='search'
            name='search'
            placeholder='Search by tag'
            onChange={this.handleChange} />

          <ul className='data__ul'>
            {filteredUserData.map(item => (

              <li className='data__li' key={item.id}>

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

                        {item.grades.map((grade, index) => (
                          <p className='data__detail test__number'>test {index + 1}: <span className='data__detail test__result'>{grade}%</span> </p>

                        ))}

                      </section>
                    }

                    <form className='form'>
                      <input className='form__tag' type='text' placeholder='Add a tag'/>
                    </form>

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
