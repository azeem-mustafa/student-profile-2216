import axios from 'axios';
import React, { Component } from 'react';
import './App.scss';
import StudentCard from './Components/StudentCard/StudentCard';

class App extends Component {
  state = {

    userData: [],
    searchName: '',
    searchTags: '',
    updatedTags: []
  };

  componentDidMount() {
    axios.get('https://www.hatchways.io/api/assessment/students')
      .then(res => {
        this.setState({ userData: res.data.students })
      })
  }

  handleChange = (e) => {
    e.preventDefault()
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUpdatedTags = (newTag, id) => {
    const updatedUserData = [...this.state.userData]
    const index = updatedUserData.findIndex((student) => {
      return student.id === id
    })

    updatedUserData[index].updatedTags = [...updatedUserData[index].updatedTags || [], newTag]

    this.setState({
      userData: updatedUserData
    })
  }

  render() {

    const filterNameAndTag = () => {
      if (this.state.searchName === "" && this.state.searchTags === "") {
        return this.state.userData;
      }

      if (this.state.searchName !== "" && this.state.searchTags === "") {
        return this.state.userData.filter(
          (student) =>
            student.firstName.toLowerCase().includes(this.state.searchName.toLowerCase()) ||
            student.lastName.toLowerCase().includes(this.state.searchName.toLowerCase())
        );
      }

      if (this.state.searchName === "" && this.state.searchTags !== "") {
        return this.state.userData.filter((student) =>
          (student.updatedTags || [])
            .map((tag) => tag.toLowerCase().includes(this.state.searchTags.toLowerCase()))
            .includes(true)
        );
      }

      if (this.state.searchName !== "" && this.state.searchTags !== "") {
        return this.state.userData.filter(
          (student) =>
            (student.firstName.toLowerCase().includes(this.state.searchName.toLowerCase()) ||
              student.lastName.toLowerCase().includes(this.state.searchName.toLowerCase())) &&
            (student.updatedTags || [])
              .map((tag) => tag.toLowerCase().includes(this.state.searchTags.toLowerCase()))
              .includes(true)
        );
      }
    };

    filterNameAndTag();

    const filteredUserData = filterNameAndTag(this.handleUpdatedTags)

    return (

      <div className='data'>
        <div className='data__wrapper'>

          <input
            className='search search-name'
            type='search'
            name='searchName'
            placeholder='Search by name'
            onChange={this.handleChange} />

          <input
            className='search search-tag'
            type='search'
            name='searchTags'
            placeholder='Search by tag'
            onChange={this.handleChange} />

          {filteredUserData.map(({ id, pic, email, skill, firstName, lastName, company, grades }) => {
            return <StudentCard key={id} pic={pic} email={email} skill={skill} firstName={firstName} lastName={lastName} company={company} grades={grades} handleUpdatedTags={this.handleUpdatedTags} id={id} />
          })}

        </div>
      </div>
    )
  }
}

export default App;