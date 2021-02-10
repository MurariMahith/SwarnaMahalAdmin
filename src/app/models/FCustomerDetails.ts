import { AvailStatus } from "./AvailStatus";

export class FCustomerDetails
{
    key :string;
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
    uniqueCode : string = "";
    offerStartDate :string;
    offerEndDate :string;
    offerMessageSent :boolean = false;
    offerUsed :boolean = false;
    availStatus :AvailStatus = new AvailStatus();
}