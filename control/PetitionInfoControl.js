const SearchResult = require('../model/SearchResult')
const usersQuery = require("../model/usersQuery");
const request = require('request');
const querystring = require('querystring');
const Url = 'http://192.168.1.17:8000'
//const Url = 'http://192.168.1.2:8000'
 class DetailInfo {
    constructor(){

    }
    getPetition(req,res){
        request({
            url : Url + '/apis/entire',
            json : true,
        }, (error,response, body)=>{
            const PetitionData = body
         
            res.status(200).json(PetitionData)
            if(error){
                res.status(401).json({message : "Fail"})
            }
        })
        //let data = [ ] 
        //data.push(SearchResult)
        //res.status(200).json(data)
    }
    getSearch(req,res){
        request.get({
            url : Url+'/apis/keyword',
            qs : req.query,
            json : true
        }, (error,response, body)=>{
            const PetitionData = body
           
            res.status(200).json([PetitionData])
            if(error){
                res.status(401).json({message : "Fail"})
            }
        })
        //let data = [] 
        //data.push(SearchResult)
        //res.status(200).json(data)
    }
    postHistory(req,res){
        const petitionId = req.body.ID
        const userEmail = req.body.email

        usersQuery.addHistory(userEmail,petitionId)
                  .then(() => {
                                    res.status(200).json({message : "Success"})
                                  })
                  .catch(() =>{res.status(401).json({message : "Fail"})})
                  
    }
    getHistory(req,res){
        const email = req.query.email
        usersQuery.findHistory(email)
                  .then((data) => {
                    
                        const historyInfo = data[0]
                        let temp = []

                        historyInfo.forEach(data => {
                            const petitionID = data.DocumentID
                            //const tableID = data.HistoryID
                            //const info = { petitionID , tableID}
                            temp.push(petitionID)
                        })
                        
                        let idList = temp.reverse().reduce((a,b)=>{
                            if(a.indexOf(b) < 0) {
                                a.push(b)
                            }
                            return a;
                        },[])
                 
                    return idList
                  })
                  .then((data) => {
                   
                    let recentPageID = []
                    for(let i = 0; i <5 ; i++ ){
                        recentPageID.push(data[i])
                    }
                    request.get({
                        url : Url +'/apis/history',
                        qs : recentPageID,
                        json : true
                    }, (error,response, body)=>{
                        const PetitionData = body
                        res.status(200).json(PetitionData)
                        if(error){
                            res.status(401).json({message : "Error"})
                        }
                    })   
                  })
                 
    }
    postRecommend(req,res) {
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        let isRecommended = false;

        usersQuery.getRecommend(petitionId)
                  .then((data) => {
                        const recommendResult = data[0]
                        
                        recommendResult.forEach(recommend => {
                            
                            if(recommend.Email === userEmail){
                               if(recommend.VotingStatus === 1){
                                
                                isRecommended = true;
                            
                               }
                            }
                            
                        })
                        return isRecommended;
                    })
                  .then((result) => {
                     
                      if(!result) {
                          
                          usersQuery.postRecommend(userEmail, petitionId)
                                    .then(() => {
                                        res.status(200).json({message : "Success"})
                                    })
                                    .catch((err) => {
                                        if(err) {
                                            res.status(401).json({message : 'Fail'})
                                        }
                                    })
                      }
                      else {
                          res.status(200).json({message : 'Already Recommend'})
                      }
                  })
                
                  
                   
                    

    }

}

module.exports = DetailInfo
