import React from 'react';
import Article from './Article';


function Articles(props){
                return (
                  <div className = "container"> 
                    {
                      props.articles.map(
                        (article, index) => <Article key={index} article={article} clickHandler={props.selectionHandler} />
                      )
                    }
                  </div>
                );
              }


export default Articles;