import AxiosJava from "./AxiosJava";

const getPaymentconfig = async () =>{
    try {
        const { data } = await AxiosJava.get('/Payment/GetDataPayment');
        return data;
    } catch (error) {
        console.error('Error fetching payment config:', error);
        throw error;
    }
}
const createOrder = async (order) =>{
    try {
        const { data } = await AxiosJava.post('/Payment/CreateOrder',order);
        return data;
    } catch (error) {
        console.error('Error fetching payment config:', error);
        throw error;
    }
}
const confirmPayment = async(email,price,time,token,payerID) =>{
    try{        
        const {data} = await AxiosJava.get(`/Payment/confirm-payment?email=${email}&price=${price}&time=${time}&token=${token}&PayerID=${payerID}`);
        return data;
    }catch(error){
        console.error('Error fetching payment config:', error);
        throw error;
    }
}
const GetDetailPayment = async(email) =>{
    try{
        const {data} = await AxiosJava.get(`/Payment/getDetailRegister?email=${email}`);
        return data;
    }catch(error){
        console.error('Error fetching payment config:', error);
        throw error;
    }
}
const GetAllPayment = async() =>{
    try{
        const {data} = await AxiosJava.get(`/Payment/GetAllRegister`);
        return data;
    }catch(error){
        console.error('Error fetching payment config:', error);
        throw error;
    }
}
export {getPaymentconfig, createOrder,confirmPayment, GetDetailPayment,GetAllPayment};