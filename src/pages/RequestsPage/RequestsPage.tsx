import React, { useState, useEffect } from "react";
import RequestList from "../../components/request-list/RequestList";
import RequestForm from "../../components/RequestForm/RequestForm";
import './RequestsPage.css'; 

function RequestsPage() {
  const [showComponent, setShowComponent] = useState<string | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  const handleShowComponent = (component: string) => {
    setShowComponent(component);
  };

  const handleRequestSelect = async (requestId: string) => {
    const token = localStorage.getItem("accessToken"); // Получаем токен
    try {
      const requestResponse = await fetch(`/api/user-request/${requestId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const requestData = await requestResponse.json();

      const serviceResponse = await fetch(`/api/offered-services/${requestData.propositionServiceId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const serviceData = await serviceResponse.json();

      const userResponse = await fetch(`/api/users/${requestData.userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const userData = await userResponse.json();

      const addressResponse = await fetch(`/api/addresses/${requestData.addressId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Добавляем токен в заголовок
        },
      });
      const addressData = await addressResponse.json();

      setSelectedRequest({
        ...requestData,
        serviceTitle: serviceData.title,
        serviceDescription: serviceData.description,
        userName: `${userData.firstName} ${userData.lastName}`,
        userEmail: userData.email,
        address: `${addressData.street} ${addressData.numberHouse}, ${addressData.city}, ${addressData.index}`
      });
    } catch (error) {
      console.error("Ошибка при получении деталей запроса:", error);
    }
  };

  return (
    <div className="requests-page">
      <h2>Managing Requests</h2>
      <div className="button-group">
        <button
          className={`toggle-button ${showComponent === "RequestForm" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestForm")}
        >
          Add request
        </button>
        <button
          className={`toggle-button ${showComponent === "RequestList" ? "active" : ""}`}
          type="button"
          onClick={() => handleShowComponent("RequestList")}
        >
          Requst list
        </button>
      </div>

      <div className="component-container">
        {showComponent === "RequestForm" && <RequestForm />}
        {showComponent === "RequestList" && (
          <RequestList onSelectRequest={handleRequestSelect} />
        )}
      </div>

      {selectedRequest && (
        <div className="request-details">
          <h3>Request details</h3>
          <p><strong>Request description:</strong> {selectedRequest.description}</p>
          <p><strong>Photo:</strong> <img src={selectedRequest.picture} alt="Request" /></p>
          <p><strong>Desired Date & Time:</strong> {selectedRequest.desiredDateTime}</p>
          <p><strong>Service:</strong> {selectedRequest.serviceTitle} - {selectedRequest.serviceDescription}</p>
          <p><strong>User:</strong> {selectedRequest.userName} ({selectedRequest.userEmail})</p>
          <p><strong>Address:</strong> {selectedRequest.address}</p>
        </div>
      )}
    </div>
  );
}

export default RequestsPage;



// import React, { useState, useEffect } from "react";
// import RequestList from "../../components/request-list/RequestList";
// import RequestForm from "../../components/RequestForm/RequestForm";
// import './RequestsPage.css'; 

// function RequestsPage() {
//   const [showComponent, setShowComponent] = useState<string | null>(null);
//   const [selectedRequest, setSelectedRequest] = useState<any>(null);

//   const handleShowComponent = (component: string) => {
//     setShowComponent(component);
//   };

//   const handleRequestSelect = async (requestId: string) => {
//     try {
//       const requestResponse = await fetch(`/api/user-request/${requestId}`);
//       const requestData = await requestResponse.json();

//       const serviceResponse = await fetch(`/api/offered-services/${requestData.propositionServiceId}`);
//       const serviceData = await serviceResponse.json();

//       const userResponse = await fetch(`/api/users/${requestData.userId}`);
//       const userData = await userResponse.json();

//       const addressResponse = await fetch(`/api/addresses/${requestData.addressId}`);
//       const addressData = await addressResponse.json();

//       setSelectedRequest({
//         ...requestData,
//         serviceTitle: serviceData.title,
//         serviceDescription: serviceData.description,
//         userName: `${userData.firstName} ${userData.lastName}`,
//         userEmail: userData.email,
//         address: `${addressData.street} ${addressData.numberHouse}, ${addressData.city}, ${addressData.index}`
//       });
//     } catch (error) {
//       console.error("Ошибка при получении деталей запроса:", error);
//     }
//   };

//   return (
//     <div className="requests-page">
//       <h2>Managing Requests</h2>
//       <div className="button-group">
//         <button
//           className={`toggle-button ${showComponent === "RequestForm" ? "active" : ""}`}
//           type="button"
//           onClick={() => handleShowComponent("RequestForm")}
//         >
//           Add request
//         </button>
//         <button
//           className={`toggle-button ${showComponent === "RequestList" ? "active" : ""}`}
//           type="button"
//           onClick={() => handleShowComponent("RequestList")}
//         >
//           Requst list
//         </button>
//       </div>

//       <div className="component-container">
//         {showComponent === "RequestForm" && <RequestForm />}
//         {showComponent === "RequestList" && (
//           <RequestList onSelectRequest={handleRequestSelect} />
//         )}
//       </div>

//       {selectedRequest && (
//         <div className="request-details">
//           <h3>Request details</h3>
//           <p><strong>Request description:</strong> {selectedRequest.description}</p>
//           <p><strong>Photo:</strong> <img src={selectedRequest.picture} alt="Request" /></p>
//           <p><strong>Desired Date & Time:</strong> {selectedRequest.desiredDateTime}</p>
//           <p><strong>Service:</strong> {selectedRequest.serviceTitle} - {selectedRequest.serviceDescription}</p>
//           <p><strong>User:</strong> {selectedRequest.userName} ({selectedRequest.userEmail})</p>
//           <p><strong>Address:</strong> {selectedRequest.address}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RequestsPage;