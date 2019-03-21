import axios from 'axios'


//const DOMAIN = 'http://localhost:3000'
const DOMAIN = 'http://192.168.1.4:3000'
const api = (method, url, data) => {
    return axios({
        method,
        url : DOMAIN + url,
        data
    }).then(result => result.data)
      
}

export const User = {

    fetch (petitionID) {
        return axios.get(DOMAIN+'/detail',{params : { petitionID : petitionID}})
    }
}
export const Register = {
    fetch (email,password,sex,age,area,nickname) {
        return axios.post(DOMAIN+'/register', {
            email : email,
            password : password,
            sex : sex,
            age : age,
            area : area,
            nickname : nickname
        })
    }
}
export const Login = {
    fetch (loginObj) {
        return axios.post(DOMAIN+'/login', {
            email : loginObj.email,
            password : loginObj.password
           })
    }
}

export const UserInfo = {
    fetch (email,nickname,Sex,Area,Age,password) {
        return axios.post(DOMAIN+'/revise', {
            email : email,
            nickname : nickname,
            sex : Sex,
            area : Area,
            age : Age,
            password : password
        })
    },
    revise (email,password) {
        return axios.post(DOMAIN+'/password',{
            email : email,
            password : password
        })
    },
    delete(email,password) {
        return axios.post(DOMAIN+'/delete',{
            email : email,
            password : password
        })
    },
    addHistory(petitionID) {

        return axios.post(
            DOMAIN+'/history',
            {
            petitionID : petitionID,
            email : localStorage.getItem('email')
            })
    },
    getHistory() {
        return axios.get(DOMAIN+'/history',{
           params:{ email : localStorage.getItem('email')}
        })
    }
}

export const Petitions = {

    fetch () {
        
        return api('get','/petitions')
    },
    postRecommend(petitionID) {

        return axios.post(DOMAIN+'/recommend',{
            petitionID : petitionID,
            email : localStorage.getItem('email')
        })
    }
 
}

export const Search = {

    
    fetch (keyward) {
     
       return axios.get(DOMAIN+'/search',{params : { keyward : keyward}})
            
    }
}


export const Token = {
    
    getNewToken () {
        const refreshToken = localStorage.getItem('refresh-token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${refreshToken}`
        return axios.get(DOMAIN+'/refreshtoken')
    }
}