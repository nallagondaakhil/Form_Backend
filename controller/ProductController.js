var express = require('express');
var router = express.Router();
var sql = require("mssql");
var conn = require("../connection/connect")();
var routes = function () {
    //Retrieve the Customer Details from Database based on mobileNumber
    router.route('/PrimaryNumber/:phonenumber')
        .get(function (req, res) {
            console.log("gt here" + req);
            var connectionToBeClosed = true;

            var mobileNumber = req.params.phonenumber;
            console.log(mobileNumber);
            mobileNumber = mobileNumber.substr(mobileNumber.length - 10)
            console.log('The mobileNumber: ' + mobileNumber);

            conn.connect().then(function () {
                var sqlQuery = "select *  FROM [DB1].[dbo].[Crmdetails] where MobileNumber = '" + mobileNumber + "' or AlternateNumber='" + mobileNumber + "' ";
                console.log('sqlQuery :' + sqlQuery);
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {
                    if (recordset.recordset.length > 0) {
                        connectionToBeClosed = true;
                        res.json(recordset.recordset[0]);
                        console.log('BasicCrm details :' + recordset.recordset[0]);
                        conn.close();
                    } else {
                        searchingCustomerDetails(res);
                        connectionToBeClosed = false;

                    }

                })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                        res.status(400).send("URL is not Matching please check it");
                    });
            })
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                    res.status(500).send("500 Error while Retrieving data");
                });


        });


    //Updating the Customer Details from Database based on mobileNumber
    router.route('/updateCrmDetails/:phonenumber')
        .post(function (req, res) {
            console.log("test");
            //Boolean variables
            var connectionToBeClosed = true;
            var isvalueAddComa = false;

            var phonenumberValue = req.params.phonenumber;
            console.log(phonenumberValue);
            phonenumberValue = phonenumberValue.substr(phonenumberValue.length - 10)
            console.log('The mobileNumber: ' + phonenumberValue);

            //Customer Details 
            var customerName = req.body.CustomerName;
            var contactPersonName = req.body.ContactPersonName;
            var alternateNumber = req.body.AlternateNumber;
            var email = req.body.Email;
            var address1 = req.body.Address1;
            var address2 = req.body.Address2;
            var address3 = req.body.Address3;
            var city = req.body.City;
            var state = req.body.State;
            var postalCode = req.body.PostalCode;

            conn.connect().then(function () {

                var sqlQuery1 = "update [DB1].[dbo].[Crmdetails] set ";
                var sqlQuery2 = "where MobileNumber = '" + phonenumberValue + "' ";


                if (customerName == undefined || customerName == null || customerName == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " CustomerName ='" + customerName + "' ";
                    } else {
                        sqlQuery1 += " CustomerName ='" + customerName + "' ";
                        isvalueAddComa = true;
                    }
                }

                if (contactPersonName == undefined || contactPersonName == null || contactPersonName == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " ContactPersonName ='" + contactPersonName + "' ";
                    } else {
                        sqlQuery1 += " ContactPersonName ='" + contactPersonName + "' ";
                        isvalueAddComa = true;
                    }
                }

                if (alternateNumber == undefined || alternateNumber == null || alternateNumber == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " AlternateNumber ='" + alternateNumber + "' ";

                    } else {
                        sqlQuery1 += " AlternateNumber ='" + alternateNumber + "' ";

                    }
                }
                if (email == undefined || email == null || email == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " Email ='" + email + "' ";

                    } else {
                        sqlQuery1 += " Email ='" + email + "' ";

                    }
                }
                if (address1 == undefined || address1 == null || address1 == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " Address1 ='" + address1 + "' ";

                    } else {
                        sqlQuery1 += " Address1 ='" + address1 + "' ";

                    }
                }
                if (address2 == undefined || address2 == null || address2 == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " Address2 ='" + address2 + "' ";

                    } else {
                        sqlQuery1 += " Address2 ='" + address2 + "' ";

                    }
                }
                if (address3 == undefined || address3 == null || address3 == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " Address3 ='" + address3 + "' ";

                    } else {
                        sqlQuery1 += " Address3 ='" + address3 + "' ";

                    }
                }

                if (city == undefined || city == null || city == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " City ='" + city + "' ";

                    } else {
                        sqlQuery1 += " City ='" + city + "' ";

                    }
                }

                if (state == undefined || state == null || state == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " State ='" + state + "' ";

                    } else {
                        sqlQuery1 += " State ='" + state + "' ";

                    }
                }

                if (postalCode == undefined || postalCode == null || postalCode == '') {  //if update the fields then data will store in to the database 

                } else {
                    if (isvalueAddComa) {
                        sqlQuery1 += ",";
                        sqlQuery1 += " PostalCode ='" + postalCode + "' ";

                    } else {
                        sqlQuery1 += " PostalCode ='" + postalCode + "' ";

                    }
                }


                var sqlQuery4 = sqlQuery1.concat(sqlQuery2);
                console.log(sqlQuery1);
                console.log(sqlQuery2);
                console.log(sqlQuery4);
                var req = new sql.Request(conn);
                req.query(sqlQuery4).then(function (recordset, error) {
                    if (error) {
                        res.json(error);
                    } else if (recordset.rowsAffected.length = 1) {
                        if (recordset.rowsAffected[0]) {
                            res.json("sucess");
                            console.log('sucess');
                            conn.close();

                        } else {
                            res.json({ "success": false, "Message": "Data is not Updated" });
                            conn.close();
                        }
                    } else {
                        console.log('......');
                    }

                })
                    .catch(function (err) {
                        console.log(err);
                        conn.close();
                        res.status(400).send("400 Error while updating data ");
                    });
            })
                .catch(function (err) {
                    console.log(err);
                    conn.close();
                    res.status(500).send("500 Error while updating data");
                });

        });

    return router;

};
module.exports = routes;