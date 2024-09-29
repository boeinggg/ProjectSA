package controller

import (
	"net/http"

	"backend/config"
	"backend/entity"

	"github.com/gin-gonic/gin"
)

// POST /equipment/booking
func CreateEquipmentBooking(c *gin.Context) {
	var bookingEquipment entity.BookingEquipment

	// Bind to booking variable
	if err := c.ShouldBindJSON(&bookingEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	db := config.DB()

	// Validate Equipment
	var equipment entity.Equipment
	db.First(&equipment, bookingEquipment.EquipmentID)
	if equipment.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
		return
	}

	// Validate Member
	var member entity.Member
	db.First(&member, bookingEquipment.MemberID)
	if member.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "Member not found"})
		return
	}

	// Create Booking
	be := entity.BookingEquipment{
		DateBooking: bookingEquipment.DateBooking,
		EquipmentID: bookingEquipment.EquipmentID,
		Equipment:   equipment,
		MemberID:    bookingEquipment.MemberID,
		Member:      member,
	}

	// Save to database
	if err := db.Create(&be).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": be})
}

// GET /equipment/booking/:id
func GetEquipmentBooking(c *gin.Context) {
	ID := c.Param("id")
	var bookingEquipment entity.BookingEquipment

	db := config.DB()
	results := db.Preload("Equipment").Preload("Member").First(&bookingEquipment, ID)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	if bookingEquipment.ID == 0 {
		c.JSON(http.StatusNoContent, gin.H{})
		return
	}
	c.JSON(http.StatusOK, bookingEquipment)
}

// GET /equipment/bookings
func ListEquipmentBookings(c *gin.Context) {
	var bookingEquipments []entity.BookingEquipment

	db := config.DB()
	results := db.Preload("Equipment").Preload("Member").Find(&bookingEquipments)
	if results.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": results.Error.Error()})
		return
	}
	c.JSON(http.StatusOK, bookingEquipments)
}

// DELETE /equipment/bookings/:id
func DeleteEquipmentBooking(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM booking_equipments WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// PATCH /equipment/bookings/:id
func UpdateEquipmentBooking(c *gin.Context) {
	var bookingEquipment entity.BookingEquipment

	BookingEquipmentID := c.Param("id")

	db := config.DB()
	result := db.First(&bookingEquipment, BookingEquipmentID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&bookingEquipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&bookingEquipment)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}