package types

type Location struct {
    Longitude float64 `json:"longitude"`
    Latitude  float64 `json:"latitude"`
    Timezone  string  `json:"timezone"`
}