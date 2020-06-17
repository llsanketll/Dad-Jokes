import React, { Component } from 'react'
import './ScrollBar.css'

export default class ScrollBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: this.props.height
        };
        this.handleScroll = this.handleScroll.bind(this);
    }
    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    handleScroll() {
        let totalHeight = document.body.scrollHeight - window.innerHeight;
        let progress = (window.pageYOffset / totalHeight) * 100;
        this.setState({ height: progress });
    }
    render() {


        return (
            <div className="ScrollBar" style={{ height: `${this.state.height}%` }}>
            </div>
        )
    }
}
