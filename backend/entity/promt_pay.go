package entity

import "gorm.io/gorm"
		


type PromptPay struct {
	gorm.Model 
	Promptpay_number string // เบอร์หรือเลขบัตรประชาชน

// Payment ทำหน้าที่เป็น FK
PaymentID uint
Payment   Payment `gorm:"foreignKey:payment_id"`
}