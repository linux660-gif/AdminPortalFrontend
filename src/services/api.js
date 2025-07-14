import axios from 'axios'

const api = axios.create({
    baseURL : 'http://127.0.0.1:8000/InvestorDetails/api/',

    headers : {
        'Content-Type': 'application/json',
    },
});

export  const createInvestor = async (investorData) => {
    try {
        const response = await api.post('/investors/new' , investorData);
        return response.data;
    } catch (error){
        console.error('Error creating Investor:', error);
        throw error;
    };  
}

export const getInvestors = async () => {
    try{
        const response = await api.get('/investors');
        return response.data;  
    }catch (error){
        console.error("Error fetching Investors: ", error);
        throw error;
    }
}