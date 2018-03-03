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
                console.log(item)
                console.log("Hello from handleTableRowClick!");
                console.log(JSON.stringify(item));
                this.setState({selectedArticle: item});
                               
            }
         
           handleChangeYear(event) {
//                  debugger;
                  this.setState({year: event.target.value});
//                  console.log(this.state.year)
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
                  console.log(articles)
                  for(var i = 0; i < 20; i++) {
                    const doc = responseData.response.docs[i];
                      console.log(doc)
                    articles.push(doc);
                  }
                  this.setState({'articles': articles});
                }
          
          
        componentDidUpdate(prevProps, prevState){
                 console.log('componentDidUpdate')  

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

                console.log('AJAX')      
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
            
           console.log('render')    
            
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
         // return <Urls data={this.state.urls}/>;
               )
        }
      }


        const ArticleDetails = (props) => {
                    const article = props.article;
                    console.log(article);
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
                    console.log(responseData)
                    let title = responseData.title;
                    let description = responseData.description;
                    let image = responseData.image;
                    //let url = responseData.url;
                    this.setState({'title': title, 'description': description, 'image': image});

                }
          
                componentDidMount(){
                      console.log(this.props.article.web_url)
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
          
//        componentDidMount(){
//            
//            console.log(this.props.article.web_url)
//          $.ajax({
//              url: 'https://api.linkpreview.net',  
//              method: 'GET',
//              data: {
//                  'key': "123456",
//                  'q': 'https://www.google.com'
//              },
//              success: this.onSuccess
//          });
//        }
//          
                render(){
                      const clickHandler = this.props.clickHandler;
                      const article = this.props.article;

                      const tr = 

                            <div className="article">
                                <div id = "articleTitle" onClick={() => clickHandler(article)} >{this.state.title} </div>
                                <div><img id = "articlePicture"  src={this.state.image} onClick={() => clickHandler(article)}/></div>
                                <div id = "articleDescription" onClick={() => clickHandler(article)} >{this.state.description}</div>                          

                            </div>;

                      console.log(tr)
                      return tr;
                }
            }

      
        const root = document.getElementById('root');   
        ReactDOM.render(<App />,  root);
      

