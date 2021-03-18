package main

import "time"

type Packet struct {
	Physical_layer  Physical_layer
	Network_layer   Network_layer
	Transport_layer Transport_layer
	Timestamp       time.Time
}

type Physical_layer struct {
	Origin      string
	Destination string
	Header      int32
	Payload     int32
}

type Network_layer struct {
	Origin      string
	Destination string
	Version     int8
	Header      int32
	Payload     int32
}

type Transport_layer struct {
	Origin      string
	Destination string
	Header      int32
	Payload     int32
}
