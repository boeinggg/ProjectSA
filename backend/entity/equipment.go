package entity

import (
	"time"

	"gorm.io/gorm"
)

type Equipment struct {
	gorm.Model    
	EquipmentName string       
	Deets     string    
	StartDate time.Time
	EndDate   time.Time   
	EquipmentPic  string

	
	AdminID uint
	Admin   Admin `gorm:"foriegnKey:AdminID"`

	BookingEquipments []BookingEquipment `gorm:"foreignKey:EquipmentID"`

} 