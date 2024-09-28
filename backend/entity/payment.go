package entity

import "gorm.io/gorm"
		


type Payment struct {
	gorm.Model 
	PaymentMethodName string //วิธีการชำระ
	Amount            int//จำนวนเงิน
	

	// PackageID ทำหน้าที่เป็น FK
	PackageID uint
	Package   Package `gorm:"foriegnKey:PackageID"`

	// MemberID ทำหน้าที่เป็น FK
	MemberID uint
	Member   Member `gorm:"foriegnKey:MemberID"`
}