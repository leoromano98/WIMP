package models

type ChangePW struct {
	Password     string `bson:"password" json:"password,omitempty"`
	NewPassword  string `bson:"newpassword" json:"newpassword,omitempty"`
	Confirmation string `bson:"confirmation" json:"confirmation,omitempty"`
}
