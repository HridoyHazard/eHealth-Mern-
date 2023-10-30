import React, { useEffect } from "react";

const Success = () => {
  function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }
  const cus_name = getParameterByName("cus_name");
  const pay_status = getParameterByName("pay_status");
  const amount = getParameterByName("amount");
  const pay_time = getParameterByName("pay_time");
  const cus_phone = getParameterByName("cus_phone");
  const currency = getParameterByName("currency");
  const opt_a = getParameterByName("opt_a");

  //   console.log(cus_name, pay_status, amount, pay_time, cus_phone, currency);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.replace(`/order/${opt_a}`);
    }, 5000); // 5000 milliseconds = 5 seconds

    return () => clearTimeout(timeout);
  }, []);
  

  return (
    <>
      <body class="container" style={{width: "40%"}}>
        <div class="mt-5" style={{border: "2px solid"}}>
          <h2 class="text-center mt-3">Payment Status</h2>
          <div class="row p-5">
            <div class="col-md-7">
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Name:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{cus_name}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Phone:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{cus_phone}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Pay Time:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{pay_time.substring(0, 10)}</label>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Status:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{pay_status}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Amount:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{amount}</label>
                </div>
              </div>
              <div class="row">
                <div class="col-4">
                  <label class="float-end">Currency:</label>
                </div>
                <div class="col-6">
                  <label class="float-start">{currency}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </>
  );
};

export default Success;
