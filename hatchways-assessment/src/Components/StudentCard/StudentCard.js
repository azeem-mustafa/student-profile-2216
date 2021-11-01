import React from "react";
import SearchByName from "../SearchByName/SearchByName";


class StudentCard extends React.Component {

    state = {
        display: false,
        tagInput: '',
        tags: []
    }

    toggleButton = (e) => {

        e.preventDefault()
        this.setState({display: !this.state.display})
       
    }

    handleChange = (e) =>{
        e.preventDefault()
        this.setState({tagInput: e.target.value})
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        console.log(this.state.tagInput)
        this.setState(prevState =>{
            return{
                 tags : [...prevState.tags, this.state.tagInput]
            }
         })
    }

    


    render() {
        return (
            <>
                <ul className='data__ul'>
                    <li className='data__li' key={this.props.id}>

                        <div className='data__li-wrapper-pic'>
                            <img className='data__pic' src={this.props.pic} alt='profile pic' />
                        </div>

                        <div className='data__li-wrapper-information-main'>
                            <h1 className='data__name'>{this.props.firstName.toUpperCase()} {this.props.lastName.toUpperCase()}</h1>

                            <div className='data__li-wrapper-information-sub'>

                                <p className='data__detail data__email'>Email: {this.props.email}</p>
                                <p className='data__detail data__company'>Company: {this.props.company}</p>
                                <p className='data__detail data__skill'>Skill: {this.props.skill}</p>
                                <p className='data__detail data__grades'>Average: {this.props.grades.reduce((a, b) => +a + +b) / this.props.grades.length}%</p>

                                <ul>
                                    <li className='tags'>
                                        
                                        {this.state.tags.map((tag) => (
                                            <p>
                                                {tag}
                                                </p>
                                        ))}
                                    </li>
                                    </ul>

                                <form className='form' type='submit' onSubmit={this.handleSubmit}>
                      <input className='form__tag' type='text' placeholder='Add a tag' onChange={this.handleChange} value={this.state.tagInput} />
                    </form> 

                                {this.state.display

                                    &&
                                    <section className='data__grades-expanded'>

                                        {this.props.grades.map((grade, index) => (
                                            <p className='data__detail test__number'>test {index + 1}: <span className='data__detail test__result'>{grade}%</span> </p>

                                        ))}

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
                </ul>
            </>
        )
    }
}

export default StudentCard