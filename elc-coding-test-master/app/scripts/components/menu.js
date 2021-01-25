/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React from 'react';
import data from '../../../server/data.js';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 500,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

class Menu extends React.Component {

    /**
     * Main constructor for the Menu Class
     * @memberof Menu
     */
    constructor() {
        super();
        this.state = {
            showingSearch: false,
            results: []
        };
    }

    /*
    fetch items with entered word
    */
        fetchItems(term) {
            console.log("completeUrl: " + `http://localhost:3035/product/${term}`)
            this.setState({loading: true})
            fetch(`http://localhost:3035/product/${term}`)
                .then(res=>res.json())
                .then(res=>{
                    this.setState({results: res, loading: false})
                })
                .catch(err=>{
                    this.setState({loading: false})
                    console.log(err)
                })
        }

    /**
     * Shows or hides the search container
     * @memberof Menu
     * @param e [Object] - the event from a click handler
     */
    showSearchContainer(e) {
        e.preventDefault();
        this.setState({
            showingSearch: !this.state.showingSearch
        });

        if(this.state.showingSearch){
            document.getElementById("text").value = "";
            this.setState({results: []});
        }

    }

    /**
     * Calls upon search change
     * @memberof Menu
     * @param e [Object] - the event from a text change handler
     */
    onSearch(e) {
        e.persist();
        const term = e.target.value.toLowerCase();
        if (term) {
            this.fetchItems(term);
        }

    }


    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     *
     * @returns JSX
     * @memberof App
     */
    render() {
        const { showingSearch, results, loading } = this.state

        return (
            <header className="menu">
                <div className="menu-container">
                    <div className="menu-holder">
                        <h1>ELC</h1>
                        <nav>
                            <a href="#" className="nav-item">HOLIDAY</a>
                            <a href="#" className="nav-item">WHAT'S NEW</a>
                            <a href="#" className="nav-item">PRODUCTS</a>
                            <a href="#" className="nav-item">BESTSELLERS</a>
                            <a href="#" className="nav-item">GOODBYES</a>
                            <a href="#" className="nav-item">STORES</a>
                            <a href="#" className="nav-item">INSPIRATION</a>

                            <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                                <i className="material-icons search">search</i>
                            </a>
                        </nav>
                    </div>
                </div>
                <div className={(this.state.showingSearch ? "showing " : "") + "search-container"}>
                    <input type="text" id="text" onChange={this.onSearch.bind(this)}/>
                    <a href="#" onClick={(e) => this.showSearchContainer(e)}>
                        <i className="material-icons close">close</i>
                    </a>

                    <div style={{padding: '3em'}}>
                        {
                            this.state.results.map((items,i) => {
                                return (
                                    <div className={'product-container'} key={i}>

                                        <div>
                                            <img style={{height: '100%', width: '50px', alignItems: 'center'}} src={items.picture}></img>
                                        </div>
                                        <div>
                                            <p style={{marginBottom: '1px'}}>{items.name}</p><span><b>{items.price}</b></span>
                                        </div>

                                    </div>
                                )

                            })
                        }
                    </div>

                </div>
            </header>
        );

    }


}

// Export out the React Component
module.exports = Menu;
