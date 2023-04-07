
import React, { useState, useEffect } from "react";
import ('./styles.css')

// I create this for some of the buttons later
const Button = ({onClick,text}) => {
  return ( <button onClick = {onClick} class="btn btn-primary">{text}</button>)
}

// Some restrictions regarding the creation and update of fields
const Restrictions = () => {
  return (
  <div>
  <p> Invoice Number is a mandatory field </p>
  <p> Emission Date is a mandatory field and has to be between 2020-01-01 and 2023-12-31</p>
  <p> Amount is a mandatory field </p>
  </div>
  )
}

// Here starts the app
const App = () => {


  const [invoices, setInvoices] = useState([])
  const [variable,setVariable] = useState([])

  const [singleInvoice, setSingleInvoice] = useState(null);

  //const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [inputsNewInvoice, setInputsNewInvoice] = useState({});
  const [inputsUpdateInvoice, setInputsUpdateInvoice] = useState({});


    // Main part of the URL that is always constant
    const url = 'https://full-stack-ope-fgb-p2.onrender.com/api';

    // Call REST API to get all invoices when webpage is loaded
    useEffect(()=>{
        const fetchData  = async () => {
          const result = await fetch(url+'/getall',{method: 'GET'})
          result.json().then(json => {

            setInvoices(json);
        })
      }
        fetchData()     
    }
        ,[])

    // Call REST API to get all invoices, with button
    const getInvoies = () => {
      const fetchData  = async () => {
        const result = await fetch(url+'/getall',{method: 'GET'})
        result.json().then(json => {
          console.log(json);

          setInvoices(json);
      })
    }
      fetchData()     
      }
    
    // Call REST API to get one specific invoice
    const getOneInvoice = () => {
      var invoiceID = $(".textinputgetinvoice").val();
      console.log(invoiceID);
      
      const fetchData  = async () => {

        await fetch(url+'/'+invoiceID,{method: 'GET'})
        .then(res => {
          console.log(res);

          if(!res.ok){
            throw Error("Could not fetch data properly. Check ID")
          }

          res.json().then(json => {
          console.log(json);
          setSingleInvoice(json);
          })

      })

    }
        fetchData()   
        
        .catch(apiErr => {
          alert(apiErr.message);
        })
    
  }

  // Call REST API to delete one specific invoice
  const deleteOneInvoice = () => {
    var invoiceID = $(".textinputdeleteinvoice").val();
    console.log(invoiceID);
    
    const fetchData  = async () => {

      await fetch(url+ '/delete/' + invoiceID ,{method: 'DELETE'})
      .then(res => {
        console.log(res);

        if (res.status==500) {

                  throw Error("Could not delete invoice, please check that the ID exists.")
              
        } else if (res.status!=200){
          throw Error("Could not delete invoice properly, please try again.")
        } else {

        res.json().then(json => {
        console.log(json);
        alert("Invoice deleted successfully!")
        })
      }

    })

  }
      fetchData()   
      
      .catch(apiErr => {

        alert(apiErr.message);
        
      })
  
}

  // Handlers for the forms for creation and update
  const handleChangeNewInvoice = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsNewInvoice(values => ({...values, [name]: value}))
  }

  const handleChangeUpdateInvoice = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputsUpdateInvoice(values => ({...values, [name]: value}))
  }

// Call REST API to create one invoice
const createInvoice = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputsNewInvoice) };

      const sendInvoiceCreation  = async () => {

      await fetch(url+'/add',requestOptions)
      .then(res => {
          //console.log(res);

          if (res.status==500) {

            throw Error("Could not create invoice, please check that values are valid.")

          } else if (res.status!=200){
            throw Error("Could not fetch data properly, please try again")
          } else {

          res.json().then(json => {
          console.log(json);
          alert("Invoice created successfully!");

                })
              }
          
          })

      }

  
  sendInvoiceCreation()
  .catch(apiErr => {
    alert(apiErr.message);
  })
}
  
// Call REST API to update one specific invoice
const updateInvoice = (event) => {

  var urlID = inputsUpdateInvoice.id

  var jsonForBody = inputsUpdateInvoice;
  var key = 'id';
  delete jsonForBody[key];

  event.preventDefault();
  //alert(JSON.stringify(jsonForBody));

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jsonForBody) };

    const sendInvoiceUpdate  = async () => {

    await fetch(url + '/update/' + urlID ,requestOptions)
    .then(res => {

        if (res.status==500) {

          
                throw Error("Could not update invoice, please check that values are valid.");
                
        } else if (res.status!=200){
          throw Error("Could not update data properly, please try again")
        } else {

        res.json().then(json => {
        console.log(json);
        alert("Invoice updated successfully!");

              })
            }
        
        })

    }


    sendInvoiceUpdate()
    .catch(apiErr => {

    alert(apiErr.message);

})

}


    const InvoicePrint = (props)=>{
        return (
        <>
        <tr>
          <td>{props._id}</td>
          <td>{props.invoicenumber}</td>
          <td>{props.emissiondate}</td>
          <td>{props.amount}</td>
        </tr>
        </>
        )
    };

    const handleChange = (props) =>{
      console.log(props.target.value);
      setVariable(props.target.value);
      }


      useEffect(() => {
      let invoicesCopy = [...invoices]
      invoicesCopy = invoicesCopy.filter(json => String(json.invoicenumber).includes(variable))
      setInvoices(invoicesCopy)
      }, [variable])

  return (
  <>

  <br></br>
  <h1>Projcet 3 - Invoice administration webpage</h1>
  <br></br>

  <button onClick={getInvoies} class="btn btn-primary">Refresh all invoices </button>
  <br></br>
  <br></br>
      <form>
      <lable>Filter by Invoice Name: </lable>
        <input value={variable} type="text"
        onChange={handleChange}/>
    </form>
    <br></br>
  <h2>These are all the available invoices at this moment:</h2>

  <div id="divAllInvoices">

      <table class="table table-hover">
      <thead><tr>
      <th>Invoice ID</th>
      <th>Invoice Name</th>
      <th>Emission Date</th>
      <th>Invoice Amount</th>
      </tr></thead>
      <tbody>
    {
      invoices ?
      invoices.map(data =><InvoicePrint _id={data._id} invoicenumber={data.invoicenumber} emissiondate={data.emissiondate} amount={data.amount} />)
      : <div></div>
    }

    </tbody></table>

  <hr></hr>

  <h1>Mandatory fields and restrictions when creating an invoice:</h1>
  <Restrictions/>

  <br></br>
  <h2>Create invoice here:</h2>
  <br></br>
  <form onSubmit={createInvoice}>

      <div class="form-group row">
      <label for="invoicenumber"  class="col-sm-2 col-form-label">Invoice Number:</label>
      <div class="col-sm-2">
      <input 
        type="text" 
        class="form-control"
        name="invoicenumber" required 
        value={inputsNewInvoice.invoicenumber || ""} 
        onChange={handleChangeNewInvoice}
        />
      </div>
      </div>
      <div class="form-group row">
      <label for="emissiondate"  class="col-sm-2 col-form-label">Emission Date:</label>
      <div class="col-sm-2"> 
        <input 
          type="date" 
          class="form-control"
          name="emissiondate" required 
          value={inputsNewInvoice.emissiondate || ""} 
          onChange={handleChangeNewInvoice}
        />
        </div>
        </div>
        <div class="form-group row">
        <label for="amount"  class="col-sm-2 col-form-label">Invoice Amount:</label>
        <div class="col-sm-2">
        <input 
          type="number"
          class="form-control"
          name="amount" required 
          value={inputsNewInvoice.amount || ""} 
          onChange={handleChangeNewInvoice}
        />
        </div>
        </div>
        <br></br>
        <input type="submit" value="Create Invoice" class="btn btn-primary"/>

    </form>
    <br></br>

  <hr></hr>

  <div>

    </div>

    <h2>Look for specific invoice by ID:</h2>
    <br></br>
    <div class="input-group mb-3">
     <div class="input-group-prepend">
      <span class="input-group-text">Invoice to look for:</span>
      </div>
      <input type="text" name="oneInvoice" class="textinputgetinvoice" size="30" required></input>
      </div>
            <br></br>
            <a href="javascript:void(0)" onClick={getOneInvoice} class="btn btn-primary"><span>Get single invoice</span></a>


    <br></br>
    <br></br>

    <div id="divSingleInvoice">

      {singleInvoice ? <h2> Invoice ID: {singleInvoice._id}</h2> : null}
      {singleInvoice ? <p> Invoice number: {singleInvoice.invoicenumber}</p> : null}
      {singleInvoice ? <p> Emission Date: {singleInvoice.emissiondate}</p> : null}
      {singleInvoice ? <p> Amount: {singleInvoice.amount}</p> : null}

    </div>

    <br></br>
    <hr></hr>

            <h2>Update invoice here. Field value restrictions still apply:</h2>

            <br></br>

  <form onSubmit={updateInvoice}>

     <div class="form-group row">
      <label for="id"  class="col-sm-2 col-form-label">Invoice ID:</label>
      <div class="col-sm-2">
      <input 
        type="text" 
        name="id" required
        value={inputsUpdateInvoice.id || ""} 
        onChange={handleChangeUpdateInvoice}
      />
      </div>
      </div>
      <div class="form-group row">
      <label for="invoicenumber"  class="col-sm-2 col-form-label">Invoice Number:</label>
      <div class="col-sm-2">
      <input 
        type="text" 
        name="invoicenumber" 
        value={inputsUpdateInvoice.invoicenumber || ""} 
        onChange={handleChangeUpdateInvoice}
      />
      </div>
      </div>
      <div class="form-group row">
      <label for="emissiondate"  class="col-sm-2 col-form-label">Emission Date:</label>
      <div class="col-sm-2">
        <input 
          type="date" 
          name="emissiondate" 
          value={inputsUpdateInvoice.emissiondate || ""} 
          onChange={handleChangeUpdateInvoice}
        />
        </div>
        </div>
        <div class="form-group row">
        <label for="amount"  class="col-sm-2 col-form-label">Invoice Amount:</label>
        <div class="col-sm-2">
        <input 
          type="number" 
          name="amount" 
          value={inputsUpdateInvoice.amount || ""} 
          onChange={handleChangeUpdateInvoice}
        />
        </div>
        </div>
        <br></br>
        <input type="submit" value="Update Invoice" class="btn btn-primary"/>
    </form>

    <br></br>

<hr></hr>

      <h2>Delete specific invoice by ID:</h2>
      <br></br>
      <div class="input-group mb-3">
      <div class="input-group-prepend">
      <span class="input-group-text">Invoice to delete:</span>
      </div><input type="text" name="oneInvoice" class="textinputdeleteinvoice" size="30"></input>
      </div>
      <br></br>
            <a href="javascript:void(0)" onClick={deleteOneInvoice} class="btn btn-primary"><span>Delete Invoice</span></a>
  </div>

  </>
  )
}

export default App;
