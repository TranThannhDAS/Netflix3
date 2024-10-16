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
export {getPaymentconfig, createOrder};