const GRAMPANCHAYAT_COLLECT_TABLE: any = `at-grampanchat-${process.env.STAGE}`;
const SK_CREATED_AT_INDEX = "SK-CreatedAt-index";
const Organization_Sk = "Organization";
const CITIZEN = "Citizen";
const COMPLAINT = "Complaint";
const ORGNIZATION = "Organization";
const COMPLAINT_SK = "Organization#superadmin"
const Employee_Sk = "Employee";
const CITIZEN_SK = "Citizen#Organization#superadmin"

const ADMIN_ROLE = 2;
export {
   GRAMPANCHAYAT_COLLECT_TABLE,
   ADMIN_ROLE,
   Organization_Sk,
   SK_CREATED_AT_INDEX,
   Employee_Sk,
   CITIZEN,
   CITIZEN_SK,
   COMPLAINT_SK,
   COMPLAINT,
   ORGNIZATION
}