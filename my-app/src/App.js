import React from 'react';
//import logo from './logo.svg';
import './App.css';
import $ from "jquery";
import ArticleDetails from './ArticleDetails';
import Articles from './Articles';

class App extends React.Component {
        
        constructor(props){
              super(props);
              this.state = {'articles': [], 
                            'year': '1851',
                            'month': '1', 
                             selectedArticle: {
                                   byline: {original: ''},
                                   headline: {main: '',},
                                   word_count: '',
                                   pub_date: '',
                                   web_url: '',
                                   snippet: '',
                         } 
                             
                           };
              this.onSuccess = this.onSuccess.bind(this);
              this.handleChangeYear = this.handleChangeYear.bind(this);
              this.handleChangeMonth = this.handleChangeMonth.bind(this);
              this.handleFind = this.handleFind.bind(this);            
              this.handleArticleDetails = this.handleArticleDetails.bind(this);
             
            }
    
           handleArticleDetails(item){
                this.setState({selectedArticle: item});
                               
            }
         
           handleChangeYear(event) {
                  this.setState({year: event.target.value});

      }
          
           handleChangeMonth(event) {
                  this.setState({month: event.target.value}); 
      }
          
           handleFind(event){
                   event.preventDefault();
                   if(this.state.year == 1851 &&  this.state.month < 9){
                       return alert('You can search articles only from september 1851.')
                   }
                   if(this.state.year == new Date().getFullYear() && this.state.month > new Date().getMonth()){
                       return alert("You can't serch articles from the future")
                   }
                       
                   

                   $.ajax({
                      url: "https://api.nytimes.com/svc/archive/v1/" + this.state.year + "/" + this.state.month + ".json",  
                      method: 'GET',
                      data: {
                          'api-key': "9b98b8d3102b4c98b7c14e81de2e368e"
              },
                    success: this.onSuccess
              
          });
              }
          
        onSuccess(responseData) {
                  let articles = [];
                  for(var i = 0; i < 20; i++) {
                    const doc = responseData.response.docs[i];
                    articles.push(doc);
                  }
                  this.setState({'articles': articles});
                }
          
          
        componentDidUpdate(prevProps, prevState){  

                 if(!this.state.year || !this.state.month){
                      return
                  }    

                 const oy = prevState.year
                 const om = prevState.month

                 const ny = this.state.year
                 const nm = this.state.month

                 if(oy == ny && om == nm) {
                     return
                 }

                     
             }
          
         years() {
               let start = 1851;
               let end = new Date().getFullYear();
               let years = [];
                  for(var year = start ; year <=end; year++){
                      years.push(year); 
                   }    
                return years;
                } 
          
        render(){   
            
           return(
               <form onSubmit = {this.handleFind}>
                  
                    <label id = "labelYear">
                        
                        Year: <select id = 'year' className = 'inputField' onChange = {this.handleChangeYear}>;
                             { this.years().map(
                                (year) =>  <option value={year} key={year}>{year}</option>
                                )} 
                        </select>
       
                    </label>

                    <label id = "labelMonth">
                        Month: <select id = 'month' className = 'inputField'  value={this.state.month}  onChange = {this.handleChangeMonth}>
                                            <option value="1">January</option>
                                            <option value="2">February</option>
                                            <option value="3">March</option>
                                            <option value="4">April</option>
                                            <option value="5">May</option>
                                            <option value="6">June</option> 
                                            <option value="7">July</option>
                                            <option value="8">August</option>
                                            <option value="9">September</option>
                                            <option value="10">October</option>
                                            <option value="11">November</option>
                                            <option value="12">December</option>   
                              </select>
                    </label> 

                    <input type="submit" value="Find" id = "button"  />            

                    <div> 
                        {<Articles articles={this.state.articles} selectionHandler={this.handleArticleDetails} />} 
                    </div>

                    <div className = "details">
                             <ArticleDetails article={this.state.selectedArticle}/>
                    </div>
                       
               </form> 
               )
        }
      }

export default App;
