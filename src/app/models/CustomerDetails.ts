export class CustomerDetails
{
    customerId :string;
    customerName :string;
    dob :string;
    marriageDate :string;
    emailId :string;
    mobile :string;
    address :string;
    usingWhatsapp :boolean = false;
    isLocalCustomer :boolean = false;
    isOldCustomer :boolean = false;
    uniqueCode :string = "";
    offerStartDate :string;
    offerEndDate :string;
    offerUsed :boolean = false;
}