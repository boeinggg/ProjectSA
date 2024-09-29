package controller

import (
	"log"
	"net/http"

	"backend/config"
	"backend/entity"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// POST /equipment
func CreateEquipment(c *gin.Context) {
	var equipment entity.Equipment // Assuming you want to use the same structure

	// Bind to equipment variable
	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Log incoming request data
	log.Printf("Received data: %+v\n", equipment)

	db := config.DB()

	// Validate admin
	var admin entity.Admin
	db.First(&admin, equipment.AdminID)
	if admin.ID == 0 {
		c.JSON(http.StatusNotFound, gin.H{"error": "admin not found"})
		return
	}

	// Create Equipment
	eq := entity.Equipment{
		EquipmentName: equipment.EquipmentName,
		Deets:        equipment.Deets,
		StartDate:    equipment.StartDate,
		EndDate:      equipment.EndDate,
		EquipmentPic: equipment.EquipmentPic,
		AdminID:      equipment.AdminID,
		Admin:        admin,
	}

	// Save to database
	if err := db.Create(&eq).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "Created success", "data": eq})
}

// GET /equipment/:id
func GetEquipment(c *gin.Context) {
	ID := c.Param("id")
	var equipment entity.Equipment // Assuming you want to use the same structure

	db := config.DB()
	results := db.Preload("Admin").First(&equipment, ID)
	if results.Error != nil {
		if results.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Equipment not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, equipment)
}

// GET /equipment
func ListEquipments(c *gin.Context) {
	var equipment []entity.Equipment // Assuming you want to use the same structure

	db := config.DB()
	results := db.Preload("Admin").Find(&equipment)
	if results.Error != nil {
		if results.Error == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "No equipment found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": results.Error.Error()})
		}
		return
	}

	c.JSON(http.StatusOK, equipment)
}

// DELETE /equipment/:id
func DeleteEquipment(c *gin.Context) {
	id := c.Param("id")
	db := config.DB()
	if tx := db.Exec("DELETE FROM classes WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "id not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"message": "Deleted successful"})
}

// PATCH /equipment/:id
func UpdateEquipment(c *gin.Context) {
	var equipment entity.Equipment // Assuming you want to use the same structure

	UserID := c.Param("id")

	db := config.DB()
	result := db.First(&equipment, UserID)
	if result.Error != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "id not found"})
		return
	}

	if err := c.ShouldBindJSON(&equipment); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request, unable to map payload"})
		return
	}

	result = db.Save(&equipment)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Bad request"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Updated successful"})
}

// GET /equipment/count
func CountEquipments(c *gin.Context) {
	var count int64
	db := config.DB()
	if err := db.Model(&entity.Equipment{}).Count(&count).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"count": count})
}