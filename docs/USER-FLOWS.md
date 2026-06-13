
### 3. `docs/USER-FLOWS.md`


# MyDeepTalk User Flows

## Client Flow

```txt
Client visits website
↓
Signs up with email and password
↓
Accepts Terms and Privacy Policy
↓
Chooses privacy alias
↓
Verifies email
↓
Logs in
↓
Lands on dashboard
↓
Completes pre-booking intake
↓
Views matched therapists
↓
Selects therapist
↓
Books session
↓
Pays using IntaSend or uses gifted credit
↓
Receives session confirmation
↓
Google Meet link is created
↓
Attends therapy session
↓
Session is marked completed
↓
Client leaves anonymous review using alias

## Client Privacy Flow

Client enters full name
↓
Client chooses privacy alias
↓
Full name is stored privately
↓
Alias is saved in bookings
↓
Therapists see alias instead of real name
↓
Reviews display alias or Anonymous Client


## Therapist Flow

Therapist signs up
↓
Logs in
↓
Completes therapist profile
↓
Accepts Professional Services Agreement
↓
Uploads credentials
↓
Sets session fees
↓
Sets availability
↓
Admin reviews therapist
↓
Admin approves therapist
↓
Therapist appears in therapist directory
↓
Client books therapist
↓
Therapist manages bookings
↓
Therapist attends session
↓
Therapist marks session completed

## Admin Flow

Admin logs in
↓
Views admin dashboard
↓
Reviews therapist applications
↓
Checks credentials and profile
↓
Approves or rejects therapist
↓
Approved therapist appears publicly

## Booking Flow

Client completes pre-booking intake
↓
Client views therapist list
↓
Client opens therapist profile
↓
Client selects Book Session
↓
Client chooses date and time
↓
System checks availability
↓
Booking is created as pending
↓
Client proceeds to payment
↓
Payment webhook confirms payment
↓
Booking status becomes confirmed
↓
Google Meet link is generated
↓
Emails are sent to client and therapist

## Gift Therapy Flow

User gifts therapy session
↓
Gift credit is created
↓
Recipient redeems gift
↓
Credit appears in recipient account
↓
Recipient books session
↓
Gift credit is applied
↓
Booking payment status becomes gifted

## Healing Circle Flow

User creates healing circle
↓
Shares healing circle with supporters
↓
Supporters contribute toward therapy
↓
Beneficiary receives therapy credits
↓
Beneficiary books therapy session

## Dashboard Announcement Flow

User logs in
↓
Dashboard loads
↓
System checks dashboardAnnouncements collection
↓
If active announcement exists, display it
↓
If not, show fallback announcement