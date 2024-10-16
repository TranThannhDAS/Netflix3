import SideBar from "../SideBar";
import React, { useEffect, useState } from "react";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { Empty } from "../../../Components/Notfications/Empty";
import Loader from "../../../Components/Notfications/Loader";
import { GetAllPayment } from "../../../Redux/APIs/PaymentServices";


const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

const PaymentAdmin = () =>{

  const [payment,setPayment] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
          const data = await GetAllPayment();
          console.log(data);
          setPayment(data);
      } catch (error) {
          console.error("Error fetching payment config:", error);
      }
  };

  fetchData();
  },[]);

   return(
    <>
    <SideBar>
    <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Payment List</h2>
        </div>
        {payment != null && (
            <TablePayment
              data={payment}          
            />
          )}
      </div>
    </SideBar>
    </>
   )
};
function TablePayment({ data }) {
   return (
     <div className="overflow-x-scroll overflow-hidden relative w-full">
       <table className="w-full table-auto border border-border divide-y divide-border">
         <thead>
           <tr className="bg-dryGray">
             <th scope="col" className={`${Head}`}>
               PaymentID
             </th>
             <th scope="col" className={`${Head}`}>
               Email
             </th>    
             <th scope="col" className={`${Head}`}>
               ExpirationDate
             </th>
             <th scope="col" className={`${Head}`}>
               Total Price
             </th>       
           </tr>
         </thead>
         <tbody className="bg-main divide-y divide-gray-800">
           {data.map((movie, i) =>
             RowsPayment(movie, i)
           )}
         </tbody>
       </table>
     </div>
   );
 }
 const RowsPayment = (movie, i) => {
   return (
     <tr key={i}>
       <td className={`${Text}`}>
        {movie.orderId}
       </td>
       <td className={`${Text}`}>{movie.email}</td>
       <td className={`${Text}`}>{movie.expirationDate}</td>
       <td className={`${Text}`}>{movie.price}</td>
     </tr>
   );
 };
export default PaymentAdmin;