import React from "react";

class SearchByName extends React.Component{

    state={
        search: ''
    }

    handleChange = (e) => {
        e.preventDefault()
        this.setState({ search: e.target.value });
      }
    render(){
        return(
            <>
            <input
            className='search search-name'
            type='search'
            name='search'
            placeholder='Search by name'
            onChange={this.handleChange} />
            </>
        )
    }
}

export default SearchByName