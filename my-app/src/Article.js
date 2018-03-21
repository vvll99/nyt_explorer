import React from 'react';
import $ from "jquery";


class Article extends React.Component{
               constructor(props){
                  super(props);
                  this.state = {
                      title: '',
                      description: '',
                      image: '',
                     // url: ''
                  };

                  this.onSuccess = this.onSuccess.bind(this);
            }
          
          
                onSuccess(responseData){
                    let title = responseData.title;
                    let description = responseData.description;
                    let image = responseData.image;
                    this.setState({'title': title, 'description': description, 'image': image});

                }
          
                componentDidMount(){
                     
                      $.ajax({
                          url: 'https://api.linkpreview.net',  
                          method: 'GET',
                          data: {
                              'key': "5a8de33f3e9b1a8c4c731ee7934db1530bd8866afdc48",
                              'q': this.props.article.web_url
                          },
                          success: this.onSuccess
                      });
                    }
          

                render(){
                      const clickHandler = this.props.clickHandler;
                      const article = this.props.article;

                      const tr = 

                            <div className="article">
                                <div id = "articleTitle" onClick={() => clickHandler(article)} >{this.state.title} </div>
                                <div><img id = "articlePicture"  src={this.state.image} onClick={() => clickHandler(article)}/></div>
                                <div id = "articleDescription" onClick={() => clickHandler(article)} >{this.state.description}</div>                          

                            </div>;

                      return tr;
                }
            }

      export default Article;