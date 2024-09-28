package entity

import (
	"gorm.io/gorm"
)

type Member struct {

	gorm.Model

	FirstName string    

	LastName  string    

	Email     string    

	Username string 	

	Password  string 
	
	PhoneNumber string 

	GenderID  uint     
	Gender    Gender  `gorm:"foreignKey:GenderID"`

	Bookings []Booking `gorm:"foreignKey:MemberID"`

	Payments [] Payment `gorm:"foreignKey:MemberID "`

}