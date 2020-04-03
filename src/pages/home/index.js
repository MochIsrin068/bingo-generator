import React, { Component } from 'react';
import {GithubPicker, TwitterPicker, CompactPicker} from 'react-color'
import FontPicker from 'font-picker-react'
import HtmlToImage from 'html-to-image'
import FileSaver, { saveAs } from 'file-saver';

export default class Home extends Component {

    state = {
        grid : [

        ],
        title : "",
        subtitle : "",
        name : "",
        image : null,
        background : '#e8e8e8',
        activeFontFamily: "Open Sans",
        lineColor : "grey",
        textColor : "#fff"
    }

    handleChangeCompleteBackground = (color) => {
        this.setState({ background: color.hex });
    };

    handleChangeCompleteLine = (color) => {
        this.setState({ lineColor: color.hex });
    };

    handleChangeCompleteText = (color) => {
        this.setState({ textColor: color.hex });
    };
    
    

    titleChange = (e) => {
        const title = e.target.value
        this.setState({
            title
        })
    }

    subtitleChange = (e) => {
        const subtitle = e.target.value
        this.setState({
            subtitle
        })
    }

    nameChange = (e) => {
        const name = e.target.value
        this.setState({
            name
        })
    }   

    addGrid  = () => {
        this.setState({
            grid : [...this.state.grid, this.state.name],
        })
    }

    changeBackground = (e) => {
        const file = e.target.files[0]
        const reader  = new FileReader()

        reader.onload = () => {
            this.setState({
                image : reader.result
            })
        }

        if(file){
            reader.readAsDataURL(file)
        }else{

        }
    }

    convertToImage = () => {
        const grid = document.getElementById('grid') 

        HtmlToImage.toPng(grid).then(blob => {
            saveAs(blob, 'grid.png')
        })
    }


  render() {
      const {grid, title, subtitle, image} = this.state
    return (
      <div className="container">
          <div className="container__input">
                <div className="container__input__header">
                    <h2>The Bingo Generator</h2>
                    <a href="">Resfresh</a>
                </div>
                <input onChange={(e) => this.titleChange(e)} className="container__input__title apply-font" placeholder="title bingo..." />
                <input onChange={(e) => this.subtitleChange(e)} className="container__input__subtitle apply-font" placeholder="subtitle bingo..." />

                <div className="container__input__grid">
                    <input  onChange={(e) => this.nameChange(e)} className="container__input__grid__name apply-font" placeholder="name item bingo..." />
                    <button onClick={() => this.addGrid()}  className="container__input__grid__button apply-font">Add</button>
                </div>

                <div className="container__input__fonts">
                    <p>Change Font :</p>
                    <div className="container__input__fonts__picker">
                        <FontPicker
                        apiKey="AIzaSyDMe8GsA9c9eX8AfYqlts6Pw6wWpmYdgc0"
                        activeFontFamily={this.state.activeFontFamily}
                        onChange={nextFont =>
                            this.setState({
                                activeFontFamily: nextFont.family,
                            })
                        }
                        />
                    </div>
                </div>
                
                <div className="container__input__changeBackground">
                    <div className="container__input__changeBackground__image">
                        <p>With Background Image :</p>
                        <input type="file" onChange={(e) => this.changeBackground(e)}  title="Change Backgrond" className="apply-font"/>
                    </div>
                    <h2>| OR |</h2>
                    <div className="container__input__changeBackground__color">
                        <p>With Background Color : </p>
                        <TwitterPicker 
                            color={ this.state.background }
                            onChangeComplete={ this.handleChangeCompleteBackground }
                        />
                    </div>
                </div>

                <div className="container__input__changeBackgroundLine">
                    <GithubPicker 
                        color={this.state.lineColor}
                        onChangeComplete={this.handleChangeCompleteLine}
                    />

                    <div>
                        <h4>Change item border color</h4>
                        <h6>*Change item border color with pick one color before</h6>
                    </div>
                </div>

                <div className="container__input__changeBackgroundLine">
                    <CompactPicker 
                        color={this.state.lineColor}
                        onChangeComplete={this.handleChangeCompleteText}
                    />

                    <div>
                        <h4>Change Text color</h4>
                        <h6>*Change item text color with pick one color before</h6>
                    </div>
                </div>

          </div>

        <h3 style={{textAlign : "center", marginBottom : 10}}>Resulst : </h3>
          <div className="container__button">
              <button className="container__button__download"  onClick={() => this.convertToImage()}>Download Image</button>
          </div>

          <div className="container__generate">
            <div id="grid"  className="container__generate__results" style={{backgroundImage: `url(${this.state.image})`, backgroundColor : `${this.state.background}` }}>
                <div className="container__generate__results__head">
                    <h2 className="apply-font">{title}</h2>
                    <p className="apply-font">{subtitle}</p>
                </div>
                {grid.length === 0 ?
                    <div className="container__generate__results__grid">
                        <div className="container__generate__results__grid__itemempty" style={{border : `1px solid ${this.state.lineColor}`}}></div>
                        <div className="container__generate__results__grid__itemempty" style={{border : `1px solid ${this.state.lineColor}`}}></div>
                        <div className="container__generate__results__grid__itemempty" style={{border : `1px solid ${this.state.lineColor}`}}></div>
                        <div className="container__generate__results__grid__itemempty" style={{border : `1px solid ${this.state.lineColor}`}}></div>
                        <div className="container__generate__results__grid__itemempty" style={{border : `1px solid ${this.state.lineColor}`}}></div>
                    </div>
                :
                <div className="container__generate__results__grid">
                
                {grid.map((results, index) => {
                    return (
                            <div className="container__generate__results__grid__item apply-font" style={{border : `1px solid ${this.state.lineColor}`, color: `${this.state.textColor}`}}>{results}</div>
                            )
                        }) }
                        </div>
                
                }
            </div>
          </div>
      </div>
    );
  }
}
