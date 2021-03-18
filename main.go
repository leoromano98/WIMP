package main

import (
	"time"
)

func main() {
	var packet1 = &Packet{
		Physical_layer: Physical_layer{
			Origin:      "MAC_o",
			Destination: "MAC_d",
			Header:      3,
			Payload:     4},
		Network_layer: Network_layer{
			Origin:      "IP_o",
			Destination: "IP_d",
			Version:     4,
			Header:      1,
			Payload:     2},
		Transport_layer: Transport_layer{
			Origin:      "PORT_o",
			Destination: "PORT_d",
			Header:      23,
			Payload:     25},
		Timestamp: time.Now(),
	}
	InsertPacket(*packet1)

}
