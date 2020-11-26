import React from 'react';
import Entry from './Entry';
import "./EntryList.css"
import {Icon} from '@blueprintjs/core';

function range(start, end) {
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
}

class EntryList extends React.Component {
    componentDidUpdate(prevProps){
        console.log("entrylist update")
        if(prevProps.entryList !== this.props.entryList) {
            console.log("entrylist render called")
            this.render();
        }
    }

    render() {
        var onClickRemove = this.props.onClickRemove
        var onTypeChange = this.props.onTypeChange
        var onUpClick = this.props.onUpClick
        var onDownClick = this.props.onDownClick

        var id = range(0,this.props.entryList.length)
        return (
            <div>
                {this.props.entryList.map(function (content, index) {
                    return (<div className="entrycontent" key={index}>
                        <div className="crossicon"><Icon icon="small-cross" iconSize="40px" style={{color:"white",cursor:"pointer"}} onClick={() => onClickRemove({index: id[index]})}/></div>
                        <Entry key={index} content={content} onTypeChange={onTypeChange} number={id[index]}/>
                        <div className="arrows">
                            <Icon icon="caret-up" iconSize="30px" style={{color:"white",cursor:"pointer",marginBottom:"5px"}} onClick={() => onUpClick(id[index])}/>
                            <Icon icon="caret-down" iconSize="30px" style={{color:"white",cursor:"pointer",marginTop:"5px"}} onClick={() => onDownClick(id[index])}/>
                        </div>
                    </div>)
                })}
            </div>
        )
    }
}
export default EntryList;
