import React from 'react';


const ArticleDetails = (props) => {
                    const article = props.article;
            
                    return (
                        <div>
                            <ul>
                                <li> <b>Headline:</b> {article.headline ? article.headline.main : ""}</li>
                                <li> <b>Snippet:</b> {article.snippet}</li>
                                <li> <b>By:</b> {article.byline ? article.byline.original : "" }</li>
                                <li> <b>Word count:</b> {article.word_count}</li>
                                <li> <b>Date:</b> {article.pub_date}</li>
                                <li> <b>Url:</b> <a href = {article.web_url} target="_blank" > {article.web_url} </a></li>
                            </ul>
                        </div>
                    );
                }

export default ArticleDetails;