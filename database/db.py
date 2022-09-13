import sqlite3
#This table stores the information regarding the customer and their appointment 
conn = sqlite3.connect("customer.sqlite")
cursor = conn.cursor()
sql_query = """ CREATE TABLE customer (
    id integer PRIMARY KEY,
    FirstName text NOT NULL,
    LastName text NOT NULL,
    Email text NOT NULL,
    PhoneNumber text NOT NULL,
    ContactPreference text NOT NULL,
    VehicleVIN text NOT NULL,
    VehicleMake text NOT NULL,
    VehicleModel text NOT NULL,
    VehicleLicensePlate text DEFAULT "" NOT NULL,
    VehicleMileage text DEFAULT "" NOT NULL,
    VehicleYear text NOT NULL,
    Services text NOT NULL,
    AdditionalCharges text DEFAULT "" NOT NULL,
    CustomerAvailability text NOT NULL, 
    CustomerExtraInformation text NOT NULL,
    EmployeeExtraInformation text DEFAULT "" NOT NULL,
    AppointmentStatus text DEFAULT "In Progress" NOT NULL,
    DropOffDate text DEFAULT "--" NOT NULL,
    PickUpDate text DEFAULT "--" NOT NULL,
    Mechanic text DEFAULT "--" NOT NULL,
    ServicePrice text DEFAULT "--" NOT NULL,
    PaymentStatus text DEFAULT "Unpaid" NOT NULL,
    DateMade DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    Clicked int DEFAULT 0 
    )"""
cursor.execute(sql_query)
#This table stores the username and password of the employee(s) so they can log onto their account
conn = sqlite3.connect("employee.sqlite")
cursor = conn.cursor()
sql_query = """ CREATE TABLE employee (
    id integer PRIMARY KEY,
    Username text NOT NULL,
    Password text NOT NULL,
    FirstName text NOT NULL,
    LastName text NOT NULL,
    Email text NOT NULL,
    PhoneNumber text NOT NULL,
    Quote text NOT NULL,
    BackgroundImage text NOT NULL,
    ProfilePicture text NOT NULL
    )"""
cursor.execute(sql_query)
#This table stores the information regarding meetings
conn = sqlite3.connect("meetings.sqlite")
cursor = conn.cursor()
sql_query = """ CREATE TABLE meetings (
    id integer PRIMARY KEY,
    Name text NOT NULL,
    Date text NOT NULL,
    Time text NOT NULL,
    Description text NOT NULL,
    Category text NOT NULL
    )"""
cursor.execute(sql_query)