package entity

import (
	"time"

	"gorm.io/gorm"
)

type BookingEquipment struct {

	gorm.Model
	DateBooking time.Time

	EquipmentID uint
	Equipment   Equipment `gorm:"foriegnKey:EquipmentID"`

	MemberID uint
	Member   Member `gorm:"foriegnKey:MemberID"`


}