import React, { Component} from "react";
import "../styles/styles_main.css";
import Header from "./Header";
import Main from "./Main";
import Whyus from "./Whyus";
import Login from "./Login";
import Tariffs from "./Tariffs";
import Footer from "./Footer";
import Memberzone from "./Memberzone";
import Result from "./Result";

import {BrowserRouter, Route, Routes} from 'react-router-dom';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAuthenticated: false,
            searchHistory: {},
            searchProcess: false
        };
    }

    setAuthenticated = (value) => {
        this.setState({ isAuthenticated: value });
    };

    setSearchHistory = (searchHistory) => {
        this.setState({ searchHistory });

    };

    setSearchProcess = (searchProcess) => {
        this.setState({ searchProcess });
    }


    setDocsearch = (docsearch) => {
        this.setState({ docsearch });
    };

    setIds = (ids) => {
        this.setState({ ids });
    };

    render() {
        return (
            <>
                <BrowserRouter>
                    <Header isAuthenticated={this.state.isAuthenticated} setAuthenticated={this.setAuthenticated}/>
                    <Routes>
                        <Route path="/" element={
                            <>
                            <Main isAuthenticated={this.state.isAuthenticated}/>
                                <Whyus />
                                <Tariffs />

                            </>
                        } />
                        <Route path="/login/" element={<Login setAuthenticated={this.setAuthenticated} /> } />
                        <Route path="/memberzone/" element={<Memberzone setSearchHistory={this.setSearchHistory} setSearchProcess={this.setSearchProcess} setDocsearch={this.setDocsearch} setIds={this.setIds}/>} />
                        <Route path="/result/" element={<Result searchHistory={this.state.searchHistory} searchProcess={this.state.searchProcess} Docsearch={this.state.docsearch} ids={this.state.ids} />} />
                    </Routes>
                    <Footer />
                </BrowserRouter>

            </>
        )
    }
}

export default App;