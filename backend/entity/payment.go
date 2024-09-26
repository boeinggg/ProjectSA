package entity

import "gorm.io/gorm"
		


type Payment struct {
	gorm.Model 
	PaymentMethodName string //วิธีการชำระ
	Amount            float64//จำนวนเงิน
	
	// 1 payment ต่อ 1 วิธ๊ชำระเงิน
	CreditCards []  CreditCard `gorm:"foreignKey:payment_id"`
	Paypals []      Paypal     `gorm:"foreignKey:payment_id"`
	PromptPays []   PromptPay  `gorm:"foreignKey:payment_id"`

    // MemberID ทำหน้าที่เป็น FK
	MemberID uint
	Member   Member `gorm:"foriegnKey:member_id"`
	// PackageID ทำหน้าที่เป็น FK
	PackageID uint
	Package   Package `gorm:"foriegnKey:package_id"`
	
}