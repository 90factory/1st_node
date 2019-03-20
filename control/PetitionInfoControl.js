const SearchResult = require('../model/SearchResult')
const usersQuery = require("../model/usersQuery");
const request = require('request');

 class DetailInfo {
    constructor(){

    }
    getPetition(req,res){
        request({
            url : 'http://192.168.1.2:8000/apis/entire',
            json : true,
            
        }, (error,response, body)=>{
            const PetitionData = body
         
            //res.status(200).json(PetitionData)
        })
        let data = [ ] 
        data.push(SearchResult)
        res.status(200).json(data)
    }
    getSearch(req,res){
        request.get({
            url : 'http://192.168.1.2:8000/apis/keyword',
            qs : req.query,
            json : true
        }, (error,response, body)=>{
            const PetitionData = body
           
            res.status(200).json(PetitionData)
            
        })
        //let data = [] 
        //data.push(SearchResult)
        //res.status(200).json(data)
    }
    postHistory(req,res){
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        usersQuery.addHistory(userEmail,petitionId)
    }
    getHistory(req,res){
        const email = req.query.email
        usersQuery.findHistory(email)
                  .then((data) => {
                    
                    const historyInfo = data[0]
                    let temp = []

                    historyInfo.forEach(data => {
                        temp.push(data.DocumentID)
                    })
                    
                    let idList = temp.reduce((a,b) => {
                        if( a.indexOf(b) < 0){
                            a.push(b)
                        }
                        return a;
                    },[])
                    //console.log(idList)
                    //idList의 값들을 Django에 request 보낸다.

                    res.status(200).json({
                        history : idList    
                    })

                  })
                  .catch(()=>{})
    }
    postRecommend(req,res) {
        const petitionId = req.body.petitionID
        const userEmail = req.body.email
        usersQuery.postRecommend(userEmail,petitionId)
    }

}

module.exports = DetailInfo
