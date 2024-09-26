package entity

import "gorm.io/gorm"
		


type Paypal struct {
	gorm.Model 
	PaypalEmail string

// Payment ทำหน้าที่เป็น FK
PaymentID uint
Payment   Payment `gorm:"foreignKey:payment_id"`
}